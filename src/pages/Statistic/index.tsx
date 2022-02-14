import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { USERS_URL } from '../../constants';
import { TStore } from '../../store';
import { getUserStats } from '../../utils';
import GameSection from './GameSection';
import TotalSection from './TotalSection';

export default function Statistic() {
  const userId = useSelector(
    (state: TStore) => state?.userReducer?.user?.userId
  );
  useEffect(() => {
    const stats = getUserStats(USERS_URL, userId);
  }, []);

  return (
    <div>
      <GameSection />
      <TotalSection />
    </div>
  );
}
