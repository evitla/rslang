import React, { useState } from 'react';
import useFetchWords from '../../../hooks/useFetchWords';
import { getRandomIntInclusive } from '../../../utils';
import Difficuilt from './Difficuilt';
import Question from './Question';
import Rules from './Rules';

const Sprint = () => {
  const [isPlaying, setisPlaying] = useState(false);
  const [group, setGroup] = useState(0);
  const randomPage = getRandomIntInclusive();
  const words = useFetchWords(group, randomPage).words;

  return (
    <section className="sprint">
      {isPlaying && <Question />}
      {!isPlaying && (
        <>
          <Rules />
          <Difficuilt handler={() => setisPlaying(true)} />
        </>
      )}
    </section>
  );
};

export default Sprint;
