import React, { Component } from "react";
import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';

const styles = StyleSheet.create({
  card: {
    alignItems: 'center'
  },
  cardImage: {
    width: 300,
    height: 300,
    marginBottom: 10
  }
});

class Card extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{uri:this.props.image_url}} />
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}

export default Card;
