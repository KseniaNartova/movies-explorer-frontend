import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { savedCards } from '../../utils/savedCards';

// import Preloader from "../Preloader/Preloader";

export default function SavedMovies({isSaved}) {
  return (
    <main className="movies">
      <SearchForm/>
      <MoviesCardList cards={savedCards}/>
      {(!isSaved && (<button className="movies__more">Ещё</button>))}
    </main>
  )
}