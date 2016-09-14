import { extendObservable } from 'mobx';

class Location {
  constructor() {
    extendObservable(this, {
      latitude: null,
      longitude: null
    });
  }
}

export default Location;
