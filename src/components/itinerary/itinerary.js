import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TabBarIOS,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Discover from "./discover/discover";
import discoverIcon from '../../images/photograph.png';
import placesIcon from '../../images/listing-option.png';
import locationIcon from '../../images/location-icon.png';
import ItinerariesView from '../itineraries/itineraries';
import MapView from './mapView/mapView';
import { inject, observer } from "mobx-react/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SetLocation from './setLocation/setLocation';
import Itinerary from "../../itinerary/itinerary";


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "rgba(255, 87, 34, .5)",
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
  },
  resetButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex:1
  },
  plus: {
    paddingTop: 7,
    padding:10
  },
  tabBarItem: {

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
    const { itineraries, activeIndex } = this.props;
    console.log('itineraries', itineraries);
    const itinerary = itineraries.itineraries[activeIndex];

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.createButton}
          onPress={() => {
            console.log(this.props.navigator);
            this.props.navigator.push({
              name: 'SetLocation',
              component: SetLocation,
              itinerary: new Itinerary()
            });
          }
        }
        >
          <Icon style={styles.plus}name="plus-square" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.itineraryName}>{itinerary.name}</Text>
        {/* <TouchableHighlight
          style={styles.resetButton}
          onPress={() => {
            AsyncStorage.clear();
          }
        }
        >
          <Text>Reset</Text>
        </TouchableHighlight> */}
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
            style={styles.tabBarItem}
            title="Places"
            icon={placesIcon}
            selected={this.state.selectedTab === 'places'}
            onPress={() => {
              this.setState({
                selectedTab: 'places'
              });
            }}>
            <ItinerariesView/>
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
// inject(..) => enhancer(TabBar) => WrapperComponent

// observer(onject(TabBar))

export default observer(inject(stores => {
  console.log(stores);
  // why is data not flowing back into the inject funciton when it changes in the itinerary store
  console.log("--->", stores.itineraries.activeIndex);
  return {
  itineraries: stores.itineraries,
  activeIndex: stores.itineraries.activeIndex
}})(TabBar));
