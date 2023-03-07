import './Navigation.css';
import Hamburger from '../Hamburger/Hamburger.jsx';
import NavigationMobile from '../NavigationMobile/NavigationMobile.jsx';
import { Link, NavLink } from 'react-router-dom';
import icon from '../../images/icon__COLOR_icon-main.svg'
import useResize from '../../hooks/useResize';

export default function Navigation({ loggedIn, isBurgerOpened, onClickBurger }) {
  const { width } = useResize();
  const activeLink = 'navigation__link_active'

  return (
    <>
    {!loggedIn ? (
        <nav className="navigation">
          <ul className="navigation__info">
            <li>
              <Link to='/signup' className='navigation__link navigation__link_infopage'>
                Регистрация
              </Link>
            </li>
            <li>
              <Link to='/signin' className='navigation__link navigation__link_infopage navigation__link_signin'>
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (width > 801 ? (
          <nav className="navigation navigation__type_auth-desktop">
          <ul className="navigation__info__auth">
            <li>
              <NavLink to="/movies" className="navigation__link navigation__link-auth navigation__link-auth_active" activeClassName={activeLink}>Фильмы</NavLink>
              </li>
            <li>
              <NavLink to="/saved-movies" className="navigation__link navigation__link-auth" activeClassName={activeLink}>Сохранённые фильмы</NavLink>
            </li>
          </ul>
          <Link to="/profile" className="navigation__link navigation__link-auth">
            <button className="navigation__button-account">
              <img src={icon} alt="логотип" className='navigation__button-account__logo'/>
              <span>Аккаунт</span>
            </button>
          </Link>
        </nav>
        ) : (
          <nav className={`navigation navigation__mobile_type_${isBurgerOpened ? 'opened' : 'closed'}`} >
          <Hamburger isBurgerOpened={isBurgerOpened} onClickBurger={onClickBurger} />
          <NavigationMobile isBurgerOpened={isBurgerOpened} activeLink={activeLink}/>
        </nav>
        )
      )
    }
    </>
  );
}