import React, {Component} from 'react';
import {View, Text, Image, TextInput, ListView, TouchableHighlight, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';

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
  render(){
    console.log('rendering itineraries', this.state.itineraries);
    return <View style={{flex:1}}>
    {this.state.itineraries === null ? <View/> : <ListView
        dataSource={this.state.itineraries}
        renderRow={(location) =><View key={location.name}>
         <Image style={{width:100, height:100}} source={{uri:location.imageUrl}} />
         <Text style={{position:'absolute', top:10}}>{location.name}</Text>
       </View>}
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
