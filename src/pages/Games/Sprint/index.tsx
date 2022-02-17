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
    <section>
      {status === 'playing' && (
        <SprintWrapper>
          {' '}
          <Question />
        </SprintWrapper>
      )}
      {status === 'prepare' && (
        <>
          <Rules />
          <Difficuilt />
        </>
      )}
      {status === 'ended' && (
        <SprintWrapper>
          <Score page={page} score={score} history={history} words={words} />
        </SprintWrapper>
      )}
    </section>
  );
};

export default Sprint;
