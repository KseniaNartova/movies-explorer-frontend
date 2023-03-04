import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useContext, useEffect } from "react";
import { filterMovies, filterShortMovies } from "../../utils/utils.js";
import moviesApi from "../../utils/MoviesApi.js";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";

export default function Movies({
  setIsPreloader,
  setIsPopupError,
  savedMovies,
  onLikeClick,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [getMoviesSearch, setGetMoviesSearch] = useState([]);
  const [shortMovies, setShortMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isApiMovies, setIsApiMovies] = useState([]);
  const [movieNotFound, setMovieNotFound] = useState(false);

  function dataMovies(movies) {
    movies.forEach(movie => {
        movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
        movie.image = `https://api.nomoreparties.co${movie.image.url}`
    });
    return movies
  }

  function handleSetFilteredMovies(movies, movieQuery, shortMoviesCheckbox) {
    const movieList = filterMovies(movies, movieQuery, shortMoviesCheckbox);
    if (movieList.length === 0) {
      setIsPopupError({
        isOpen: true,
        success: false,
        err: "Ничего не найдено",
      });
      setMovieNotFound(true);
    } else {
      setMovieNotFound(false);
    }
    setGetMoviesSearch(movieList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(movieList) : movieList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(movieList)
    );
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(getMoviesSearch));
    } else {
      setFilteredMovies(getMoviesSearch);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

    if (isApiMovies.length === 0) {
      setIsPreloader(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setIsApiMovies(movies);
          handleSetFilteredMovies(
            dataMovies(movies),
            inputValue,
            shortMovies
          );
        })
        .catch(() =>
          setIsPopupError({
            isOpen: true,
            success: false,
            err: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
          })
        )
        .finally(() => setIsPreloader(false));
    } else {
      handleSetFilteredMovies(isApiMovies, inputValue, shortMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setGetMoviesSearch(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === "true"
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm 
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}/>
      {!movieNotFound && (
        <MoviesCardList
          moviesList={filteredMovies}
          savedMovies={savedMovies}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
}
