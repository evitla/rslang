import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentWord,
  setCurrentWordIndex,
  setHistory,
  setRightAnswer,
  setStatus,
} from '../../../slices/sprint';
import { TStore } from '../../../store';
import { getRandomIntExcludingExistingNumbers } from '../../../utils';

export default function Guess() {
  const { currentWord, words, currentWordIndex, score } = useSelector(
    (state: TStore) => state.sprintGameReducer
  );
  const dispatch = useDispatch();
  const [variant, setvariant] = useState('');
  function fiftyfifty() {
    const result = Math.random();
    return result > 0.5 ? true : false;
  }
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
  function buttonHandler(userAnswer: boolean, index: number) {
    const isCorrect = userAnswer === result;
    const nextWord = words[index + 1]?.word;
    if (!nextWord) dispatch(setStatus('ended'));
    if (isCorrect) {
      dispatch(setRightAnswer());
      dispatch(setCurrentWord(nextWord));
    } else dispatch(setCurrentWord(nextWord));
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
