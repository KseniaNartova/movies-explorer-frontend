import './NavigationMobile.css';
import { Link } from 'react-router-dom';
import icon from '../../images/icon__COLOR_icon-main.svg'


export default function NavigationMobile({ isBurgerOpened }) {
  return (
    <>
      <div className={`navigation__container-mobile ${isBurgerOpened  ? 'navigation__container-mobile_type_open' : 'navigation__container-mobile_type_close'}`}>
        <nav className="navigation navigation__container_type_auth-mobile">
          <ul className="navigation__list_type_auth-mobile">
            <li>
              <Link to="/" className="navigation__type_auth-mobile">Главная</Link>
            </li>
            <li>
              <Link to="/movies" className="navigation__type_auth-mobile navigation__type_auth-mobile_active">Фильмы</Link>
            </li>
            <li>
              <Link to="/saved-movies" className="navigation__type_auth-mobile">Сохранённые фильмы</Link>
            </li>
          </ul>
          <Link to="/profile">
            <button className="navigation__button-account_type_mobile">
              <img src={icon} alt="логотип" className='navigation__button-account__logo'/>
              <span>Аккаунт</span>
            </button>
          </Link>
        </nav>
      </div>
    </>
  )
}