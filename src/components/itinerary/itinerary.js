import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TabBarIOS,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Discover from "./discover/discover";
import discoverIcon from '../../images/photograph.png';
import placesIcon from '../../images/listing-option.png';
import locationIcon from '../../images/location-icon.png';
import Itineraries from '../itineraries/itineraries';
import MapView from './mapView/mapView';
import { inject, observer } from "mobx-react/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#ff0000",
    height: 41,
    marginTop: 26,
  },
  itineraryName: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 11,
    paddingBottom:11
  },
  createButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex:1
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
    const { itineraries } = this.props;
    const itinerary = itineraries.itineraries[itineraries.activeIndex];

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.createButton}
          onPress={() => {
            this.props.navigator.push({
              name: 'SetLocation',
              component: SetLocation,
              itinerary: new Itinerary()
            });
          }
        }
        >
          <Icon name="rocket" size={30} color="#0000ff" />
        </TouchableHighlight>
        <Text style={styles.itineraryName}>{itinerary.name}</Text>
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
            <Discover navigator={this.props.navigator}/>
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
            <Itineraries/>
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
  itineraries: stores.itineraries
}))(observer(TabBar));
