import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TabBarIOS,
  StyleSheet,
  MapView,
} from 'react-native';
import Places from "./places/places";
import { Provider } from "mobx-react/native";
import icon from '../../images/location-icon.png';
import Lists from './lists/lists';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#ff0000"
  }
})

class TabBar extends Component {
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
      <View style={styles.header}>
        <Text>{this.props.stores.itinerary.name}</Text>
      </View>
      <Provider itinerary={this.props.stores.itinerary}>
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
            <Places/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Places"
            icon={icon}
            selected={this.state.selectedTab === 'places'}
            onPress={() => {
              this.setState({
                selectedTab: 'places'
              });
            }}>
            <Lists />
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
            <View />
          </TabBarIOS.Item>

        </TabBarIOS>
        </Provider>
      </View>
    );
  }
}

export default TabBar;
