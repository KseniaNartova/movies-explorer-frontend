import './PageNotFound.css';

export default function NotFound({ goBack }) {
  return (
    <section className="not-found">
      <h1 className="not-found__error">404</h1>
      <p className="not-found__error-name">Страница не найдена</p>
      <button className="not-found__button" onClick={goBack}>Назад</button>
    </section>
  );
}