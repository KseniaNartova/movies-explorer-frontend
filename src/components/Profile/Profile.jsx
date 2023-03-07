import './Profile.css';
import React from 'react';
import { useEffect, useContext } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import useValidation from '../../hooks/useValidation.jsx';


export default function Profile({ handleProfile, handleSignOut }) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, valueForm, errors, isValid } = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleProfile(values);
  }

  useEffect(() => {
    if (currentUser) {
      valueForm(currentUser);
    }
  }, [currentUser, valueForm]);

  const requirementValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <section className="profile">
      <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>
        <h2 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h2>
        <div className="profile__input">
          <div className="profile__area">
            <p className="profile__text">Имя</p>
            <input name="name" value={values.name || ''} onChange={handleChange} type="text" className={`profile__value ${errors.name && 'profile__value_error'}`} required  minLength="2" maxLength="30" pattern="^[A-Za-zА-Яа-яЁё /s -]+$"/>
            <p className="profile__error_name">{errors.name || ''}</p>
          </div>
          <div className="profile__area">
            <p className="profile__text profile__text_email">E-mail</p>
            <input name="email" type="email" className={`profile__value ${errors.email && 'profile__value_error'}`} onChange={handleChange} value={values.email || ''} required />
            <p className="profile__error">{errors.email || ''}</p>
          </div>
        </div>
        <button
            type="submit"
            className={`profile__button ${requirementValidity ? 'profile__button_disabled' : ''}`}
            disabled={requirementValidity ? true : false}
          >
            Редактировать
          </button>
          <button type="submit" className="profile__button profile__button_type_sing-out" onClick={handleSignOut}>
            Выйти из аккаунта
          </button>  
      </form>
    </section>
  );
}