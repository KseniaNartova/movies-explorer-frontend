import { SHORTMOVIES_DURATION } from './constants.js';

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  if (hours ===0) {
    return minutes + 'м'
  }
return hours + 'ч ' + minutes + 'м';
}

function filterMovies(movies, movieQuery, shortMoviesCheckbox) {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = movieQuery.toLowerCase().trim();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });

  if (shortMoviesCheckbox) {
    return filterShortMovies(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}

function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < SHORTMOVIES_DURATION);
}

function dataMovies(movies) {
  movies.forEach(movie => {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
      movie.image = `https://api.nomoreparties.co${movie.image.url}`
  });
  return movies
}

function getSavedMovieCard(arr, movie) {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

export { filterMovies, filterShortMovies, getTimeFromMins, dataMovies, getSavedMovieCard };