import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage} from 'react-native';
import { inject, observer } from "mobx-react/native";
import Card from "./card";
import SwipeCards from 'react-native-swipe-cards';

class PhotoSwiper extends Component {
  handleYup = card => {
    this.props.itinerary.places.push(card);
  };

  handleNope = card => {
    //this.props.onSwipe();
    console.log(`Nope for ${card.text}`)
  };

  render() {
    return (
      <SwipeCards
        cards={this.props.photos}

        renderCard={(cardData) => {
          return <Card key={cardData.id} {...cardData} />;
        }}
        renderNoMoreCards={() => <Text>no more cards</Text>}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    )
  }
}

export default inject((stores) => ({
  itinerary: stores.itinerary
}))(observer(PhotoSwiper));
