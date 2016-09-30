import React, { Component } from "react";
import {StyleSheet, Text, View, Image, AsyncStorage, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
let maxHeight = height - 148; // header, tabs, Like/Dislike, place name
const ratio = maxHeight / 433;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center'
  },
  cardImage: {
    width: 414 * ratio,
    height: maxHeight
  },
  placeName: {
    color: '#FF6E3F',
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingLeft: 20,
    fontSize: 20,
    height: 30
  }
});

class Card extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{uri:this.props.image_url}} />
        <Text style={styles.placeName}>{this.props.name}</Text>
      </View>
    )
  }
}

export default Card;
