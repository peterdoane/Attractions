import React, { Component } from "react";
import { View, Text } from "react-native";
import { inject, observer } from "mobx-react/native";
import PhotoSwiper from "./photoSwiper";
import Itineraries from '../../Itineraries';
import search from "../../../yelp/search";

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

  render() {
    const { itinerary } = this.props;
    const { cards } = this.state;

    return (
      <View>
        <Text>{itinerary.name}</Text>
        <PhotoSwiper
          photos={cards}
          stores={{ itinerary }}
          onSwipe={() => this.setState({ cardsLeft: this.state.cardsLeft - 1})} />
      </View>
    );
  }
}

export default inject((stores, props) => ({ itinerary: props.stores.itinerary }))(observer(Places));
