import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GameWrapper } from './style';
import audiocallSVG from '../../assets/images/audiocall.svg';
import sprintSVG from '../../assets/images/sprint.svg';
import { useLocation } from 'react-router';

const Games = () => {
  const { pathname } = useLocation();
  return (
    <>
      {!pathname.includes('audiocall') && !pathname.includes('sprint') && (
        <GameWrapper>
          <h2>Games</h2>

          <div className="card-wrapper">
            <div className="card">
              <figure className="card__thumb">
                <img className="card__image" src={audiocallSVG} alt="" />
                <figcaption className="card__caption">
                  <h2 className="card__title">Аудиовызов</h2>
                  <p className="card__snippet">
                    Тренировка Аудиовызов развивает словарный запас. Вы должны
                    выбрать перевод услышанного слова.
                  </p>
                  <Link to="audiocall" className="card__button">
                    Играть
                  </Link>
                </figcaption>
              </figure>
            </div>
            <div className="card">
              <figure className="card__thumb">
                <img className="card__image" src={sprintSVG} alt="" />
                <figcaption className="card__caption">
                  <h2 className="card__title">Спринт</h2>
                  <p className="card__snippet">
                    В мини-игре "Спринт" от вас требуется выбрать - верен ли
                    перевод слова на русский язык.
                  </p>
                  <Link to="sprint" className="card__button">
                    Играть
                  </Link>
                </figcaption>
              </figure>
            </div>
          </div>
        </GameWrapper>
      )}
      <Outlet />
    </>
  );
};

export default Games;
