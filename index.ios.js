import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image,
  TabBarIOS,
  StyleSheet,
  MapView,
  Navigator,
  Dimensions,
  AsyncStorage
} from 'react-native';
import Login from './src/components/Login';
import Itineraries from "./src/itinerary/itineraries";
import ItineraryView from "./src/components/itinerary/itinerary";
import {Provider} from "mobx-react/native";
import icon from './src/images/location-icon.png';
import IntroPage from './src/components/IntroPage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.5
  },
  subContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height
  }
})

class FinalProject extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      itineraries: new Itineraries()
    };
  }

  componentWillMount() {
    this.state.itineraries.load()
      .then(() => this.setState({ isReady: true }));
  }

  render() {
    if (!this.state.isReady) return null;

    console.log("hi");
    return (
      <Provider itineraries={this.state.itineraries}>
      <View style={styles.container}>
        <Image source={require('./src/images/background.jpg')} style={styles.backgroundImage} />
        <View style={styles.subContainer}>
          <Navigator
            initialRoute = {{
              component: !this.state.itineraries.itineraries.length ?
                IntroPage: ItineraryView
            }}
            renderScene = {(route, navigator) => {
              const props = { ...route };
              delete props.name;
              delete props.component;
              return (
                <route.component
                  navigator={navigator}
                  {...props}
                />
              );
            }}
          />
        </View>
      </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('withoutignite1', () => FinalProject);
