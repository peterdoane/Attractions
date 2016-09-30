import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableHighlight, Navigator } from "react-native";
import { inject, observer } from "mobx-react/native";
import PhotoSwiper from "./photoSwiper";
import search from "../../../yelp/search";
import SetLocation from "../setLocation/setLocation";
import Itinerary from "../../../itinerary/itinerary";

const styles = StyleSheet.create({
  container: {
  
  }
});

class Places extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }

  componentWillMount() {
    const { itinerary } = this.props;
    const location = null; // pick location from the store after it has been set in setLocation

    // TODO: search(term, location)
    search(itinerary.location, itinerary.interests).then(response => {
      this.setState({
        cards: response,
        cardsLeft: response.length,
        cardsReceived: true
      });
    });
  }

  componentDidUpdate() {
    const {
      cardsLeft
    } = this.state;

    if (cardsLeft === 0) {
      this.props.navigator.push({
        name: 'Itineraries',
        component: Itineraries,
      });
    }
  }

  handleSwipe = () => {
    this.setState({ cardsLeft: this.state.cardsLeft - 1})
  };

  render() {
    const { itinerary } = this.props;
    const { cards } = this.state;

    return (
      <View style={styles.container}>
        <PhotoSwiper
          photos={cards}
          onSwipe={this.handleSwipe}
        />
      </View>
    );
  }
}

export default inject(stores => {
  return { itinerary: stores.itineraries.active }
})(observer(Places));
