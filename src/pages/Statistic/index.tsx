import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USERS_URL } from '../../constants';
import { loadStats } from '../../slices/stats';
import { TStore } from '../../store';
import { getUserStats } from '../../utils';
import GameSection from './GameSection';
import TotalSection from './TotalSection';

export default function Statistic() {
  const userId = useSelector(
    (state: TStore) => state?.userReducer?.user?.userId
  );
  const statsState = useSelector((state: TStore) => state?.statsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const res = await getUserStats(USERS_URL, userId);
      dispatch(loadStats(res));
    })();
  }, []);

  return (
    <div>
      12356
      {/* <GameSection gameStats={statsState.games} />
      <TotalSection learnedWords={statsState.learnedWords}
        totalRightPercent={statsState.totalRightPercent} /> */}
    </div>
  );
}
