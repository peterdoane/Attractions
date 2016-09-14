import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Image,
  Dimensions
  // AsyncStorage
} from 'react-native';

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
    width: 125,
    height: 150
  }
});

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: {}
    };
  }

  toggleCard(index) {
    this.setState({
      cards: {
        [index]: !this.state.cards[index]
      }
    });
  }

  render() {
    const cards = [{
      caption: 'Hiking',
      image: require('../../images/hiking.png'),
      color: '#E2751F'
    }, {
      caption: 'Art & Museums',
      image: require('../../images/art.png'),
      color: '#E2751F'
    }, {
      caption: 'Gardens & Parks',
      image: require('../../images/parks.png'),
      color: '#E2751F'
    }, {
      caption: 'Food',
      image: require('../../images/food.png'),
      color: '#E2751F'
    }, {
      caption: 'Beauty & Spa',
      image: require('../../images/spas.png'),
      color: '#E2751F'
    }, {
      caption: 'Hotels & Lodging',
      image: require('../../images/hotels.png'),
      color: '#E2751F'
    }, {
      caption: 'Tours',
      image: require('../../images/tours.png'),
      color: '#E2751F'
    }, {
      caption: 'Nightlife',
      image: require('../../images/nightlife.png'),
      color: '#E2751F'
    }, {
      caption: 'Ciname',
      image: require('../../images/Cinema.png'),
      color: '#E2751F'
    }];

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Your Itinerary</Text>
        </View>
        <TextInput
          style={styles.itineraryName} />
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
              onPress={this.toggleCard.bind(this, index)}>
              <Image
                style={styles.cardImage}
                source={card.image} />
            </TouchableHighlight>;
          })}
        </View>
      </View>
    );
  }
}

export default Categories;
