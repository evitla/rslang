import React from 'react';
import { Link } from 'react-router-dom';
import { PAGES_AT_GROUP } from '../../../constants';
import { ScorePropsType } from '../../../types';
import History from './History';
import NextLevel from './NextLevel';
import ResetGame from './ResetGame';

export default function Score(props: ScorePropsType) {
  const { score, history, page, words } = props;
  return (
    <div>
      Score
      <p>{score}</p>
      <History words={words} history={history} />
      <ResetGame />
      {page < PAGES_AT_GROUP && <NextLevel />}
      <Link to="/">HomePage</Link>
    </div>
  );
}