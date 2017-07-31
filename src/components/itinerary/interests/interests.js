import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Image,
  Dimensions,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { inject, observer } from "mobx-react/native";
import Itinerary from '../../../itinerary/itinerary';
import ItineraryView from "../itinerary";
import checkMark from "../../../images/places.png";

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
    alignItems: 'center',
    alignSelf: 'center'
  },
  subtitle: {
    width: width,
    height: 64,
    padding: 20,
    textAlign: 'center',
    fontSize: 22
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
    height: 150
  },
  cardImage: {
    width: 60,
    height: 60,
  },
  cardText: {
    marginTop: 4,
    fontSize: 18,
    textAlign: 'center',
    color: "#4D555B",
    paddingLeft: 4,
    paddingRight: 4
  },
  checkMark: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 0,
    right: 0
  },
  done: {
    position: 'absolute',
    right: 4,
    top: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText:{
    fontSize:22
  },
  unselectedCard: {
    width: (width - 50) / 3,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedCard: {
    width: (width - 50) / 3,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .8)'
  }
});

class ItineraryComponent extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.itinerary.interests = newCards;
    this.setState({
      cards: newCards
    });
  }

  handleSubmit = () => {
    this.props.itineraries.create(this.props.itinerary);
    this.props.itineraries.save();
    this.props.navigator.push({
        name: 'ItineraryView',
        component: ItineraryView
    });
  };

  render() {
    const { itinerary } = this.props;

    const cards = [{
      caption: 'Hiking',
      queryName:'hiking',
      image: require('../../../images/hiking.png'),
      color: '#E2751F',
    }, {
      caption: 'Art & Museums',
      queryName:'art,museums',
      image: require('../../../images/art.png'),
      color: '#5FD669'
    }, {
      caption: 'Gardens & Parks',
      queryName:'gardens,parks',
      image: require('../../../images/parks.png'),
      color: '#F7E357'
    }, {
      caption: 'Food',
      queryName:'food',
      image: require('../../../images/food.png'),
      color: '#AC61E6'
    }, {
      caption: 'Beauty & Spa',
      queryName:'beauty',
      image: require('../../../images/spas.png'),
      color: '#45BEC8'
    }, {
      caption: 'Hotels & Lodging',
      queryName:'hotels',
      image: require('../../../images/hotels.png'),
      color: '#D66C69'
    }, {
      caption: 'Tours',
      queryName:'tours',
      image: require('../../../images/tours.png'),
      color: '#E64A19'
    }, {
      caption: 'Nightlife',
      queryName:'nightlife',
      image: require('../../../images/nightlife.png'),
      color: '#E2751F'
    }, {
      caption: 'Cinema',
      queryName:'cinema',
      image: require('../../../images/Cinema.png'),
      color: '#5FD669'
    }];

    this.sourceCards = cards;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <TouchableHighlight onPress={this.handleSubmit} style={styles.done}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableHighlight>
        </View>
        <TextInput
          placeholder='name your itinerary'
          defaultValue={itinerary.name}
          onChangeText={name => itinerary.name = name}
          style={styles.itineraryName}
          backgroundColor='white'
        />
        <Text style={styles.subtitle}>Choose your interests:</Text>
        <ScrollView>
          <View style={styles.cards}>
            {cards.map((card, index) => {
              const style = [
                styles.card,
                StyleSheet.create({ background: {
                  backgroundColor: card.color
                } }).background
              ];

              var selected = this.state.cards.some(c => c === card.queryName);
              return <TouchableHighlight
                key={index}
                style={style}
                onPress={this.toggleCard.bind(this, card.queryName)}>
                <View style={selected ? styles.selectedCard : styles.unselectedCard}>
                <Image
                  resizeMode='contain'
                  style={styles.cardImage}
                  source={card.image} />
                <Text style={styles.cardText}>{card.caption}</Text>
                </View>
              </TouchableHighlight>;
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default inject((stores, props) => ({
  itinerary: props.itinerary,
  itineraries: stores.itineraries
}))(observer(ItineraryComponent));
