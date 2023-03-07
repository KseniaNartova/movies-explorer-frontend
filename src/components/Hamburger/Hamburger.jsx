import './Hamburger.css';

export default function Hamburger({ isBurgerOpened, onClickBurger }) {

  function handleOnClickBurger() {
    onClickBurger();
  };

  return (
    <button
      type="button"
      className={`hamburger-button hamburger-button__${isBurgerOpened ? 'on' : 'off'}`}
      onClick={handleOnClickBurger}
    >
      <span></span>
    </button>
  );
}