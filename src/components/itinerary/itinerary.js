import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TabBarIOS,
  StyleSheet,
} from 'react-native';
import Places from "./places/places";
import discoverIcon from '../../images/photograph.png';
import placesIcon from '../../images/listing-option.png';
import locationIcon from '../../images/location-icon.png';
import ListNavigator from './lists/listNavigator';
import MapView from '../mapView/mapView';
import { inject, observer } from "mobx-react/native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#ff0000"
  }
})

class TabBar extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'discover'
    };
  }

  render() {
    const { itinerary } = this.props;

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text>{itinerary.name}</Text>
      </View>
        <TabBarIOS
          unselectedTintColor="yellow"
          tintColor="white"
          barTintColor="darkslateblue"
          >

          <TabBarIOS.Item
            title="Discover"
            icon={discoverIcon}
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
            icon={placesIcon}
            selected={this.state.selectedTab === 'places'}
            onPress={() => {
              this.setState({
                selectedTab: 'places'
              });
            }}>
            <ListNavigator/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Map"
            icon={locationIcon}
            selected={this.state.selectedTab === 'map'}
            onPress={() => {
              this.setState({
                selectedTab: 'map'
              });
            }}>
            <MapView />
          </TabBarIOS.Item>

        </TabBarIOS>
      </View>
    );
  }
}

export default inject(stores => ({
  itinerary: stores.itineraries.active
}))(observer(TabBar));
