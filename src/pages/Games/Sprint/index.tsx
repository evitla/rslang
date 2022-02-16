import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { TStore } from '../../../store';
import Difficuilt from './Difficuilt';
import Question from './Question';
import Rules from './Rules';
import Score from './Score';

const Sprint = () => {
  const { status, score, history, page, words } = useSelector(
    (state: TStore) => state.sprintGameReducer
  );
  const navigate = useNavigate();

  return (
    <section className="sprint">
      {status === 'playing' && <Question />}
      {status === 'prepare' && (
        <>
          <Rules />
          <Difficuilt />
          <button
            className="back"
            type="button"
            onClick={() => navigate('/games')}
          >
            Вернуться к играм
          </button>
        </>
      )}
      {status === 'ended' && (
        <Score page={page} score={score} history={history} words={words} />
      )}
    </section>
  );
};

export default Sprint;
