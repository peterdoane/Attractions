import React from 'react';
import Geocoder from 'react-native-geocoder';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  MapView,
  AsyncStorage,
  TextInput
} from 'react-native';
import Interests from '../interests/interests';
import {inject, observer} from "mobx-react/native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subcontainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    // width: 375,
    // height: 200,
    flexDirection: 'column-reverse',
    alignItems: 'stretch'
  },
  callToAction: {
    backgroundColor: 'green',
    padding: 10,
    // width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    height: 76
  },
  callToActionButton: {
    color: 'black',
    fontSize: 20
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingRight: 12,
    paddingLeft: 12
  }
});

class SetLocation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    const {itinerary} = this.props;
    console.log(itinerary);
    navigator.geolocation.getCurrentPosition(position => {
      console.log('whatev', itinerary);

      itinerary.location.latitude = position.coords.latitude;
      itinerary.location.longitude = position.coords.longitude;
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      Geocoder.geocodePosition({lat: itinerary.location.latitude, lng: itinerary.location.longitude}).then(res => {
        console.log(res);
        // res is an Array of geocoding object (see below)
        this.setState({address: res[0].formattedAddress});
      }).catch(err => console.log(err));
      this.setState({isReady:true})
    }, error => {
      itinerary.location.latitude = 47.5989620;
      itinerary.location.longitude = -122.3337990;
      this.setState({
        latitude: 47.5989620,
        longitude: -122.3337990
      });
      this.setState({isReady: true});
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  }

  setLocation = () => {
    this.props.navigator.push({component: Interests, itinerary: this.props.itinerary});
  };

  searchNewLocation(text){
    this.newLocation = text;
    this.launchSearch();
    this.setState({text});
  }

  launchSearch(){
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      Geocoder.geocodeAddress(this.newLocation).then(res => {
        if(res && res.length > 0){
          this.setState({
            latitude: res[0].position.lat,
            longitude: res[0].position.lng
          });
        }
        console.log(res);
      })
    }, 1000)
  }

  render() {
    const {itinerary} = this.props;

    if (!this.state.isReady || !this.state.latitude || !this.state.longitude) {
      return null;
    }

    return (
      <View style={styles.container}>
        <MapView region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.12,
          longitudeDelta: 0.065
        }} annotations={[{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }
        ]} style={{
          flex: 1
        }}/>

        <View style={styles.subcontainer}>
          <TouchableHighlight style={styles.callToAction} onPress={this.setLocation}>
            <Text style={styles.callToActionButton}>
              Set location
            </Text>
          </TouchableHighlight>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.searchNewLocation(text)}
            value={this.state.text}
            backgroundColor='white'
            placeholder={this.state.address}/>
        </View>
      </View>
    )
  }
}

export default inject((stores, props) => ({itineraries: stores.itineraries, itinerary: props.itinerary}))(observer(SetLocation));
