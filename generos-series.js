let genresListHtml = document.querySelector(".genres-list");
let genresList = "";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsIm5iZiI6MTY5ODY3NTE1MS4xNDMwMDAxLCJzdWIiOiI2NTNmYjljZjEwOWNkMDAxMGIwNGQwZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8uZ0fEXhmgz_zWVIxeNjsEEhktXMo_XuYT2rcbet_QY",
  },
};

fetch("https://api.themoviedb.org/3/genre/tv/list?language=es-ES", options)
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < res.genres.length; i++) {
      const genre = res.genres[i];
      genresList += `<a href="genre-detail.html?id=${genre.id}&genero=${genre.name}">${genre.name}</a>`;
    }
    genresListHtml.innerHTML = genresList;
  })
  .catch((err) => console.error(err));
