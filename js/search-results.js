let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let mediaType = queryStringObj.get("media-type");
console.log(`🚀 - mediaType:`, mediaType);

let searchQuery = queryStringObj.get("query");
console.log(`🚀 - searchQuery:`, searchQuery);

let resultsItemsHtml = document.querySelector(".results-list");
let resultsItems = "";
let title = document.querySelector(".results-title");
let form = document.querySelector(".search-form");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: CONFIG.API_KEY,
  },
};

let get_release_year = (title, date) => {
  return `${title} (${date.split("-")[0]}) `;
};

fetch(
  `https://api.themoviedb.org/3/search/${mediaType}?query=${searchQuery}&include_adult=false&language=es-ES&page=1`,
  options
)
  .then((res) => res.json())
  .then((res) => {
    title.innerHTML = `Resultados para: "${searchQuery}"`;
    if (mediaType === "movie") {
      for (let i = 0; i < res.results.length; i++) {
        resultsItems += `
        <div class="result-item">
        <a href="detalle-pelicula.html?id=${res.results[i].id}">
        <img src="https://image.tmdb.org/t/p/w500/${
          res.results[i].poster_path
        }" alt="Película ${res.results[i].id}" />
          <h3>${get_release_year(
            res.results[i].title,
            res.results[i].release_date
          )}</h3>
          </a>
          </div>`;
      }
    } else {
      for (let i = 0; i < res.results.length; i++) {
        resultsItems += `
        <div class="result-item">
        <a href="detalle-serie.html?id=${res.results[i].id}">
        <img src="https://image.tmdb.org/t/p/w500/${
          res.results[i].poster_path
        }" alt="Serie ${res.results[i].id}" />
          <h3>${get_release_year(
            res.results[i].name,
            res.results[i].first_air_date
          )}</h3>
          </a>
          </div>`;
      }
    }
    resultsItemsHtml.innerHTML = resultsItems;
    if (resultsItems === "") {
      resultsItemsHtml.innerHTML = `<p>No se encontraron resultados para "${searchQuery}".</p>`;
    }
  })
  .catch((err) => console.error(err));
