import React from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '../../../store';
import Difficuilt from './Difficuilt';
import Question from './Question';
import Rules from './Rules';
import Score from './Score';

const Sprint = () => {
  const { status, score, history } = useSelector(
    (state: TStore) => state.sprintGameReducer
  );

  return (
    <section className="sprint">
      {status === 'playing' && <Question />}
      {status === 'prepare' && (
        <>
          <Rules />
          <Difficuilt />
        </>
      )}
      {status === 'ended' && <Score score={score} history={history} />}
    </section>
  );
};

export default Sprint;
