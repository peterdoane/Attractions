import { extendObservable } from 'mobx';
import Itinerary from "./itinerary";
import { AsyncStorage } from "react-native";

class Itineraries {
  constructor() {
    extendObservable(this, {
      itineraries: [],
      isLoaded: false
    });
  }

  toJSON() {
    return this.itineraries.map(itinerary => itinerary.toJSON());
  }

  set active(index) {
    this.itineraries.forEach(itinerary => itinerary.active = false);
    this.itineraries[index].active = true;
  }

  get active() {
    const activeItinerary = this.itineraries.filter(itinerary => itinerary.active);
    if (activeItinerary.length) return activeItinerary.shift();
    return this.itineraries.slice().shift();
  }

  create(itinerary) {
    this.itineraries.forEach(itinerary => itinerary.active = false);
    this.itineraries.push(itinerary);
    itinerary.active = true;
    return itinerary;
  }

  load() {
    return new Promise(resolve => {
      AsyncStorage.getItem('itineraries')
        .then(
          itineraries => {
            itineraries = JSON.parse(itineraries);
            if (Object.prototype.toString.call(itineraries) !== '[object Array]') {
              const finalItineraries = [];
              for (var prop in itineraries) {
                if (itineraries.hasOwnProperty(prop)) {
                  finalItineraries.push(itineraries[prop]);
                }
              }
              itineraries = finalItineraries;
            }
            this.itineraries.replace(itineraries.map(itinerary => new Itinerary(itinerary)));
            this.isLoaded = true;
            resolve();
          }
        )
    });
  }

  save() {
    AsyncStorage.setItem('itineraries', JSON.stringify(this.toJSON()));
  }
}

export default Itineraries;
