import React from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

let Card = React.createClass({
  render() {
    console.log(this.props);
    return (
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{uri:this.props.image_url}} />
        <Text>{this.props.name}</Text>
      </View>
    )
  }
})

export default React.createClass({
  handleYup (card) {
    AsyncStorage.getItem('itineraries')
      .then(
        function(itineraries) {
          if (itineraries) {
            try {
              itineraries = JSON.parse(itineraries);
            }
            catch(e) {
              itineraries = [];
            }
          }
          else {
            itineraries = [];
          }

          itineraries.push(card);

          return AsyncStorage.setItem('itineraries', JSON.stringify(itineraries));
        }
      )
      .then(
        function() {
          AsyncStorage.getItem('itineraries').then(i => console.log(i));
        }
      )
  },
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  },
  render() {
    console.log(this.props.photos);
    return (
      <SwipeCards
        cards={this.props.photos}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <Text>no more cards</Text>}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    alignItems: 'center'
  },
  cardImage: {
    width: 300,
    height: 300,
    marginBottom: 10
  }
})
