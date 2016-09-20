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
import Interests from '../interests/interests';
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

        constructor(props) {
            super(props);
            this.state = {
                isReady: false
            };
        }

        componentWillMount(){
          const { itinerary } = this.props;
          console.log(itinerary);
            navigator.geolocation.getCurrentPosition(
              position => {
                itinerary.location.latitude = position.coords.latitude;
                itinerary.location.longitude = position.coords.longitude;
                this.setState({ isReady: true });
              },
              error => {
                itinerary.location.latitude = -73.5;
                itinerary.location.longitude = 45.5;
                this.setState({ isReady: true });
              },
              {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
              }
            );
        }

        setLocation = () => {
          this.props.navigator.push({
            component: Interests,
            itinerary: this.props.itinerary
          });
        };

        render() {
          const { itinerary } = this.props;

          if (!this.state.isReady || !itinerary.location.latitude || !itinerary.location.longitude) {
            return null;
          }

          return(
            <View style={styles.container}>
              <MapView
                region = {
                  {
                    latitude: itinerary.location.latitude,
                    longitude: itinerary.location.longitude,
                    latitudeDelta: 0.12,
                    longitudeDelta: 0.065
                  }
                }
                annotations={[
                  {
                    latitude: itinerary.location.latitude,
                    longitude: itinerary.location.longitude
                  }
                ]}
                style = {
                  {
                    flex: 1
                  }
                }
              />

              <View style={styles.subcontainer}>
                <TouchableHighlight
                  style={styles.callToAction}
                  onPress={this.setLocation}>
                  <Text style={styles.callToActionButton}>
                    Set location
                  </Text>
                </TouchableHighlight>
                <TextInput style={styles.textInput}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
              </View>
            </View>
          )
        }
      }


export default inject((stores, props) => ({
  itineraries: stores.itineraries,
  itinerary: props.itinerary
}))(observer(SetLocation));
