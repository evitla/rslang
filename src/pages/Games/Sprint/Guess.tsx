import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USERS_URL } from '../../../constants';
import {
  setCurrentWord,
  setCurrentWordIndex,
  setHistory,
  setRightAnswer,
  setStatus,
} from '../../../slices/sprint';
import { TStore } from '../../../store';
import { TUserWord } from '../../../types';
import {
  fiftyfifty,
  getOne,
  getRandomIntExcludingExistingNumbers,
  update,
  updateWordProgress,
} from '../../../utils';

export default function Guess() {
  const { currentWord, words, currentWordIndex, score } = useSelector(
    (state: TStore) => state.sprintGameReducer
  );
  const { userId, token } = useSelector(
    (state: TStore) => state.userReducer.user!
  );
  const dispatch = useDispatch();
  const [variant, setvariant] = useState('');

  const result = fiftyfifty();

  useEffect(() => {
    if (result) {
      const translate = words[currentWordIndex].wordTranslate;
      setvariant(translate);
    } else {
      const randomIndex = getRandomIntExcludingExistingNumbers(
        0,
        words.length - 1,
        currentWordIndex
      );
      const translate = words[randomIndex].wordTranslate;
      setvariant(translate);
    }
  }, [currentWord, words]);
  async function buttonHandler(userAnswer: boolean, index: number) {
    const isCorrect = userAnswer === result;
    const currWordId = words[index]?.id;
    const nextWord = words[index + 1]?.word;
    const nextWordId = words[index + 1]?.id;

    await updateWordProgress(userId, currWordId, token, true);

    if (!nextWord) dispatch(setStatus('ended'));
    if (isCorrect) {
      // update(updateURL,);
      dispatch(setRightAnswer());
      dispatch(setCurrentWord({ word: nextWord, id: nextWordId }));
    } else dispatch(setCurrentWord({ word: nextWord, id: nextWordId }));
    dispatch(setCurrentWordIndex(index + 1));
    dispatch(setHistory({ guessWord: currentWord, result: isCorrect }));
  }
  return (
    <div>
      <div>score: {score}</div>
      <div>Загадываемое слово: {currentWord}</div>
      <div>Возможный вариант: {variant}</div>
      <button
        onClick={() => buttonHandler(false, currentWordIndex)}
        type="button"
      >
        Не Верно
      </button>
      <button
        onClick={() => buttonHandler(true, currentWordIndex)}
        type="button"
      >
        {' '}
        верно
      </button>
    </div>
  );
}
