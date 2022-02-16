import React from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '../../../store';
import Difficuilt from './Difficuilt';
import Question from './Question';
import Rules from './Rules';
import Score from './Score';
import { SprintWrapper } from './styles';

const Sprint = () => {
  const { status, score, history, page, words } = useSelector(
    (state: TStore) => state.sprintGameReducer
  );

  return (
    <SprintWrapper>
      {status === 'playing' && <Question />}
      {status === 'prepare' && (
        <>
          <Rules />
          <Difficuilt />
        </>
      )}
      {status === 'ended' && (
        <Score page={page} score={score} history={history} words={words} />
      )}
    </SprintWrapper>
  );
};

export default Sprint;
