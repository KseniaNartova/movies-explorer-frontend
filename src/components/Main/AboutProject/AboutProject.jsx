import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project'>
      <div className='about-project__container'>
        <h2 className='about-project__title'>О проекте</h2>
        <div className='about-project__time'>
          <div className='about-project__description'>
            <h3 className='about-project__description-title'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className='about-project__description'>
            <h3 className='about-project__description-title'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__description-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__graph">
          <div className="about-project__back">
            <span className="about-project__back-time">1 неделя</span>
            <span className="about-project__graph-subtitle">Back-end</span>
          </div>
          <div className="about-project__front" id='about-project'>
            <span className="about-project__front-time">4 недели</span>
            <span className="about-project__graph-subtitle">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  )
}