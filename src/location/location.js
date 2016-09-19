import { extendObservable } from 'mobx';

class Location {
  constructor() {
    extendObservable(this, {
      latitude: null,
      longitude: null
    });
  }

  toJSON() {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  }
}

export default Location;
