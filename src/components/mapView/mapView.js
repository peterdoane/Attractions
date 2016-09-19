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
import Interests from '../itinerary/interests/interests';
import Location from "../../location/location";
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

class SetLocation extends React.Component {
        getAnnotations(){

          return this.props.itinerary.places.map(place => {
            return {
            latitude: place.location.coordinate.latitude,
            longitude: place.location.coordinate.longitude
          }});
        }

        render() {
          // const { location } = this.props;
          // if (!this.state.isReady || !location.latitude || !location.longitude) {
          //   return null;
          // }

          return(
            <View style={styles.container}>
              <MapView
                /*region = {
                  {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.12,
                    longitudeDelta: 0.065
                  }
                }*/
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
 }))(observer(SetLocation));
