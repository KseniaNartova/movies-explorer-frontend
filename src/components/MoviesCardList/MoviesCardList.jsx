import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEVICE_PARAMS } from '../../utils/constants.js';
import { getSavedMovieCard } from '../../utils/utils.js';

export default function MoviesCardList({ moviesList, savedMovies, onLikeClick, onDeleteClick }) {
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth)
  const { desktop, tablet, mobile } = DEVICE_PARAMS;
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState(desktop.cards);

  function checkWindowWidth() {
    setWidth(window.innerWidth)
  }

  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const add = moviesList.length - start;
    const newCards = moviesList.slice(start, end);

    if (add > 0) {
      setShowMovieList([...showMovieList, ...newCards]);
      setCardsShowDetails({ ...cardsShowDetails, initial: end });
    }
  }

  useEffect(() => {
    window.addEventListener('resize', checkWindowWidth)
  }, [width])

   useEffect(() => {
      if (width >= desktop.width) {
        setCardsShowDetails(desktop.cards);
      } else if (width > mobile.width && width < desktop.width) {
        setCardsShowDetails(tablet.cards);
      } else if (width <= mobile.width){
        setCardsShowDetails(mobile.cards);
      }
  }, [width, location.pathname, desktop.width, desktop.cards, mobile.width, mobile.cards, tablet.cards]);

   useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShowDetails.initial);
      setShowMovieList(res);
    }
  }, [moviesList, cardsShowDetails.initial]);

  return (
    <section className="movies-list">
      <div className="movies-list__list">
        {showMovieList.map((movie) => {
         return <MoviesCard key={movie.id || movie._id} saved={getSavedMovieCard(savedMovies, movie)}  onLikeClick={onLikeClick} onDeleteClick={onDeleteClick} movie={movie} />;
        })}
      </div>
      {location.pathname === '/movies' && showMovieList.length >= 5 && showMovieList.length < moviesList.length && (
        <button className="movies__more" onClick={handleClickMoreMovies}>Ещё</button>
      )}
    </section>
  )
};