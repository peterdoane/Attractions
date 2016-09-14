import React, { Component } from "react";
import { View, Text } from "react-native";
import { inject, observer } from "mobx-react/native";
import PhotoSwiper from "./photoSwiper";

class Places extends Component {
  render() {
    const { itinerary } = this.props;

    return (
      <View>
        <Text>{itinerary.name}</Text>
        <PhotoSwiper />
      </View>
    );
  }
}

export default inject((stores, props) => ({ itinerary: props.stores.itinerary }))(observer(Places));
