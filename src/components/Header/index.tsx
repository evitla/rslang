import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">RS Lang Logo</Link>
    <nav>
      <ul>
        <li>
          <Link to="book">Электронный учебник</Link>
        </li>
        <li>
          <Link to="games">Мини-игры</Link>
        </li>
        <li>
          <Link to="user">User Icon</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
