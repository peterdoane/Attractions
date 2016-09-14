import React, {Component} from 'react';
import {View, Text, Image, TextInput, ListView, TouchableHighlight,
  StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import SetLocation from '../setLocation/setLocation';

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
      top: 43,
      left: 0,
      width: 414,
      height: 567,
      alignItems: 'center'
    },
    callToAction: {
      backgroundColor: 'green'
    },
    callToActionButton: {
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
      width:200
    },
    introText: {
      alignItems:'center',
      fontSize: 24,
      color:'#ffffff',
      paddingBottom: 72,
      paddingLeft: 44,
      paddingRight:35,
      paddingTop: 28
    }
  });

class IntroPage extends Component{
  requireLocationPermission() {
    this.props.navigator.push({
        name: 'SetLocation',
        component: SetLocation
    });
  }

  render() {
    return (

    <View style={styles.container}>
      <Image source={require('../../images/background.jpg')} style={styles.backgroundImage} />
      <View style={styles.subcontainer}>
        <Image source={require('../../images/Attractions-logo.png')} style={styles.logo} />
        <Text style={styles.introText}>
              Attractions uses location
              services to serve you photos
              to create a quick itinerary in a
              new place.
        </Text>
        <TouchableHighlight
          style={styles.callToAction}
          onPress={this.requireLocationPermission.bind(this)}>
          <Text style={styles.callToActionButton}>OK</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  }
};

export default IntroPage;
