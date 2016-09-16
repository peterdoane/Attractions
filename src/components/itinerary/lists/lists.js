import React, {Component} from 'react';
import {View, Text, Image, TextInput, ListView, TouchableHighlight, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { inject, observer, toJS } from "mobx-react/native";
import mobx from "mobx";

console.log(mobx);

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
  rowContent: {
    flexDirection: 'column',
  },
  rowText: {
    fontSize: 20
  }
})

class Lists extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  renderRow = place => {
    return (
      <View style={styles.rowContainer} key={place.id}>
       <Image style={styles.rowImage} source={{uri:place.image_url}} />
       <View style={styles.rowContent}>
       <Text style={styles.rowText}>{place.name}</Text>
       <Text style={styles.rowText}>{place.location.display_address[0]}</Text>
       <Text style={styles.rowText}>{place.location.display_address[1]}</Text>
       <Text style={styles.rowText}>{place.location.display_address[2]}</Text>
       </View>
     </View>
    )
  };

  render(){
    const { itinerary } = this.props;

    const ds = this.state.dataSource.cloneWithRows(itinerary.places.slice());

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
