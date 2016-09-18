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
          // update store -> set location
          this.props.navigator.push({
            name: 'Interests',
            component: Interests,
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
                annotations={[
                  {
                    latitude: location.latitude,
                    longitude: location.longitude,
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
                  annotations={[{...location}]}
                  style={styles.callToAction}
                  onPress={this.setLocation.bind(this)}>
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

export default inject(() => ({ location: new Location() }))(observer(SetLocation));
