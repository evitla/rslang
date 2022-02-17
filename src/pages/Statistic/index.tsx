import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStats } from '../../slices/stats';
import { TStore } from '../../store';
import { getUserStats } from '../../utils';
import GameSection from './GameSection';
import TotalSection from './TotalSection';

export default function Statistic() {
  const { userId, token } = useSelector(
    (state: TStore) => state.userReducer!.user!
  );
  const statsState = useSelector((state: TStore) => state.statsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const res = await getUserStats(userId, token);
      dispatch(loadStats(res));
    })();
  }, []);

  const { games } = statsState.optional.shortStats;

  return (
    <div>
      {games && <GameSection gameStats={games} />}
      <TotalSection learnedWords={statsState.learnedWords} />
    </div>
  );
}
