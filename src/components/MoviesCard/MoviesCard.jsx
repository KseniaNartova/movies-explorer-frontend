import React from "react";

import "./MoviesCard.css";

export default function MoviesCard({card}) {
  return (
    <div className="movies-card">
        <div
          className="movies-card__image"
          style={{
            backgroundImage: `url(${card.thumbnail})`}}
        >
            {/* <button
              className="movies-card__button movies-card__button_delete"
              type="button"
            /> */}
            <button
              className="movies-card__button movies-card__button_save"
              type="button"
            >
              Сохранить
            </button>
        </div>
      <div className="movies-card__info">
        <p className="movies-card__name">{card.nameRU}</p>
        <p className="movies-card__duration">
          { card.duration }
        </p>
      </div>
    </div>
  )
}