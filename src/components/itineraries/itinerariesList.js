import React, {Component} from 'react';
import {View, Text, Image, TextInput, Button, ListView, TouchableHighlight, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { inject, observer, toJS } from "mobx-react/native";
import itineraryPlaces from '../itinerary/places/places';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 40
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // margin: 15,
    // padding: 15,
    borderColor: 'black',
    borderWidth: 1, //StyleSheet.hairlineWidth for "IOS" feel
    backgroundColor: '#FF5722',
    height: 64

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
    flex:1,
  }
})

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dsItineraries: ds.cloneWithRows((
        props.itineraries && props.itineraries.itineraries ? props.itineraries.itineraries.slice() : []))
    };
  }

  renderRow = (itinerary, section, index) => {
    return (
      <View>
        <TouchableHighlight
          style={styles.rowContainer}
          onPress={event => {
            this.props.itineraries.active = index;
            this.props.itineraries.save();
            //AsyncStorage.setItem('activeItinerary', JSON.stringify(itinerary))
            this.props.navigator.push({
              component: itineraryPlaces
            })
          }}
        >
          <Text style={styles.itineraryList}>{itinerary.name}</Text>
        </TouchableHighlight>
      </View>
    )
  };

  render(){
    const { dsItineraries } = this.state;

    return <View style={styles.container}>
    <ListView
      enableEmptySection={false}
      dataSource={dsItineraries}
      renderRow={this.renderRow}
    />
    </View>;
  }
}

export default inject(stores => ({
  itineraries: stores.itineraries
}))(observer(Lists));
