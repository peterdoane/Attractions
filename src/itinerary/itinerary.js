import { extendObservable, toJS } from 'mobx';

function isValidLocation(location) {
  if (location === undefined || typeof location !== "object") return false;
  if (location && location.latitude && location.longitude) return true;
  return false;
}

class Itinerary {
  constructor(attributes = {}) {
    extendObservable(this, {
      name: attributes.name ? attributes.name : "",
      location: isValidLocation(attributes.location) ? attributes.location : { latitude: null, longitude: null },
      interests: attributes.interests ? attributes.interests : [],
      places: attributes.places ? attributes.places : [],
      active: attributes.active ? true : false
    });
  }

  toJSON() {
    return {
      name: this.name,
      location: toJS(this.location),
      interests: this.interests.slice(),
      places: this.places.slice(),
      active: this.active,
    };
  }
}

export default Itinerary;
