import "./SavedMovies.css";
import { useState, useContext, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filterMovies, filterShortMovies } from "../../utils/utils.js";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";

export default function SavedMovies({
  onDeleteClick,
  savedMovies,
  setIsPopupError,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [movieNotFound, setMovieNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMovies, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setMovieNotFound(true);
      setIsPopupError({
        isOpen: true,
        success: false,
        err: "Ничего не найдено",
      });
    } else {
      setMovieNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0
        ? setMovieNotFound(true)
        : setMovieNotFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setMovieNotFound(true) : setMovieNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === "true"
    ) {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMovies));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMovies);
    }
  }, [savedMovies, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setMovieNotFound(false) : setMovieNotFound(true);
  }, [savedMovies]);

  return (
    <main className="movies__saved">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!movieNotFound && (
        <MoviesCardList
          moviesList={showedMovies}
          savedMovies={savedMovies}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
}
