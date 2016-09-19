import React, {Component} from 'react';
import {View, Text, Image, TextInput, Button, ListView, TouchableHighlight, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { inject, observer, toJS } from "mobx-react/native";
import mobx from "mobx";
import itineraryPlaces from '../itineraryPlaces';


console.log(mobx);

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
    fontSize: 20
  },
  itineraryList: {
    flex:1
  }
})

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Lists extends Component {
  constructor() {
    super();
    this.state = {
      dsItineraries: ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    var that = this;
    AsyncStorage.getItem('itineraries')
      .then(
        function(dataBlob) {
          const itineraries = Object.values(JSON.parse(dataBlob)); // => [{ name: 'Different', props: { places: [] }}]

          // {
            // keys
          //   values: Object.values(JSON.parse(dataBlob));
          // }
          that.setState({
            dsItineraries: ds.cloneWithRows(itineraries)
          })
        }
        // dsItineraries.cloneWithRows(itinerary.places.slice());
      ).catch(e => console.log(e));
  }

  renderRow = itinerary => {
    console.log(this);
    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight onPress={event => {
          this.props.navigator.push({
              name: 'ItineraryPlaces',
              component: itineraryPlaces,
              passProps: {itinerary},
              title: itinerary.name
        })}}><Text style={styles.itineraryList}>{itinerary.name}</Text></TouchableHighlight>
      </View>
    )
  };

  render(){
    const { dsItineraries } = this.state;



    return <View style={styles.container}>
    <ListView
      dataSource={dsItineraries}
      renderRow={this.renderRow}
    />
    </View>;
  }
}

export default inject(stores => ({
  itinerary: stores.itinerary
}))(observer(Lists));
