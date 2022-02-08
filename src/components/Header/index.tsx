import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../AuthForm';
import { StyledHeader } from './style';
import { FlexWrapper } from '../../styles/wrapper';
import { START_GROUP, START_PAGE } from '../../constants';

const Header = () => {
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);

  return (
    <StyledHeader>
      <FlexWrapper>
        <Link to="/">RS Lang Logo</Link>
        <nav>
          <ul>
            <li>
              <Link to={`book/${START_GROUP}/${START_PAGE}`}>
                Электронный учебник
              </Link>
            </li>
            <li>
              <Link to="games">Мини-игры</Link>
            </li>
            <li>
              <Link to="user">User Icon</Link>
            </li>
            <li>
              <button onClick={() => setIsAuthFormOpen(!isAuthFormOpen)}>
                Войти
              </button>
            </li>
          </ul>
        </nav>
      </FlexWrapper>
      {isAuthFormOpen && <AuthForm setIsOpen={setIsAuthFormOpen} />}
    </StyledHeader>
  );
};

export default Header;
