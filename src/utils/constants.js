const BASE_URL = 'https://api.nartova.nomoredomainsclub.ru';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const SHORTMOVIES_DURATION = 40;
const DEVICE_PARAMS = {
  desktop: {
    width: 1077,
    cards: {
      initial: 12,
      more: 3,
    },
  },
  tablet: {
    width: 1000,
    cards: {
      initial: 8,
      more: 2,
    },
  },
  mobile: {
    width: 707,
    cards: {
      initial: 5,
      more: 2,
    },
  },
};

export { BASE_URL, MOVIES_URL, SHORTMOVIES_DURATION, DEVICE_PARAMS };

