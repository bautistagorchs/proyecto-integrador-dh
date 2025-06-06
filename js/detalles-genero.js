let genreItemsMoviesHtml = document.querySelector(".genre-items-movies");
let genreItemsMovies = "";
let genreItemsSeriesHtml = document.querySelector(".genre-items-series");

let genreItemsSeries = "";
let genreTitle = document.querySelector(".genre-title");
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get("id");
let genre = queryStringObj.get("genero");
let comingFrom = queryStringObj.get("comingFrom");
let container = document.querySelector(".peliculas-and-series-container");
console.log(`🚀 - container:`, container);

if (comingFrom === "series") {
  container.classList.add("series-reverse");
}

let get_release_year = (title, date) => {
  return `${title} (${date.split("-")[0]}) `;
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: CONFIG.API_KEY,
  },
};

fetch(
  `https://api.themoviedb.org/3/discover/movie?&language=es-ES&with_genres=${id}`,
  options
)
  .then((res) => res.json())
  .then((res) => {
    genreTitle.innerHTML = `Resultados para el género: ${genre}`;
    for (let i = 0; i < res.results.length; i++) {
      genreItemsMovies += `
        <div class="item">
          <a href="detalle-pelicula.html?id=${res.results[i].id}">
            <img src="https://image.tmdb.org/t/p/w500${
              res.results[i].poster_path
            }" alt="Pelicula ${res.results[i].title}" />
            <h3>${get_release_year(
              res.results[i].title,
              res.results[i].release_date
            )}</h3>
          </a>
        </div>`;
    }
    if (genreItemsMovies === "") {
      genreItemsMovies = `<p>No hay películas disponibles en este género.</p>`;
    }
    genreItemsMoviesHtml.innerHTML = genreItemsMovies;
  })
  .catch((err) => console.error(err));

fetch(
  `https://api.themoviedb.org/3/discover/tv?&language=es-ES&with_genres=${id}`,
  options
)
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < res.results.length; i++) {
      genreItemsSeries += `
        <div class="item">
          <a href="detalle-serie.html?id=${res.results[i].id}">
            <img src="https://image.tmdb.org/t/p/w500${
              res.results[i].poster_path
            }" alt="Serie ${res.results[i].name}" />
            <h3>${get_release_year(
              res.results[i].name,
              res.results[i].first_air_date
            )}</h3>
          </a>
        </div>`;
    }
    if (genreItemsSeries === "") {
      genreItemsSeries = `<p>No hay series disponibles en este género.</p>`;
    }
    genreItemsSeriesHtml.innerHTML = genreItemsSeries;
  })
  .catch((err) => console.error(err));
