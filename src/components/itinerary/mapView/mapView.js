import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  MapView,
  AsyncStorage,
  TextInput
} from 'react-native';
import { inject, observer } from "mobx-react/native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subcontainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    // width: 375,
    // height: 200,
    flexDirection: 'column-reverse',
    alignItems: 'stretch'
  },
  callToAction: {
    backgroundColor: 'green',
    padding: 10,
    // width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    height:76
  },
  callToActionButton: {
    color: 'black',
    fontSize:20
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  }
});

class MapViewComponent extends React.Component {
        getAnnotations(){

          return this.props.itinerary.places.map(place => {
            return {
            latitude: place.location.coordinate.latitude,
            longitude: place.location.coordinate.longitude
          }});
        }

        getCenter(){
          if (!this.props.itinerary.places.length) {
            return {
              latitude: -73.5,
              longitude: 45.5,
              latitudeDelta: 0.4,
              longitudeDelta: 0.3
            }
          }
          let minLat, minLong, maxLat, maxLong;
           this.props.itinerary.places.forEach( place => {
             if(place.location.coordinate.latitude < minLat || !minLat){
               minLat = place.location.coordinate.latitude;
             }
             if(place.location.coordinate.longitude < minLong || !minLong){
               minLong = place.location.coordinate.longitude;
             }
             if(place.location.coordinate.latitude > maxLat || !maxLat){
               maxLat = place.location.coordinate.latitude;
             }
             if(place.location.coordinate.longitude > maxLong || !maxLong){
               maxLong = place.location.coordinate.longitude;
             }
           })
           return {
             latitude:(minLat + maxLat)/2,
             longitude:(minLong + maxLong)/2,
             latitudeDelta: 0.12,
             longitudeDelta: 0.065
          }
        }

        render() {
          // const { location } = this.props;
          // if (!this.state.isReady || !location.latitude || !location.longitude) {
          //   return null;
          // }

          console.log({
            ...this.getCenter()
          });

          return(
            <View style={styles.container}>
              <MapView
                region = {
                  {
                    ...this.getCenter()
                  }
                }
                annotations={this.getAnnotations()}
                style = {
                  {
                    flex: 1
                  }
                }
              />
            </View>
          )
        }
      }

export default inject((stores) => ({
  itinerary: stores.itineraries.active
 }))(observer(MapViewComponent));
