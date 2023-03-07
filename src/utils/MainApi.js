import { BASE_URL } from './constants.js';

class Api {
  #onResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({ message: "Ошибка на стороне сервера", res });
  }

  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  };

  // запрос на редактирование данных пользователя
  updateUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  // запрос фильмов
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  // сохранение фильма
  addNewMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  // удаление фильма из сохранённых
  deleteMovie(data) {
    return fetch(`${this._baseUrl}/movies/${data}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }
}

const mainApi = new Api({
  baseUrl: BASE_URL,
  headers: {},
});

export default mainApi;