import { BASE_URL } from './constants.js';

export function onResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject({ message: "Ошибка на стороне сервера", res });
}

class Auth {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  };

  // Регистрация пользователя
  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      return onResponce(res);
    });
  };

  // Авторизация пользователя
  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return onResponce(res);
    });
  };

  // Получение информации о текущем пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return onResponce(res);
    });
  };
};

export const auth = new Auth({
  baseUrl: BASE_URL,
  headers: {},
});
