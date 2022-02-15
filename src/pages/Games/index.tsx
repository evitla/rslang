import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GameWrapper } from './style';
import audiocallSVG from '../../assets/images/audiocall.svg';

const Games = () => (
  <GameWrapper>
    <h2>Games</h2>
    <div className="card-wrapper">
      <div className="card">
        <figure className="card__thumb">
          <img src={audiocallSVG} alt="" />
          <figcaption className="card__caption">
            <h2 className="card__title">Аудиовызов</h2>
            <p className="card__snippet">
              Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать
              перевод услышанного слова.
            </p>
            <Link to="audiocall" className="card__button">
              Играть
            </Link>
          </figcaption>
        </figure>
      </div>
      <div className="card">
        <figure className="card__thumb">
          <img src={audiocallSVG} alt="" />
          <figcaption className="card__caption">
            <h2 className="card__title">Аудиовызов</h2>
            <p className="card__snippet">
              Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать
              перевод услышанного слова.
            </p>
            <Link to="sprint">Спринт</Link>
          </figcaption>
        </figure>
      </div>
    </div>
    <Outlet />
  </GameWrapper>
);

export default Games;
