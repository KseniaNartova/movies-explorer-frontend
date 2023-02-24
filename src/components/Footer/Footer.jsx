import './Footer.css';
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title"> Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__navigation">
          <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
          <ul className="footer__links-list">
            <li>
              <Link to="https://practicum.yandex.ru" className="footer__link" target="_blank">Яндекс.Практикум</Link>
            </li>
            <li>
              <Link to="https://github.com/KseniaNartova" className="footer__link" target="_blank">Github</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}