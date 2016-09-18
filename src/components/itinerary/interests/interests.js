import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Image,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { inject, observer } from "mobx-react/native";
import Itinerary from '../../../itinerary/itinerary';
import ItineraryView from "../itinerary";

var width = Dimensions.get('window').width;

// width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    width: width,
    height: 64,
    backgroundColor: '#FF5722',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#979797',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'white'
  },
  itineraryName: {
    width: width,
    height: 64,
    backgroundColor: 'rgba(196,196,196,0.57)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    width: width,
    height: 64,
    padding: 20,
    textAlign: 'center'
  },
  cards: {
    marginLeft: 25,
    width: width - 50,
    height: 667 - 64 * 3,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  card: {
    width: (width - 50) / 3,
    height: 150,
    //opacity: 0.5
  },
  cardImage: {
    width: 90,
    height: 90
  }
});

class ItineraryComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }

  toggleCard(queryName) {
    let newCards = [];
    if(this.state.cards.indexOf(queryName) > -1){
        this.sourceCards.filter((card) => {
          return this.state.cards.indexOf(card.queryName) !== -1;
        }).forEach((card) => {
        if (card.queryName !== queryName){
          newCards.push(card.queryName);
          console.log('queryName',card.queryName,queryName);
        }
      })
    } else{
      this.state.cards.push(queryName);
      newCards = this.state.cards;
    }
    console.log(newCards);
    this.props.itinerary.interests = newCards;
    this.setState({
      cards: newCards
    });
  }

  handleSubmit = () => {
    var that = this;

    AsyncStorage.getItem('itineraries')
      .then(
        function(itineraries) {
          if (itineraries) {
            try {
              itineraries = JSON.parse(itineraries);
            }
            catch(e) {}
          }

          itineraries = itineraries || {};

          var itinerary = itineraries[that.props.itinerary.name] || that.props.itinerary;

          itineraries[itinerary.name] = itinerary;

          AsyncStorage.setItem('itineraries', JSON.stringify(itineraries))
            .then(
              function() {
                that.props.navigator.push({
                    name: 'ItineraryView',
                    component: ItineraryView,
                    stores: { itinerary: that.props.itinerary }
                });
              }
            )
        }
      )
  };

  render() {
    const { itinerary } = this.props;

    const cards = [{
      caption: 'Hiking',
      queryName:'hiking',
      image: require('../../../images/hiking.png'),
      color: '#E2751F'
    }, {
      caption: 'Art & Museums',
      queryName:'art,museums',
      image: require('../../../images/art.png'),
      color: '#E2751F'
    }, {
      caption: 'Gardens & Parks',
      queryName:'gardens,parks',
      image: require('../../../images/parks.png'),
      color: '#E2751F'
    }, {
      caption: 'Food',
      queryName:'food',
      image: require('../../../images/food.png'),
      color: '#E2751F'
    }, {
      caption: 'Beauty & Spa',
      queryName:'beauty',
      image: require('../../../images/spas.png'),
      color: '#E2751F'
    }, {
      caption: 'Hotels & Lodging',
      queryName:'hotels',
      image: require('../../../images/hotels.png'),
      color: '#E2751F'
    }, {
      caption: 'Tours',
      queryName:'tours',
      image: require('../../../images/tours.png'),
      color: '#E2751F'
    }, {
      caption: 'Nightlife',
      queryName:'nightlife',
      image: require('../../../images/nightlife.png'),
      color: '#E2751F'
    }, {
      caption: 'Cinema',
      queryName:'cinema',
      image: require('../../../images/Cinema.png'),
      color: '#E2751F'
    }];

    this.sourceCards = cards;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Name Your Itinerary</Text>
          <TouchableHighlight onPress={this.handleSubmit}>
            <Text>Done</Text>
          </TouchableHighlight>
        </View>
        <TextInput
          onChangeText={name => itinerary.name = name}
          style={styles.itineraryName}
        />
        <Text style={styles.subtitle}>Choose your interests:</Text>
        <View style={styles.cards}>
          {cards.map((card, index) => {
            const style = [
              styles.card,
              StyleSheet.create({ background: {
                backgroundColor: card.color
              } }).background
            ];

            return <TouchableHighlight
              key={index}
              style={style}
              onPress={this.toggleCard.bind(this, card.queryName)}>
              <View>
              <Image
                resizeMode='contain'
                style={styles.cardImage}
                source={card.image} />
              <Text>{card.caption}</Text>
              </View>
            </TouchableHighlight>;
          })}
        </View>
      </View>
    );
  }
}

export default inject((stores, props) => ({
  itinerary: new Itinerary({ location: props.stores.location }),
  location: props.stores.location
}))(observer(ItineraryComponent));
