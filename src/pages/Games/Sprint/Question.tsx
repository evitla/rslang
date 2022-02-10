import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetchWords from '../../../hooks/useFetchWords';
import { setWords } from '../../../slices/sprint';
import Rightindicator from './Rightindicator';

export default function Question() {
  const dispatch = useDispatch();
  const { words, isSuccess } = useFetchWords(1, 2);

  useEffect(() => {
    if (isSuccess) dispatch(setWords(words));
  }, [words, isSuccess]);

  return (
    <div>
      <Rightindicator rightAnswerToBonus={2} rightInTheRow={3}></Rightindicator>
      <div>{}</div>
    </div>
  );
}
