import React from "react";
import { useLocation } from 'react-router-dom';
import "./MoviesCard.css";
import { getTimeFromMins } from '../../utils/utils.js';

export default function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {

    // сохранение фильма
    function handleLikeClick() {
      onLikeClick(movie);
    }
    // удаление фильма
    function handleDeleteClick() {
      onDeleteClick(movie);
    }

    const location = useLocation();

  return (
    <div className="movies-card">
        <a target="blank" href={movie.trailerLink}>
          <img
            className="movies-card__image"
            src={movie.thumbnail}
            alt={movie.nameRU}
          />
        </a>
        {location.pathname === '/movies' && (
            <button
              type="button"
              className={`movies-card__button movies-card__button_${
                saved ? 'delete' : 'save'
              }`}
              onClick={saved ? handleDeleteClick : handleLikeClick}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              type="button"
              className="movies-card__button movies-card__button_remove"
              onClick={handleDeleteClick}
            ></button>
          )}
      <div className="movies-card__info">
        <p className="movies-card__name">{movie.nameRU}</p>
        <p className="movies-card__duration">
        {getTimeFromMins(movie.duration)}
        </p>
      </div>
    </div>
  )
}