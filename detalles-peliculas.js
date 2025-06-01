let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get("id");

let movieDetailsHtml = document.querySelector(".movie-detail");
let movieDetails = "";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsIm5iZiI6MTY5ODY3NTE1MS4xNDMwMDAxLCJzdWIiOiI2NTNmYjljZjEwOWNkMDAxMGIwNGQwZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8uZ0fEXhmgz_zWVIxeNjsEEhktXMo_XuYT2rcbet_QY",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES-US`, options)
  .then((res) => res.json())
  .then((res) => {
    movieDetails += `
        <div class="movie-layout">
          <img
            src="https://image.tmdb.org/t/p/w500${res.poster_path}"
            alt="Portada de la película ${res.title}"
            class="movie-cover"
          />
          <div class="movie-info">
            <h1 class="movie-title">${res.title}</h1>
            <p class="movie-rating">Calificación: <span>${
              res.vote_average
            }/10</span></p>
            <p class="movie-release-date">
              Fecha de estreno: <span>${res.release_date}</span>
            </p>
            <p class="movie-duration">Duración: <span>${
              res.runtime
            } minutos</span></p>
            <p class="movie-synopsis">
              Sinopsis:
              <span>
                ${res.overview}
              </span>
            </p>
            <p class="movie-genre">
              Géneros: ${res.genres.map(
                (genre) =>
                  `<a href="genre-detail.html?id=${genre.id}&genero=${genre.name}"> ${genre.name}</a>`
              )}
            </p>
          </div>
        </div>
      `;
    movieDetailsHtml.innerHTML = movieDetails;
  })
  .catch((err) => console.error(err));
