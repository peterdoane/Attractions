import React, {Component} from 'react';
import {View, Text, Image, TextInput, ListView, TouchableHighlight, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';

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

class Itineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {itineraries:null};
  }
  componentDidMount(){
    AsyncStorage.getItem('itineraries')
      .then((itineraries) => {
        if(itineraries){
          try{
            itineraries = JSON.parse(itineraries);
          }
          catch(e){
            itineraries = [];
          }
        }
        else{
          itineraries = [];
        }
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({itineraries:ds.cloneWithRows(itineraries)});
      })
  }
  renderRow(location) {
    return (
      <View style={styles.rowContainer} key={location.name}>
       <Image style={styles.rowImage} source={{uri:location.image_url}} />
       <Text style={styles.rowText}>{location.name}</Text>
     </View>
    )
  }
  render(){
    console.log('rendering itineraries', this.state.itineraries);
    return <View style={styles.container}>
    {this.state.itineraries === null ? <View/> : <ListView
        dataSource={this.state.itineraries}
        renderRow={this.renderRow.bind(this)}
      />}



      {/* {this.state.itineraries.map((location) =>
         <View style={{flex:1}} key={location.name}>
          <Image style={{width:100, height:100, position:'absolute'}} source={{uri:location.imageUrl}} />
          <Text style={{position:'absolute', top:10}}>{location.name}</Text>
        </View>
      )} */}
    </View>;
  }
}

export default Itineraries;
