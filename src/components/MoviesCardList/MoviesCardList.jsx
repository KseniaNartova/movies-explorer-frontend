import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({cards}) {
  return (
    <section className="movies-list">
      <div className="movies-list__list">
        {cards.map((card) => {
         return <MoviesCard key={card.id} card={card}/>;
        })}
      </div>
    </section>
  )
};