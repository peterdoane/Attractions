export default function search(location, interests) {
  return new Promise((resolve, reject) => {
    const term = interests.join(",");
    const finalLocation = `${location.latitude},${location.longitude}`;
    const apiUrl = `https://peterdoane-attraction.herokuapp.com/searchYelp?term=${encodeURIComponent(term)}&ll=${encodeURIComponent(finalLocation)}`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}

// example yelp api call for multiple categories
// from yelpapi import YelpAPI
// response = yelp_api.search_query(category_filter='food,mexican', location='austin, tx')
// https://peterdoane-attraction.herokuapp.com/
