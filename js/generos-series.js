let genresListHtml = document.querySelector(".genres-list");
let genresList = "";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: CONFIG.API_KEY,
  },
};

fetch("https://api.themoviedb.org/3/genre/tv/list?language=es-ES", options)
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < res.genres.length; i++) {
      const genre = res.genres[i];
      genresList += `<a href="genre-detail.html?id=${genre.id}&genero=${genre.name}&comingFrom=series">${genre.name}</a>`;
    }
    genresListHtml.innerHTML = genresList;
  })
  .catch((err) => console.error(err));
