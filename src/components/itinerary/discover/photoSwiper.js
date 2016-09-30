import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableHighlight} from 'react-native';
import { inject, observer } from "mobx-react/native";
import Card from "./card";
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  title: {
    fontSize: 40
  },
  buttons: {
    height: 65,
    flexDirection: 'row'
  },
  dislike: {
    flex: .5,
    height: 65,
    backgroundColor: '#FF6E3F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  like: {
    flex: .5,
    height: 65,
    backgroundColor: '#68F1AD',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class PhotoSwiper extends Component {
  handleYup = card => {
    this.props.itinerary.places.push(card);
  };

  handleNope = card => {
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
          renderNoMoreCards={() => <Text style={styles.cardText}>no more cards</Text>}

          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />
        {/*<View style={styles.buttons}>
          <TouchableHighlight style={styles.dislike}>
            <Icon name="times" size={30} color="white" />
          </TouchableHighlight>
          <TouchableHighlight style={styles.like}>
            <Icon name="heart" size={30} color="white" />
          </TouchableHighlight>
        </View>*/}
      </View>
    )
  }
}

export default inject((stores) => ({
  itinerary: stores.itineraries.active
}))(observer(PhotoSwiper));
