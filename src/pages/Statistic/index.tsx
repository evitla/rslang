import React from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '../../store';
import GameSection from './GameSection';
import TotalSection from './TotalSection';

export default function Statistic() {
  const statsState = useSelector((state: TStore) => state.statsReducer);
  const { games } = statsState.optional.shortStats;

  return (
    <div>
      {games && <GameSection gameStats={games} />}
      <TotalSection learnedWords={statsState.learnedWords} />
    </div>
  );
}
