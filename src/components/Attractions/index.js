import React, {Component} from 'react';
import {View, Text, TextInput, TouchableHighlight, StyleSheet, ActivityIndicator} from 'react-native';
import { search } from "../../attractions/attractions";

//import PhotoSwiper from '../PhotoSwiper';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 2,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'blue'
  }
});


class Attractions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  doSearch() {
    this.setState({loading: true})
    search(this.search, this.location)
      .then(businesses => this.setState({loading: false, photos: businesses}));

  }
  searchText(val) {
    this.search = val;
  }
  searchLocation(val) {
    this.location = val;
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={this.searchText.bind(this)} style={styles.input} placeholder="What do you want to search"/>
        <TextInput onChangeText={this.searchLocation.bind(this)} style={styles.input} placeholder="Location?"/>
        <TouchableHighlight onPress={this.doSearch.bind(this)} style={styles.button} underlayColor='#ddd'>
          <View><Text>Do search!</Text></View>
        </TouchableHighlight>
        <ActivityIndicator size="small" animating={!!this.state.loading} />
        {
          this.state.photos && this.state.photos.length > 0 ?
            <PhotoSwiper photos={this.state.photos} /> :
            null
        }
      </View>
    );
  }
}

export default Attractions;
