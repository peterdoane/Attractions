import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TabBarIOS,
  StyleSheet,
  MapView,
  ListView
} from 'react-native';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class itineraryPlaces extends Component{
  constructor({stores}){
    super()
    this.state = {dsPlaces:ds.cloneWithRows(stores.itinerary.places)}
  }
  render() {
    console.log(this.props);
    return <View>
    <ListView
      dataSource={this.state.dsPlaces}
      renderRow= {((place) => {
        return <Text>{place.name}</Text>
      })}
    >{JSON.stringify(this.props.stores.itinerary.name)}</ListView>
  </View>
  }};
