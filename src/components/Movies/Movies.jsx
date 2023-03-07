import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useContext, useEffect } from "react";
import { filterMovies, filterShortMovies, dataMovies } from "../../utils/utils.js";
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
      'movies',
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
    localStorage.setItem('shortMovies', !shortMovies);
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem('movieSearch', inputValue);
    localStorage.setItem('shortMovies', shortMovies);

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
    if (localStorage.getItem('shortMovies') === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(
        localStorage.getItem('movies')
      );
      setGetMoviesSearch(movies);
      if (
        localStorage.getItem('shortMovies') === "true"
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
