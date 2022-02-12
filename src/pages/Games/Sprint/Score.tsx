import React from 'react';
import { Link } from 'react-router-dom';
import { PAGES_AT_GROUP } from '../../../constants';
import { Thistory } from '../../../types';
import History from './History';
import NextLevel from './NextLevel';
import ResetGame from './ResetGame';

type Tprops = {
  score: number;
  history: Thistory[];
  page: number;
};

export default function Score(props: Tprops) {
  const { score, history, page } = props;
  return (
    <div>
      Score
      <p>{score}</p>
      <History history={history} />
      <ResetGame />
      {page < PAGES_AT_GROUP && <NextLevel />}
      <Link to="/">HomePage</Link>
    </div>
  );
}
