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
import {
  fiftyfifty,
  getRandomIntExcludingExistingNumbers,
  updateWordProgress,
} from '../../../utils';
import { QuestionWrapper } from './styles';

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
    let translate = '';
    if (result) {
      translate = words[currentWordIndex].wordTranslate;
    } else {
      const randomIndex = getRandomIntExcludingExistingNumbers(
        0,
        words.length - 1,
        currentWordIndex
      );
      translate = words[randomIndex].wordTranslate;
    }
    setvariant(translate);
  }, [currentWord, words]);
  async function buttonHandler(userAnswer: boolean, index: number) {
    const isCorrect = userAnswer === result;
    const currWordId = words[index]?.id;
    const nextWord = words[index + 1]?.word;
    const nextWordId = words[index + 1]?.id;
    await updateWordProgress(userId, currWordId, token, true);
    if (!nextWord) dispatch(setStatus('ended'));
    dispatch(setCurrentWord({ word: nextWord, id: nextWordId }));
    if (isCorrect) {
      dispatch(setRightAnswer());
    }
    dispatch(setCurrentWordIndex(index + 1));
    dispatch(setHistory({ guessWord: currentWord, result: isCorrect }));
  }
  return (
    <QuestionWrapper>
      <p className="score">score: {score}</p>
      <p className="word-to-guess">{currentWord}</p>
      <p className="answer-word">{variant}</p>
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
        Верно
      </button>
    </QuestionWrapper>
  );
}
