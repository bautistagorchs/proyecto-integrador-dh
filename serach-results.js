let resultsItemsHtml = document.querySelector(".results-items");
let resultsItems = "";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: CONFIG.API_KEY,
  },
};

fetch(
  "https://api.themoviedb.org/3/search/movie?query=buscar&include_adult=false&language=es-ES-US&page=1",
  options
)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
