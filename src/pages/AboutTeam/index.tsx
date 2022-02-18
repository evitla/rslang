import React from 'react';
import { AboutTeamWrapper } from './style';
import githubSVG from '../../assets/images/github.svg';

const AboutTeam = () => {
  return (
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
          <p>
            Создал прогресс изучения слов, игру "Sprint", статистику, изученные
            слова, участвовал в разработке структуры приложения
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
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
            facilis explicabo incidunt aut dolore expedita eius, repellendus
            voluptatum qui! Expedita animi exercitationem nisi assumenda earum
            fuga asperiores vero, veritatis in.
          </p>
        </div>
      </div>
    </AboutTeamWrapper>
  );
};

export default AboutTeam;
