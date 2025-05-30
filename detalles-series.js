let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get("id");

let seriesDetailsHtml = document.querySelector(".series-detail");
let seriesDetails = "";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsIm5iZiI6MTY5ODY3NTE1MS4xNDMwMDAxLCJzdWIiOiI2NTNmYjljZjEwOWNkMDAxMGIwNGQwZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8uZ0fEXhmgz_zWVIxeNjsEEhktXMo_XuYT2rcbet_QY",
  },
};

fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);

    seriesDetails += `
        <div class="series-layout">
          <img
            src="https://image.tmdb.org/t/p/w500${res.poster_path}"
            alt="Portada de la serie ${res.name}"
            class="series-cover"
          />
          <div class="series-info">
            <h1 class="series-title">${res.name}</h1>
            <p class="series-rating">Calificación: <span>${
              res.vote_average
            }/10</span></p>
            <p class="series-release-date">
              Fecha de estreno: <span>${res.first_air_date}</span>
            </p>
            <p class="series-synopsis">
              Sinopsis:
              <span>
                ${res.overview}
                </span
            </p>
            <p class="series-genre">
              Géneros: ${res.genres.map(
                (genre) =>
                  `<a href="genre-detail.html?id=${genre.id}"> ${genre.name}</a>`
              )}
            </p>
          </div>
        </div>
      `;
    seriesDetailsHtml.innerHTML = seriesDetails;
  })
  .catch((err) => console.error(err));
