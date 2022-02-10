import React from 'react';
import { useSelector } from 'react-redux';

import { TStore } from '../../../store';
import Difficuilt from './Difficuilt';
import Question from './Question';
import Rules from './Rules';

const Sprint = () => {
  const { status } = useSelector((state: TStore) => state.sprintGameReducer);

  return (
    <section className="sprint">
      {status === 'playing' && <Question />}
      {status === 'prepare' && (
        <>
          <Rules />
          <Difficuilt />
        </>
      )}
    </section>
  );
};

export default Sprint;
