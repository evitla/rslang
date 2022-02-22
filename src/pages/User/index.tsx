import React from 'react';
import { useSelector } from 'react-redux';
import Statistic from './Statistic';
import { ErrorPage } from '..';
import useLogout from '../../hooks/useLogout';
import { TStore } from '../../store';
import { StyledButton } from '../../styles/components';
import { StyledUserPage } from './style';

const User = () => {
  const { user } = useSelector((state: TStore) => state.userReducer);

  if (user === null) {
    return <ErrorPage />;
  }

  const { handleLogout } = useLogout();

  return (
    <StyledUserPage>
      <Statistic />
      <StyledButton className="gradient-btn" onClick={handleLogout}>
        Выйти из аккаунта
      </StyledButton>
    </StyledUserPage>
  );
};

export default User;
