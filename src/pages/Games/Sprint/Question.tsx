import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchWords from '../../../hooks/useFetchWords';
import { setCurrentWord, setWords } from '../../../slices/sprint';
import { TStore } from '../../../store';
import Guess from './Guess';
import Rightindicator from './Rightindicator';

export default function Question() {
  const {
    group,
    page,
    words: wordsFromState,
  } = useSelector((state: TStore) => state.sprintGameReducer);
  const dispatch = useDispatch();
  const { words, isSuccess } = useFetchWords(group, page);
  useEffect(() => {
    if (isSuccess) {
      const { word } = words[0];
      dispatch(setWords(words));
      dispatch(setCurrentWord(word));
    }
  }, [words, isSuccess]);

  return (
    <div>
      {wordsFromState.length > 0 && (
        <>
          <Rightindicator
            rightAnswerToBonus={2}
            rightInTheRow={3}
          ></Rightindicator>
          <Guess></Guess>
        </>
      )}
    </div>
  );
}
