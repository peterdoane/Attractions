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
  StyleSheet
} from 'react-native';
import Login from './src/components/Login';
import Attractions from './src/components/Attractions';
import Itineraries from './src/components/Itineraries';


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class FinalProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'discover'
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

            selected={this.state.selectedTab === 'itineraries'}
            onPress={() => {
              this.setState({
                selectedTab: 'itineraries'
              });
            }}>
            <Itineraries />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

AppRegistry.registerComponent('withoutignite1', () => FinalProject);
