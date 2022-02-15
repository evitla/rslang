import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../AuthForm';
import { StyledHeader } from './style';
import { FlexWrapper } from '../../styles/wrapper';
import { START_GROUP, START_PAGE } from '../../constants';
import { useSelector } from 'react-redux';
import { TStore } from '../../store';
import useOpenAuthForm from '../../hooks/useOpenAuthForm';

const Header = () => {
  const { user } = useSelector((state: TStore) => state.userReducer);
  const { isAuthFormOpen, setIsAuthFormOpen } = useOpenAuthForm();

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
            {user !== null ? (
              <li>
                <Link to="user">User Icon</Link>
              </li>
            ) : (
              <li>
                <button onClick={() => setIsAuthFormOpen(!isAuthFormOpen)}>
                  Войти
                </button>
              </li>
            )}
          </ul>
        </nav>
      </FlexWrapper>
      {isAuthFormOpen && <AuthForm setIsOpen={setIsAuthFormOpen} />}
    </StyledHeader>
  );
};

export default Header;
