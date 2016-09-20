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
  Image
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

  renderRow(place){
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
      </View>
    )
  }

  render() {
    console.log(this.props);
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
