let popular_moviesHtml = document.querySelector("#items-popular-movies");
let popular_movies = "";
let popular_tvshowsHtml = document.querySelector("#items-popular-tvshows");
let popular_tvshows = "";
let trending_moviesHtml = document.querySelector("#items-top-rated");
let trending_movies = "";

let get_release_year = (date) => {
  return date.split("-")[0];
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsIm5iZiI6MTY5ODY3NTE1MS4xNDMwMDAxLCJzdWIiOiI2NTNmYjljZjEwOWNkMDAxMGIwNGQwZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8uZ0fEXhmgz_zWVIxeNjsEEhktXMo_XuYT2rcbet_QY",
  },
};

// Fetch para obtener "Exitos en pantalla"
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < res.results.length; i++) {
      popular_movies += `
        <a href="detalle-pelicula.html?id=${res.results[i].id}">
            <img src="https://image.tmdb.org/t/p/w500/${
              res.results[i].poster_path
            }" alt="Película ${res.results[i].id}" />
            <h3>${
              res.results[i].title +
              " (" +
              get_release_year(res.results[i].release_date) +
              ")"
            }</h3>
        </a>
      `;
    }
    popular_moviesHtml.innerHTML = popular_movies;
  })
  .catch((err) => console.error(err));

// Fetch para obtener "Series en auge"
fetch("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1", options)
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < res.results.length; i++) {
      popular_tvshows += `
        <a href="detalle-serie.html?id=${res.results[i].id}">
          <img src="https://image.tmdb.org/t/p/w500/${
            res.results[i].poster_path
          }" alt="Película ${res.results[i].id}" />
          <h3>${
            res.results[i].name +
            " (" +
            get_release_year(res.results[i].first_air_date) +
            ")"
          }</h3>
        </a>
  `;
    }
    popular_tvshowsHtml.innerHTML = popular_tvshows;
  })
  .catch((err) => console.error(err));

// Fetch para obtener "En boca de todos"
fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < res.results.length; i++) {
      trending_movies += `
        <a href="detalle-pelicula.html">
          <img src="https://image.tmdb.org/t/p/w500/${
            res.results[i].poster_path
          }" alt="Película ${res.results[i].id}" />
          <h3>${
            res.results[i].title +
            " (" +
            get_release_year(res.results[i].release_date) +
            ")"
          }</h3>
        </a>
      `;
    }
    trending_moviesHtml.innerHTML = trending_movies;
  })
  .catch((err) => console.error(err));
