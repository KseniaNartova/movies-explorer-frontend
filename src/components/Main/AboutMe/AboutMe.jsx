import './AboutMe.css';
import self from '../../../images/self.jpg'


export default function AboutMe() {
  return (
    <section className='about-me'>
      <div className='about-me__container'>
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__info'>
          <div className='about-me__info_type_text'>
            <h3 className='about-me__name'>Ксения</h3>
            <h4 className='about-me__direction'>Фронтенд-разработчик, 27 лет</h4>
            <p className='about-me__story'>Родилась и живу в Саратове. Училась в СГТУ на инженера стоительно-дорожных машин. До недавнего времени работала технологом на мебельной фабрике. Хочу связать свою жизнь с веб-разработкой.</p>
            <a href='https://github.com/KseniaNartova' className='about-me__gitlink' target='blank'>Github</a>
          </div>
          <img src={self} alt='автор сайта' className='about-me__info_type_img'/>
        </div>
      </div>
    </section>
  )
}