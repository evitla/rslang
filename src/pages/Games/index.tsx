import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GameWrapper } from './style';

const Games = () => (
  <GameWrapper>
    <h2>Games</h2>
    <div className="game-wrapper">
      <Link to="audiocall">Аудиовызов</Link>
    </div>
    <div className="game-wrapper">
      <Link to="sprint">Спринт</Link>
    </div>
    <Outlet />
  </GameWrapper>
);

export default Games;
