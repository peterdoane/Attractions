import React, { Component } from 'react';
import {inject, observer} from "mobx-react/native";
import Icon from 'react-native-vector-icons/FontAwesome';


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
    margin: 15,
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#f3f3f3'
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowImage: {
    width: 120,
    height: 120,
    marginRight: 20
  },
  rowContent: {
    flex: 1
  },
  rowText: {
    fontSize: 16,
    lineHeight: 24
  },
  rowTextBold: {
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 24,
    marginRight: 40
  },
  itineraryList: {
    flex:1
  },
  mapLink: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 15
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
    displayAddress = displayAddress.substring(0, displayAddress.length - 2);
    displayAddress.replace(" ", "+");

    const link = `http://maps.apple.com/?`+
      `daddr=${displayAddress}`;

    Linking.openURL(link)
      .catch(err => console.error('An error occurred', err));
  };

  renderRow = (place) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.innerContainer}>
          <Image style={styles.rowImage} source={{uri:place.image_url}} />
          <View style={styles.rowContent}>
            <Text style={styles.rowTextBold}>{place.name}</Text>
            {
              place.location.display_address.map(addressLine => (
                <Text key={addressLine} style={styles.rowText}>{addressLine}</Text>
              ))
            }
          </View>
        </View>
        <TouchableHighlight onPress={() => this.handleClick(place)} style={styles.mapLink}>
          <Icon name="location-arrow" size={30} color="black" />
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
