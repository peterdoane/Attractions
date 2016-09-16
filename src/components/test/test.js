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


  let styles = StyleSheet.create({
    button: {
      marginTop: 414
    }
  });

class SetLocation extends React.Component {
        setLocation = () => {
          this.props.navigator.push({
            name: 'TEST',
            component: View
          });
        }

        render() {
          return(
            <View>
                <TouchableHighlight
                style={styles.button}
                  onPress={this.setLocation}>
                  <Text>
                    Set location
                  </Text>
              </TouchableHighlight>
            </View>
          )
        }
      }

export default SetLocation;
