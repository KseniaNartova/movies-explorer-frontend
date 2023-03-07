import './App.css';
import mainApi from '../../utils/MainApi.js';
import { auth } from '../../utils/Auth';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupError, setIsPopupError] = useState({isOpen: false, success: true, err: ''});

  const history = useHistory();

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }
  function goBack() {
    history.goBack();
  }
  function closeInfoTooltip() {
    setIsPopupError({ isOpen: false });
  }

  const handleCheckToken = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth
        .getUserInfo(jwt)
        .then((res) => {
          const { _id, name, email } = res;
          setLoggedIn(true);
          setCurrentUser({ _id, name, email });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsPreloader(false);
          setLoading(true);
        });
    } else {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

 const handleRegister = ({ name, email, password }) => {
  setIsPreloader(true);
  auth
    .register(name, email, password)
    .then(() => {
      handleLogin({ email, password });
    })
    .catch(() =>
      setIsPopupError({
        isOpen: true,
        success: false,
        err: "Пользователь уже существует",
      })
    )
    .finally(() => setIsPreloader(false));
};

  const handleLogin = ({ email, password }) => {
    setIsPreloader(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          handleCheckToken();
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch(() =>
        setIsPopupError({
          isOpen: true,
          success: false,
          err: "Неверный email или пароль",
        })
      )
      .finally(() => setIsPreloader(false));
  };

  function handleProfile({ name, email }) {
    setIsPreloader(true);
    mainApi
      .updateUser(name, email)
      .then(data => {
        setCurrentUser(data);
        setIsPopupError({
          isOpen: true,
          success: true,
          err: 'Ваши данные обновлены!',
        });
      })
      .catch(() =>
        setIsPopupError({
          isOpen: true,
          success: false,
          err: "Пользователь уже существует",
        })
      )
      .finally(() => setIsPreloader(false));
  }

  function handleSaveMovie(movie) {
    mainApi
      .addNewMovie(movie)
      .then(newMovie => setSavedMovies([newMovie, ...savedMovies]))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      setIsPreloader(true);
      auth
        .getUserInfo()
        .then(res => setCurrentUser(res))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsPreloader(false));
    }
  }, [loggedIn]);


    useEffect(() => {
      if (loggedIn && currentUser) {
        mainApi
          .getSavedMovies()
          .then(data => {
            const userMovie = data.filter(movie => movie.owner === currentUser._id);
            setSavedMovies(userMovie);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }, [ loggedIn, currentUser ]);

    function handleSignOut() {
      const nameKeys = [
        'jwt',
        'movies',
        'movieSearch',
        'shortSavedMovies',
        'shortMovies',
      ];
      nameKeys.forEach((key) => localStorage.removeItem(key));
      setCurrentUser({});
      setLoggedIn(false);
      history.push('/');
    }

  return (
    <div className='app'>
  {!loading ? (
    <Preloader isOpen={isPreloader} />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <Route exact path='/movies'>
          <Header
            loggedIn={loggedIn}
            onClickBurger={onClickBurger}
            isBurgerOpened={isBurgerOpened}
          />
      </Route>
      <Route exact path='/saved-movies'>
          <Header
            loggedIn={loggedIn}
            onClickBurger={onClickBurger}
            isBurgerOpened={isBurgerOpened}
          />
      </Route>
      <Route exact path='/profile'>
          <Header
            loggedIn={loggedIn}
            onClickBurger={onClickBurger}
            isBurgerOpened={isBurgerOpened}
          />
      </Route>
      <Switch>
        <Route exact path='/'>
            <Header
              loggedIn={loggedIn}
              onClickBurger={onClickBurger}
              isBurgerOpened={isBurgerOpened}
            />
            <Main />
            <Footer />
        </Route>
        <Route exact path='/signup'>
            {!loggedIn ? (
              <Register handleRegister={handleRegister} />
            ) : (
              <Redirect to='/' />
            )}
        </Route>
        <Route exact path='/signin'>
            {!loggedIn ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <Redirect to='/' />
            )}
        </Route>
        <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            setIsPreloader={setIsPreloader}
            setIsPopupError={setIsPopupError}
            savedMovies={savedMovies}
            onLikeClick={handleSaveMovie}
            onDeleteClick={handleDeleteMovie}
        />
        <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            onDeleteClick={handleDeleteMovie}
            setIsPopupError={setIsPopupError}
        />
        <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            handleProfile={handleProfile}
            handleSignOut={handleSignOut}
        />
        <Route exact path='*'>
            <PageNotFound goBack={goBack} />
        </Route>
      </Switch>
      <Route exact path='/movies'>
          <Footer />
      </Route>
      <Route exact path='/saved-movies'>
          <Footer />
      </Route>
      <Preloader isOpen={isPreloader} />
      <InfoTooltip
          params={isPopupError}
          onClose={closeInfoTooltip}
      />
    </CurrentUserContext.Provider>
  )}
</div>
  );
}

export default App;
