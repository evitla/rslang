import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ErrorPage } from '..';
import useLogout from '../../hooks/useLogout';
import { TStore } from '../../store';
import { StyledButton } from '../../styles/components';
import { defineColor } from '../../utils';
import { Chapter } from '../Book/style';
import { StyledUserPage } from './style';

const User = () => {
  const { pathname } = useLocation();

  const { user } = useSelector((state: TStore) => state.userReducer);

  if (user === null) {
    return <ErrorPage />;
  }

  const { handleLogout } = useLogout();

  return (
    <StyledUserPage>
      <div className="chapters">
        <div>
          <Link to="stats">
            <Chapter color="transparent" active={pathname.includes('stats')}>
              Статистика
            </Chapter>
          </Link>
          <Link to="learned-words">
            <Chapter
              color="transparent"
              active={pathname.includes('learned-words')}
            >
              Изученные слова
            </Chapter>
          </Link>
        </div>
        <StyledButton className="gradient-btn" onClick={handleLogout}>
          Выйти из аккаунта
        </StyledButton>
      </div>
      <Outlet />
    </StyledUserPage>
  );
};

export default User;
