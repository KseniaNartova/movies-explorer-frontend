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
  return movies.filter(movie => movie.duration < 40);
}

export { filterMovies, filterShortMovies, getTimeFromMins };