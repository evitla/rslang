import React from 'react';
import { useSelector } from 'react-redux';
import useFetchWords from '../../../hooks/useFetchWords';
import { TStore } from '../../../store';
import Difficuilt from './Difficuilt';
import Question from './Question';
import Rules from './Rules';

const Sprint = () => {
  const { status } = useSelector((state: TStore) => state.sprintGameReducer);

  function setLevelHandler(group, page) {
    const words = useFetchWords(group, page).words;
  }
  return (
    <section className="sprint">
      {status === 'playing' && <Question />}
      {status === 'prepare' && (
        <>
          <Rules />
          <Difficuilt handler={() => setisPlaying(true)} />
        </>
      )}
    </section>
  );
};

export default Sprint;
