import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetchWords from '../../../hooks/useFetchWords';
import { setWords } from '../../../slices/sprint';
import Guess from './Guess';
import Rightindicator from './Rightindicator';

export default function Question() {
  const dispatch = useDispatch();
  const { words, isSuccess } = useFetchWords(1, 2);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setWords(words));
    }
  }, [words, isSuccess]);

  return (
    <div>
      {words && (
        <>
          <Guess></Guess>
          <Rightindicator
            rightAnswerToBonus={2}
            rightInTheRow={3}
          ></Rightindicator>
        </>
      )}
    </div>
  );
}
