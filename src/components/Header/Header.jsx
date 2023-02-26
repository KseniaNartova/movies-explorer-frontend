import logo from '../../images/logo.svg'
import React from "react";
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';

export default function Header({ loggedIn, onClickBurger, isBurgerOpened }) {

const location = useLocation();
    return (
        <header className={`header header_theme_${location.pathname === '/' ? 'light' : 'dark'}`}>
            <div className="header__container">
              <Link to='/' className='header__link header__link_type_desktop'>
              <img src={logo} alt="логотип" className="header__logo"/>
              </Link>
              <Navigation 
              loggedIn={loggedIn}           
              onClickBurger={onClickBurger}
              isBurgerOpened={isBurgerOpened}
        />
            </div>
        </header>
    )
}