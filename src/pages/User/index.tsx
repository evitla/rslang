import React from 'react';
import { Outlet } from 'react-router';
import useLogout from '../../hooks/useLogout';

const User = () => {
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
