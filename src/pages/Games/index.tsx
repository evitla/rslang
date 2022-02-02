import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Games = () => (
  <div>
    <h2>Games Page</h2>
    <div>
      <Link to="audiocall">Аудиовызов</Link>
    </div>
    <div>
      <Link to="sprint">Спринт</Link>
    </div>
    <Outlet />
  </div>
);

export default Games;
