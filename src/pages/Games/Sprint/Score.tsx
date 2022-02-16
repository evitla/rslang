import React from 'react';
import { Link } from 'react-router-dom';
import { PAGES_AT_GROUP } from '../../../constants';
import { ScorePropsType } from '../../../types';
import History from './History';
import NextLevel from './NextLevel';
import ResetGame from './ResetGame';
import { ScoreTable, ScoreButtonStyle } from './styles';

export default function Score(props: ScorePropsType) {
  const { score, history, page, words } = props;
  return (
    <ScoreTable>
      <p className="score">Score: {score}</p>
      <History words={words} history={history} />
      <div className="score-btns">
        <ResetGame />
        {page < PAGES_AT_GROUP && <NextLevel />}
        <ScoreButtonStyle>
          <button>
            <Link to="/">HomePage</Link>
          </button>
        </ScoreButtonStyle>
      </div>
    </ScoreTable>
  );
}
