import React from 'react';
import { Link } from 'react-router-dom';

import { StyledHeader } from './style';
import { FlexWrapper } from '../../styles/wrapper';

const Header = () => (
  <StyledHeader>
    <FlexWrapper>
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
    </FlexWrapper>
  </StyledHeader>
);

export default Header;
