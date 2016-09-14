/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image,
  TabBarIOS,
  StyleSheet,
  MapView,
  Navigator,
  Dimensions
} from 'react-native';
import Login from './src/components/Login';
import Attractions from './src/components/Attractions';
import Itineraries from './src/components/Itineraries';
import MapScreen from './src/components/MapScreen';


import icon from './src/images/location-icon.png';
import IntroPage from './src/components/IntroPage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.5
  },
  subContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height
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
        <Image source={require('./src/images/background.jpg')} style={styles.backgroundImage} />
        <View style={styles.subContainer}>
          <Navigator
            initialRoute = {{component:IntroPage}}
            renderScene = {(route, navigator) => {
              return <route.component navigator={navigator}/>
            }}
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('withoutignite1', () => FinalProject);
