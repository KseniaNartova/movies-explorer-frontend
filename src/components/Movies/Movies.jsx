import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { cards } from '../../utils/movies';

export default function Movies({isSaved}) {
  return (
    <main className="movies">
      <SearchForm/>
      <MoviesCardList cards={cards}/>
      {(!isSaved && (<button className="movies__more">Ещё</button>))}
    </main>
  )
}