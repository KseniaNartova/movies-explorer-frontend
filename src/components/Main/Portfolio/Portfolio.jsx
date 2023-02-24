import './Portfolio.css';

export default function Portfolio() {

  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__projects-list">
          <li className="portfolio__projects-item">
            <a href="https://github.com/KseniaNartova/how-to-learn" target="blank" className="portfolio__link">
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__projects-item">
            <a href="https://github.com/KseniaNartova/russian-travel" target="blank" className="portfolio__link">
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__projects-item">
            <a href="https://github.com/KseniaNartova/react-mesto-api-full" target="blank" className="portfolio__link">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
