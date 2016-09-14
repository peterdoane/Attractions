/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TabBarIOS,
  StyleSheet,
  MapView
} from 'react-native';
import Login from '../Login';
import Attractions from '../Attractions';
import Itineraries from '../Itineraries';
import MapScreen from '../MapScreen';


import icon from '../../images/location-icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class FinalProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'discover',
      mockLocations: [
        {
          latitude: -73.5,
          longitude: 45.5,
          name: 'First Location'
        },
        {
          latitude: -73.55,
          longitude: 45.42,
          name: 'Second Location'
        },
        {
          latitude: -73.35,
          longitude: 45.62,
          name: 'Third Location'
        },

      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          unselectedTintColor="yellow"
          tintColor="white"
          barTintColor="darkslateblue">

          <TabBarIOS.Item
            title="Discover"
            icon={icon}
            selected={this.state.selectedTab === 'discover'}
            onPress={() => {
              this.setState({
                selectedTab: 'discover',
              });
            }}>
            <Attractions/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Itineraries"
            icon={icon}
            selected={this.state.selectedTab === 'itineraries'}
            onPress={() => {
              this.setState({
                selectedTab: 'itineraries'
              });
            }}>
            <Itineraries />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Map"
            icon={icon}
            selected={this.state.selectedTab === 'map'}
            onPress={() => {
              this.setState({
                selectedTab: 'map'
              });
            }}>
            <MapScreen />
          </TabBarIOS.Item>

        </TabBarIOS>
      </View>
    );
  }
}

AppRegistry.registerComponent('withoutignite1', () => FinalProject);
