import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    ListView,
    TouchableHighlight,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    NavigatorIOS,
} from 'react-native';
import Lists from './itinerariesList';

class ListNavigator extends Component{
  render(){
    return (
      <NavigatorIOS
        initialRoute={{
          component: Lists,
          title: 'itineraries'
        }}
        style={{flex:1}}
      />
    )
  }

}

export default ListNavigator;
