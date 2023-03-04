import './NavigationMobile.css';
import { Link, NavLink } from 'react-router-dom';
import icon from '../../images/icon__COLOR_icon-main.svg'


export default function NavigationMobile({ isBurgerOpened, activeLink }) {
  return (
    <>
      <div className={`navigation__container-mobile ${isBurgerOpened  ? 'navigation__container-mobile_type_open' : 'navigation__container-mobile_type_close'}`}>
        <nav className="navigation navigation__container_type_auth-mobile">
          <ul className="navigation__list_type_auth-mobile">
            <li>
              <NavLink exact to="/" className="navigation__type_auth-mobile" activeClassName={activeLink}>Главная</NavLink>
            </li>
            <li>
              <NavLink to="/movies" className="navigation__type_auth-mobile" activeClassName={activeLink}>Фильмы</NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies" className="navigation__type_auth-mobile" activeClassName={activeLink}>Сохранённые фильмы</NavLink>
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