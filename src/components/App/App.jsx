import './App.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const history = useHistory();

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }
  function goBack() {
    history.goBack();
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={false} />
          <Main />
          <Footer/>
        </Route>
        <Route exact path="/movies">
          <Header loggedIn={true} 
          onClickBurger={onClickBurger}
          isBurgerOpened={isBurgerOpened}
          />
          <Movies isSaved={false}/>
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header loggedIn={true} 
          onClickBurger={onClickBurger}
          isBurgerOpened={isBurgerOpened}/>
          <SavedMovies isSaved={true}/>
          <Footer />
        </Route>
        <Route exact path="/profile">
          <Header loggedIn={true} 
          onClickBurger={onClickBurger}
          isBurgerOpened={isBurgerOpened}/>
          <Profile/>
        </Route>
        <Route exact path="/signup">
          <Register/>
        </Route>
        <Route exact path="/signin">
          <Login/>
        </Route>
        <Route exact path="*">
          <PageNotFound goBack={goBack}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;