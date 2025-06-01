let resultsItemsHtml = document.querySelector(".results-items");
let resultsItems = "";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsIm5iZiI6MTY5ODY3NTE1MS4xNDMwMDAxLCJzdWIiOiI2NTNmYjljZjEwOWNkMDAxMGIwNGQwZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8uZ0fEXhmgz_zWVIxeNjsEEhktXMo_XuYT2rcbet_QY",
  },
};

fetch(
  "https://api.themoviedb.org/3/search/movie?query=buscar&include_adult=false&language=es-ES-US&page=1",
  options
)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
