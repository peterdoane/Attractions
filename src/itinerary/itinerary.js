import { extendObservable } from 'mobx';

class Itinerary {
  constructor(attributes) {
    extendObservable(this, {
      name: '',
      location: attributes.location,
      interests: [],
      places: [],
      active: false
    });
  }

  toJSON() {
    return {
      name: this.name,
      location: this.location.toJSON(),
      interests: this.interests.slice(),
      places: this.places.slice()
    };
  }
}

export default Itinerary;
