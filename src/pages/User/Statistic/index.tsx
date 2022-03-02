import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStats } from '../../../slices/stats';
import { TStore } from '../../../store';
import { getUserStats } from '../../../utils';
import GameSection from './GameSection';
import { StyledStatistic } from './style';
import TotalSection from './TotalSection';

export default function Statistic() {
  const statsState = useSelector((state: TStore) => state.statsReducer);
  const { userId, token } = useSelector(
    (state: TStore) => state.userReducer!.user!
  );
  const { games } = statsState.optional.shortStats;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async function () {
  //     const res = await getUserStats(userId, token);
  //     dispatch(loadStats(res));
  //   })();
  // }, []);
  return (
    <StyledStatistic>
      <h2>Статистика за день</h2>
      <h3>По играм</h3>
      {/* {games && <GameSection gameStats={games} />}
      <h3>По словам</h3>
      {games && (
        <TotalSection
          learnedWords={statsState.learnedWords}
          gameStats={games}
        />
      )} */}
    </StyledStatistic>
  );
}
