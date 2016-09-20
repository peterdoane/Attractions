import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';
import { inject, observer } from "mobx-react/native";
import Card from "./card";
import SwipeCards from 'react-native-swipe-cards';

const styles = StyleSheet.create({
  title: {
    fontSize: 40
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});

class PhotoSwiper extends Component {
  handleYup = card => {
    var that = this;
    this.props.itinerary.places.push(card);
    // AsyncStorage.getItem('itineraries')
    //   .then(
    //     function(itineraries) {
    //       itineraries = JSON.parse(itineraries);
    //       itineraries[that.props.itinerary.name].places.push(card);
    //       AsyncStorage.setItem('itineraries', JSON.stringify(itineraries));
    //     }
    //   )
  };

  handleNope = card => {
    //this.props.onSwipe();
    console.log(`Nope for ${card.text}`)
  };

  render() {
    return (
      <View>
        <SwipeCards
          cards={this.props.photos}

          renderCard={(cardData) => {
            return <Card style={styles.title} key={cardData.id} {...cardData} />;
          }}
          renderNoMoreCards={() => <Text>no more cards</Text>}

          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />
        <View style={styles.backButton}><Text>Back</Text></View>
      </View>
    )
  }
}

export default inject((stores) => ({
  itinerary: stores.itineraries.active
}))(observer(PhotoSwiper));
