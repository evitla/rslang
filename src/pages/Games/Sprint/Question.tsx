import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchWords from '../../../hooks/useFetchWords';
import { setCurrentWord, setWords } from '../../../slices/sprint';
import { TStore } from '../../../store';
import Guess from './Guess';
import Rightindicator from './Rightindicator';
import { SprintGamePlay } from './styles';
import Timer from './Timer';

export default function Question() {
  const dispatch = useDispatch();

  const {
    group,
    page,
    words: wordsFromState,
    rightInRow,
  } = useSelector((state: TStore) => state.sprintGameReducer);
  const { words, isSuccess } = useFetchWords(group, page);

  useEffect(() => {
    if (isSuccess) {
      const { word, id } = words[0];
      dispatch(setWords(words));
      dispatch(setCurrentWord({ word, id }));
    }
  }, [words, isSuccess]);

  return (
    <SprintGamePlay>
      <div className="question-wrapper">
        <Timer />
        {wordsFromState.length > 0 && (
          <>
            <Rightindicator
              rightAnswerToBonus={3}
              rightInTheRow={rightInRow}
            ></Rightindicator>
            <Guess></Guess>
          </>
        )}
      </div>
    </SprintGamePlay>
  );
}
