import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  MapView,
  AsyncStorage
} from 'react-native';
import Itinerary from '../itinerary/itinerary';
import Location from "../../location/location";
import { inject, observer } from "mobx-react/native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subcontainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 375,
    // height: 200,
    flexDirection: 'column-reverse',
    alignItems: 'center'
  },
  callToAction: {
    backgroundColor: 'green',
    padding: 10,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center'
  },
  callToActionButton: {
    color: 'white'
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
            navigator.geolocation.getCurrentPosition(
              position => {
                this.props.location.latitude = position.coords.latitude;
                this.props.location.longitude = position.coords.longitude;
                this.setState({ isReady: true });
              },
              error => {
                this.props.location.latitude = -73.5;
                this.props.location.longitude = 45.5;
                this.setState({ isReady: true });
              },
              {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
              }
            );
        }

        setLocation() {
          this.props.navigator.push({
            name: 'Itinerary',
            component: Itinerary,
            stores: {
              location: this.props.location
            }
          });
        }

        render() {
          const { location } = this.props;
          if (!this.state.isReady || !location.latitude || !location.longitude) {
            return null;
          }

          return(
            <View style={styles.container}>
              <MapView
                region = {
                  {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.12,
                    longitudeDelta: 0.065
                  }
                }
                style = {
                  {
                    flex: 1
                  }
                }
              />
              <View style={styles.subcontainer}>
                <TouchableHighlight
                  style={styles.callToAction}
                  onPress={this.setLocation.bind(this)}>
                  <Text style={styles.callToActionButton}>
                    Set location
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          )
        }
      }

export default inject(() => ({ location: new Location() }))(observer(SetLocation));
