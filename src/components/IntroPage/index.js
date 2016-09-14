import React, {Component} from 'react';
import {View, Text, Image, TextInput, ListView, TouchableHighlight,
  StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import MapScreen from '../MapScreen';

  let styles = StyleSheet.create({
    backgroundImage: {
      height: 736,
      width:414,
      opacity: 0.5
    },
    logo: {
      height:139,
      width:214,
    },
    subcontainer: {
      position: 'absolute',
      top: 100,
      left: 0,
      width: 414,
      height: 567,
      alignItems: 'center'
    },
    callToAction: {
      backgroundColor: 'green'
    },
    callToActionButton: {
      padding: 10
    }
  });

class IntroPage extends Component{
  requireLocationPermission() {
    // alert('123'); // -> ask for location permission
    this.props.navigator.push({
        name: 'MapScreen',
        component: MapScreen
    });

    navigator.geolocation.getCurrentPosition(position => {
      const initialPosition = JSON.stringify(position);
      // this.props.navigator.push('/itineraries');
    }, error => alert(error.message), {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  }

  render() {
    return (

    <View style={styles.container}>
      <Image source={require('../../images/background.jpg')} style={styles.backgroundImage} />
      <View style={styles.subcontainer}>
        <Image source={require('../../images/Attractions-logo.png')} style={styles.logo} />
        <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        <TouchableHighlight
          style={styles.callToAction}
          onPress={this.requireLocationPermission.bind(this)}>
          <Text style={styles.callToActionButton}>123456</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  }
};

export default IntroPage;
