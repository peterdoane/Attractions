import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage} from 'react-native';
import { inject, observer } from "mobx-react/native";
import Card from "./card";
import SwipeCards from 'react-native-swipe-cards';

class PhotoSwiper extends Component {
  handleYup = card => {
    //this.props.onSwipe();

    /*AsyncStorage.getItem('itineraries')
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
      )*/
  };

  handleNope = card => {
    //this.props.onSwipe();
    console.log(`Nope for ${card.text}`)
  };

  render() {
    console.log(this.props.photos);
    console.log(this.props.photos.length);
    return (
      <SwipeCards
        cards={this.props.photos}

        renderCard={(cardData) => {
          console.log(cardData);
          return <Card {...cardData} />;
        }}
        renderNoMoreCards={() => <Text>no more cards</Text>}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    )
  }
}

export default inject((stores, props) => ({
  itinerary: props.stores.itinerary
}))(observer(PhotoSwiper));
