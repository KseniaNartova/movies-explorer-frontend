import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({ moviesList, savedMovies, onLikeClick, onDeleteClick }) {
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth)
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({ initial: 12, more: 3 });

  function checkWindowWidth() {
    setWidth(window.innerWidth)
  }

  function getSavedMovieCard(arr, movie) {
    return arr.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
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
      if (width >= 1280) {
        setCardsShowDetails({ initial: 12, more: 3 });
      } else if (width > 480 && width < 1280) {
        setCardsShowDetails({ initial: 8, more: 2 });
      } else if (width <= 480){
        setCardsShowDetails({ initial: 5, more: 2 });
      }
  }, [width, location.pathname]);

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