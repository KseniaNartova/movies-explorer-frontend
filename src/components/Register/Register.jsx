import Form from '../Form/Form.jsx';
import useValidation from '../../hooks/useValidation.jsx';

export default function Register({ handleRegister }) {

  const { values, handleChange, errors, isValid } = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values);
  }

    return (
      <Form isRegister={true} isValid={isValid} handleSubmit={handleSubmit} title={"Добро пожаловать!"} submit={"Зарегистрироваться"} text={"Уже зарегистрированы?"} link={"Войти"} path={"/signin"}>
        <div className="form__list-item">
          <p className="form__item-name">Имя</p>
          <input name="name" type="text" value={values.name || ''} onChange={handleChange} className={`form__area ${errors.text && 'form__area_error'}`} placeholder="Ксения" required />
          <p className="form__error">{errors.name || ''}</p>
        </div>

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