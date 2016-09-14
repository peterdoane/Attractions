import { extendObservable } from 'mobx';

class Itinerary {
  constructor(attributes) {
    extendObservable(this, {
      name: '',
      location: attributes.location,
      interests: [],
      places: []
    });
  }
}

export default Itinerary;
