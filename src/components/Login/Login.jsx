import Form from '../Form/Form.jsx';

export default function Login() {
    return (
      <Form title={"Рады видеть!"} submit={"Войти"} text={"Ещё не зарегистрированы?"} link={"Регистрация"} path={"/signup"}>
        <div className="form__list-item">
          <p className="form__item-name">E-mail</p>
          <input type="email" className="form__area" placeholder="nartova@gmail.com" required />
          <p className="form__error">Что-то пошло не так...</p>
        </div>
        <div className="form__list-item">
          <p className="form__item-name">Пароль</p>
          <input type="password" className="form__area form__area_type_password form__area_type_login" placeholder="•••••••••••••" required />
          <p className="form__error">Что-то пошло не так...</p>
        </div>
      </Form>
    )
}