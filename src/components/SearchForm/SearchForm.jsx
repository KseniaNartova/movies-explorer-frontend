import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__block">
          <input
            className="search-form__input"
            type="text"
            required
            placeholder="Фильм"
            name="search"
          />
          <button type="submit" className="search-form__button">
            Поиск
          </button>
        </div>
        <div className="search-form__short-film">
              <label className="search-form__filter">
                <input
                  className="search-form__filter-checkbox"
                  type="checkbox"
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

