import './Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'

export default function Form({ title, children, submit, text, path, link, handleSubmit, isValid, isRegister}) {
  return(
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link-logo">
          <img className="form__logo" src={logo} alt="Логотип"/>
        </Link>
        <h3 className="form__title">{title}</h3>
        <form className="form__inputs" onSubmit={handleSubmit}>
          <div className={`form__input-list ${isRegister && 'form__input-list_register'}`}
> 
            {children} 
          </div>
          <button type="submit" 
          className={`form__button ${!isValid && 'form__button_disabled'}`}
          disabled={!isValid}
          >
            {submit}
          </button>
        </form>
        <p className="form__text">{text}
          <Link to={path} className="form__link">
            {link}
          </Link>
        </p>
      </div>
    </section>
  )
}
