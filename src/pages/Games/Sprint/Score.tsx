import React from 'react';
import { Thistory } from '../../../types';
import History from './History';
import ResetGame from './ResetGame';

type Tprops = {
  score: number;
  history: Thistory[];
};

export default function Score(props: Tprops) {
  const { score, history } = props;
  return (
    <div>
      Score
      <p>{score}</p>
      <History history={history} />
      <ResetGame />
    </div>
  );
}
