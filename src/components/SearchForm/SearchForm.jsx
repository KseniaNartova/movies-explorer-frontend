import './SearchForm.css';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import useValidation from '../../hooks/useValidation.jsx';

export default function SearchForm({ handleSearchSubmit, handleShortFilms, shortMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, isValid, setIsValid } = useValidation();
  const location = useLocation();

  const [error, setError] = useState('')

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setError('Нужно ввести ключевое слово.');
  };

  useEffect(() => {
    setError('')
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const searchValue = localStorage.getItem('movieSearch');
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  return (
    <section className="search-form">
      <form className="search__form search-form__form" name='search' onSubmit={handleSubmit} noValidate>
        <div className="search-form__block">
          <input
            className="search-form__input"
            type="text"
            required
            placeholder="Фильм"
            name="search"
            value={values.search || ''}
            onChange={handleChange}
          />
          <p className="search-form__error">{error}</p>
          <button type="submit" className="search-form__button">
            Поиск
          </button>
        </div>
        <div className="search-form__short-film">
              <label className="search-form__filter">
                <input
                  className="search-form__filter-checkbox"
                  type="checkbox"
                  onChange={handleShortFilms}
                  checked={shortMovies ? true : false}
                />
               <span className="search-form__filter-tumbler"></span>
               <span className="search-form__filter-text">Короткометражки</span>
              </label>
        </div>
      </form>
      <div className="search-form__line" />
    </section>
  );
}

