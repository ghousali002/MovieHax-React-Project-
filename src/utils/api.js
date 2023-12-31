var axios = require("axios");

module.exports = {
  getPopularMovies: function (page, genre) {
    if (genre === null) {
      return axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=fcc099706b1d178f223fb5741f1b8c01&sort_by=popularity.desc&vote_count.gte=300&include_adult=false&page=" +
            page
        )
        .then(function (respond) {
          return respond;
        });
    } else {
      return axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=fcc099706b1d178f223fb5741f1b8c01&sort_by=vote_average.desc&vote_count.gte=300&include_adult=false&page=" +
            page +
            "&with_genres=" +
            genre
        )
        .then(function (respond) {
          return respond;
        });
    }
  },
  getMoviesOfYear: function (year, page) {
    return axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=fcc099706b1d178f223fb5741f1b8c01&primary_release_year=" +
          year +
          "&sort_by=vote_average.desc&vote_count.gte=300&page=" +
          page
      )
      .then(function (respond) {
        return respond;
      });
  },
  searchMovies: function (query) {
    return axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=fcc099706b1d178f223fb5741f1b8c01&query=${query}&language=de-DE&region=DE"
        )
      .then(function (response) {
        return response;
      });
  },
};
