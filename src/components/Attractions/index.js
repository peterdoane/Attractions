import React, {Component} from 'react';
import {View, Text, TextInput, TouchableHighlight, StyleSheet} from 'react-native';

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

    this.state = {

    };
  }
  doSearch() {
    console.log(this.state.search, this.state.location);
  }
  searchText(val) {
    this.setState({
      search: val
    })
  }
  searchLocation(val) {
    this.setState({
      location: val
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput onTextChanged={this.searchText.bind(this)} style={styles.input} placeholder="What do you want to search"/>
        <TextInput onTextChanged={this.searchLocation.bind(this)} style={styles.input} placeholder="Location?"/>
        <TouchableHighlight onPress={this.doSearch.bind(this)} style={styles.button} underlayColor='#ddd'>
          <View><Text>Do search!</Text></View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Attractions;
