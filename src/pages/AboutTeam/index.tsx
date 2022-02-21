import React from 'react';
import { AboutTeamWrapper } from './style';
import githubSVG from '../../assets/images/github.svg';

const AboutTeam = () => {
  return (
    <>
      <AboutTeamWrapper>
        <div className="card-wrapper wrapper-evitla">
          <div className="card card-evitla">
            <div className="border">
              <a href="https://github.com/evitla" target="_blank">
                <img className="github-svg" src={githubSVG} alt="" />
              </a>
            </div>
          </div>
          <div className="description">
            <h2>evitla</h2>
            <h5>Team leader</h5>
            <p>
              Написал общую структуру приложения, разработал дизайн приложения,
              создал карточки слов, форму авторизации, электронный учебник,
              написал стили
            </p>
          </div>
        </div>
        <div className="card-wrapper wrapper-excluz1v">
          <div className="card card-excluz1v">
            <div className="border">
              <a href="https://github.com/excluz1v" target="_blank">
                <img className="github-svg" src={githubSVG} alt="" />
              </a>
            </div>
          </div>
          <div className="description">
            <h2>excluz1v</h2>
            <h5>Developer</h5>
            <p>
              Создал прогресс изучения слов, игру "Sprint", статистику,
              изученные слова, участвовал в разработке структуры приложения
            </p>
          </div>
        </div>
        <div className="card-wrapper wrapper-hxnxikazuchi">
          <div className="card card-hxnxikazuchi">
            <div className="border">
              <a href="https://github.com/hxnxikazuchi" target="_blank">
                <img className="github-svg" src={githubSVG} alt="" />
              </a>
            </div>
          </div>
          <div className="description">
            <h2>hxnxikazuchi</h2>
            <h5>Developer</h5>
            <p>
              Создал игру "Audiocall", таблицу результата игр, стили игр,
              страницу "О команде", описание возможностей и преимуществ
              приложения
            </p>
          </div>
        </div>
      </AboutTeamWrapper>
      <Advantages>
        <img className="bgc-image" src={bgSVG} alt="" />
        <h2>Особенности</h2>
        <div className="advantages-container">
          <div className="card">
            <h3>Изучай</h3>
            <p>
              В учебнике собраны 3600 самых используемых в повседневной жизни
              слов, есть его определение и пример как на русском так и на
              английском!
            </p>
          </div>
          <div className="card">
            <h3>Повторяй</h3>
            <p>
              Все слова которые ты изучил попадают в твой личный словарь. Ты
              можешь отметить сложные для тебя слова, чтобы знать, на что чаще
              обращать внимание!
            </p>
          </div>
          <div className="card">
            <h3>Следи за прогрессом</h3>
            <p>
              В личном кабинете ты можешь следить за своим прогрессом: сколько
              слов ты уже выучил всего и за каждый день.
            </p>
          </div>
        </div>
      </Advantages>
    </>
  );
};

export default AboutTeam;
