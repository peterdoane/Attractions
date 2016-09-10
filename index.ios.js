/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry, View
} from 'react-native';
import Login from './src/components/Login';
import Attractions from './src/components/Attractions';
import Tinder from './src/components/Tinder';

class FinalProject extends Component {
  componentDidMount(){
    fetch('http://localhost:3333/searchYelp?term=ice+cream&location=Montreal')
      // .then(res => res.text())
      .then(res => res.json())
      .then(businesses => {
        console.log(businesses);
      })
  }
  render() {
    return (<View>
      <Attractions/>
      <Tinder/>
      </View>
    );
  }
}

AppRegistry.registerComponent('withoutignite1', () => FinalProject);
