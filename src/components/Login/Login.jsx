import Form from '../Form/Form.jsx';
import useValidation from '../../hooks/useValidation.jsx';

export default function Login({ handleLogin }) {

  const { values, handleChange, errors, isValid } = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values);
  }

    return (
      <Form isValid={isValid} handleSubmit={handleSubmit} title={"Рады видеть!"} submit={"Войти"} text={"Ещё не зарегистрированы?"} link={"Регистрация"} path={"/signup"}>
        <div className="form__list-item">
          <p className="form__item-name">E-mail</p>
          <input name="email" type="email" value={values.email || ''} onChange={handleChange} className={`form__area ${errors.email && 'form__area_error'}`} placeholder="nartova@gmail.com" required />
          <p className="form__error">{errors.email || ''}</p>
        </div>
        <div className="form__list-item">
          <p className="form__item-name">Пароль</p>
          <input name="password" type="password" value={values.password || ''} onChange={handleChange} className={`form__area ${errors.password && 'form__area_error'}`} placeholder="•••••••••••••" required />
          <p className="form__error">{errors.password || ''}</p>
        </div>
      </Form>
    )
}