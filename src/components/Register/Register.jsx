import Form from '../Form/Form.jsx';

export default function Register() {
    return (
      <Form title={"Добро пожаловать!"} submit={"Зарегистрироваться"} text={"Уже зарегистрированы?"} link={"Войти"} path={"/signin"}>
        <div className="form__list-item">
          <p className="form__item-name">Имя</p>
          <input type="text" className="form__area" placeholder="Ксения" required />
          <p className="form__error">Что-то пошло не так...</p>
        </div>

        <div className="form__list-item">
          <p className="form__item-name">E-mail</p>
          <input type="email" className="form__area" placeholder="nartova@gmail.com" required />
          <p className="form__error">Что-то пошло не так...</p>
        </div>

        <div className="form__list-item">
          <p className="form__item-name">Пароль</p>
          <input type="password" className="form__area form__area_type_password" placeholder="•••••••••••••" required />
          <p className="form__error form__error-display">Что-то пошло не так...</p>
        </div>
      </Form>
    )
}