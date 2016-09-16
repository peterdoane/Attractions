export default function search(location, interests) {
  return new Promise((resolve, reject) => {
    const term = interests.join(",");
    const finalLocation = `${location.latitude},${location.longitude}`;
    const apiUrl = `http://localhost:3333/searchYelp?term=${encodeURIComponent(term)}&ll=${encodeURIComponent(finalLocation)}`;
    fetch(apiUrl)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        reject();
      });
  });
}

// example yelp api call for multiple categories
// from yelpapi import YelpAPI
// response = yelp_api.search_query(category_filter='food,mexican', location='austin, tx')
