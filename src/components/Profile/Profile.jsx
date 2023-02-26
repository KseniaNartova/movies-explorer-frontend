import './Profile.css';
import React from 'react';
import {Link} from 'react-router-dom';

export default function Profile() {

  return (
    <section className="profile">
      <form className="profile__form">
        <h2 className="profile__title">Привет, Ксения!</h2>
        <div className="profile__input">
          <p className="profile__text">Имя</p>
          <div className="profile__area">
            <input className="profile__value" placeholder="Ксения" required />
          </div>
          <p className="profile__text">E-mail</p>
          <div className="profile__area">
            <input className="profile__value" placeholder="nartova@gmail.com" required />
          </div>
        </div>
        <Link to="/profile" className="profile__button">Редактировать</Link>
        <Link to="/" className="profile__button profile__button_type_sing-out">Выйти из аккаунта</Link>
      </form>
    </section>
  );
}