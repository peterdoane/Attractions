import React, {Component} from 'react';
import {View, Text, Image, TextInput, ListView, TouchableHighlight, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { inject, observer } from "mobx-react/native";

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 40
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 15,
    borderColor: 'black',
    borderWidth: 1, //StyleSheet.hairlineWidth for "IOS" feel
    backgroundColor: '#f3f3f3'
  },
  rowImage: {
    width: 70,
    height: 70,
    marginRight: 20
  },
  rowText: {
    fontSize: 20
  }
})

class Lists extends Component {
  renderRow = place => {
    console.log("------->", place);
    return (
      <View style={styles.rowContainer} key={place.id}>
       <Image style={styles.rowImage} source={{uri:place.image_url}} />
       <Text style={styles.rowText}>{place.name}</Text>
     </View>
    )
  };

  render(){
    const { itinerary } = this.props;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    ds.cloneWithRows(itinerary.places.slice());

    return <View style={styles.container}>
    <ListView
        dataSource={ds}
        renderRow={this.renderRow}
      />
    </View>;
  }
}

export default inject(stores => ({
  itinerary: stores.itinerary
}))(observer(Lists));
