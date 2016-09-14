export function search(term, location) {
  return new Promise((resolve, reject) => {
    var apiUrl = `http://localhost:3333/searchYelp?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(resolve);
  });
}
