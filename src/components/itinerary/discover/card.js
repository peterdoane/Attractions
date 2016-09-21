import React, { Component } from "react";
import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center'
  },
  cardImage: {
    width: 414,
    height: 433,
    marginBottom: 43
  },
  placeName: {
    color: '#FF6E3F',
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingLeft: 20,
    fontSize: 20
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
