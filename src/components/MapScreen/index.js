import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  MapView,
  AsyncStorage
} from 'react-native';
import Categories from '../Categories';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subcontainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 375,
    // height: 200,
    flexDirection: 'column-reverse',
    alignItems: 'center'
  },
  callToAction: {
    backgroundColor: 'green',
    padding: 10,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center'
  },
  callToActionButton: {
    color: 'white'
  }
});

class MapScreen extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                mockLocations: [],
                isReady: false,
                region: {}
            };
        }

        componentWillMount(){
          AsyncStorage.getItem('itineraries')
            .then((itineraries) =>{
              itineraries = JSON.parse(itineraries);
              if(Array.isArray(itineraries)){
              const annotations = itineraries.map(itinerary => {
                const location = this.getLocations(itinerary)
                if (location){
                  return location;
                }
              })
                this.setState({mockLocations:annotations})
              }
            })

            navigator.geolocation.getCurrentPosition(
              position => {
                console.log(position);
                this.setState({ isReady: true, region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                } });
              },
              error => {
                this.setState({ isReady: true, region: {
                  latitude: -73.5,
                  longitude: 45.5
                } });
              },
              {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
              }
            );
        }


        getLocations(location){
        if(location.location){
          return {
              latitude: location.location.coordinate.latitude,
              longitude: location.location.coordinate.longitude,
              animateDrop: true,
              draggable: false,
              onDragStateChange: function(){},
              onFocus: function(){},
              onBlur: function(){},
              title: 'location title',
              subtitle: '',
              // leftCalloutView: element,
              // rightCalloutView: element,
              // detailCalloutView: element,
              // tintColor: [object Object],
              // image: Image.propTypes.source,
              // view: element,
              // id: string,
              // hasLeftCallout: deprecatedPropType(React.PropTypes.bool, 'Use `leftCalloutView` instead.'),
              // hasRightCallout: deprecatedPropType(React.PropTypes.bool, 'Use `rightCalloutView` instead.'),
              // onLeftCalloutPress: deprecatedPropType(React.PropTypes.func, 'Use `leftCalloutView` instead.'),
              // onRightCalloutPress: deprecatedPropType(React.PropTypes.func, 'Use `rightCalloutView` instead.')
          }
         }
        }

        setLocation() {
          this.props.navigator.push({
            name: 'Categories',
            component: Categories
          });
        }

        render() {
          if (!this.state.isReady) return null;

          return(
            <View style={styles.container}>
              <MapView
                region = {
                  {
                    ...this.state.region ,
                    latitudeDelta: 0.12,
                    longitudeDelta: 0.065
                  }
                }
                annotations = {
                  this.state.mockLocations
                }
                style = {
                  {
                    flex: 1
                  }
                }
                overlays = {
                  [{
                    coordinates: [{
                      latitude: 32.47,
                      longitude: -107.85
                    }, {
                      latitude: 45.13,
                      longitude: -94.48
                    }, {
                      latitude: 39.27,
                      longitude: -83.25
                    }, {
                      latitude: 32.47,
                      longitude: -107.85
                    }, ],
                    strokeColor: '#f007',
                    lineWidth: 3,
                  }]
                } />
              <View style={styles.subcontainer}>
                <TouchableHighlight
                  style={styles.callToAction}
                  onPress={this.setLocation.bind(this)}>
                  <Text style={styles.callToActionButton}>
                    Set location
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          )
        }
      }

export default MapScreen;
