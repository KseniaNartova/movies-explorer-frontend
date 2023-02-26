
import './Promo.css';
import logo from '../../../images/text__COLOR_landing-logo.svg';

export default function Promo() {
  return (
<section className="promo">
    <div className="promo__container">
      <div className="promo__info">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209; разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__link" href="#about-project">Узнать больше</a>
      </div>
      <img src={logo} alt="логотип" className="promo__logo"/>
    </div>
</section>
);
}