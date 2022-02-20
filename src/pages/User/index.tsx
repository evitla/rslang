import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { ErrorPage } from '..';
import useLogout from '../../hooks/useLogout';
import { TStore } from '../../store';

const User = () => {
  const { user } = useSelector((state: TStore) => state.userReducer);

  if (user === null) {
    return <ErrorPage />;
  }

  const { handleLogout } = useLogout();

  return (
    <div>
      <button onClick={handleLogout}>Выйти из аккаунта</button>
      {
        // TODO: 3 components
      }
      <ol>
        <li>Прогресс изучения слов</li>
        <li>Изученные слова</li>
        <li>Статистика</li>
      </ol>
      <Outlet />
    </div>
  );
};

export default User;
