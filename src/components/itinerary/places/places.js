import React, { Component } from 'react';
import {inject, observer} from "mobx-react/native";

import {
  AppRegistry,
  View,
  Text,
  TabBarIOS,
  StyleSheet,
  MapView,
  ListView,
  Image,
  Linking,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 40
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 15,
    borderColor: 'black',
    borderWidth: 1, //StyleSheet.hairlineWidth for "IOS" feel
    backgroundColor: '#f3f3f3'
  },
  rowImage: {
    width: 70,
    height: 70,
    marginRight: 20
  },
  rowContent: {
    flexDirection: 'column',
  },
  rowText: {
    fontSize: 13
  },
  itineraryList: {
    flex:1
  }
})

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class ItineraryPlaces extends Component {
  constructor({itinerary}){
    super()
    this.state = {dsPlaces:ds.cloneWithRows(itinerary.places.slice())}
  }

  handleClick = (place) => {
    let displayAddress = "";
    place.location.display_address.forEach(part => displayAddress += part + ", ");
    displayAddress = encodeURIComponent(displayAddress.substring(0, displayAddress.length - 2));

    const link = `http://maps.apple.com/?`+
      `ll=${place.location.coordinate.latitude},${place.location.coordinate.longitude}` +
      `&saddr=${displayAddress}`;

    Linking.openURL(link)
      .catch(err => console.error('An error occurred', err));
  };

  renderRow = (place) => {
    return (
      <View style={styles.rowContainer}>
        <Image style={styles.rowImage} source={{uri:place.image_url}} />
        <View style={styles.rowContent}>
          <Text style={styles.rowText}>{place.name}</Text>
          {
            place.location.display_address.map(addressLine => (
              <Text key={addressLine} style={styles.rowText}>{addressLine}</Text>
            ))
          }
        </View>
        <TouchableHighlight onPress={() => this.handleClick(place)}>
          <Text>Open in maps</Text>
        </TouchableHighlight>
      </View>
    )
  };

  render() {
    return <View style={styles.container}>
    <ListView
      enableEmptySection={false}
      dataSource={this.state.dsPlaces}
      renderRow= { this.renderRow }
    />
  </View>
  }
}
export default inject(stores => ({
  itinerary: stores.itineraries.active
}))(observer(ItineraryPlaces));
