import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUND_TIME } from '../../../constants';
import useFetchWords from '../../../hooks/useFetchWords';
import { setCurrentWord, setStatus, setWords } from '../../../slices/sprint';
import { TStore } from '../../../store';
import Guess from './Guess';
import Rightindicator from './Rightindicator';

export default function Question() {
  const [timer, setTimer] = useState(ROUND_TIME);
  const [idInt, setidInt] = useState<NodeJS.Timer | null>(null);

  const dispatch = useDispatch();

  const createTimer = () => {
    const id = setInterval(() => {
      setTimer((prevstate) => prevstate - 1);
    }, 1000);
    return id;
  };

  const {
    group,
    page,
    words: wordsFromState,
    rightInRow,
  } = useSelector((state: TStore) => state.sprintGameReducer);
  const { words, isSuccess } = useFetchWords(group, page);

  useEffect(() => {
    if (isSuccess) {
      const { word } = words[0];
      dispatch(setWords(words));
      dispatch(setCurrentWord(word));
    }
  }, [words, isSuccess]);
  //timer logic
  useEffect(() => {
    if (!idInt) {
      const id = createTimer();
      setidInt(id);
    }
    if (timer === 0 && idInt) {
      clearInterval(idInt);
      setidInt(null);
      dispatch(setStatus('ended'));
    }
  }, [timer]);

  return (
    <div>
      time: {timer}
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
  );
}
