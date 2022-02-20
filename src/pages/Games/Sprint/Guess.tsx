import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentWord,
  setCurrentWordIndex,
  setHistory,
  setRightAnswer,
  setStatus,
  setWrongAnswer,
} from '../../../slices/sprint';
import { loadStats } from '../../../slices/stats';
import { TStore } from '../../../store';
import {
  createStatsBody,
  fiftyfifty,
  getRandomIntExcludingExistingNumbers,
  updateUserStats,
  updateWordProgress,
} from '../../../utils';
import { QuestionWrapper } from './styles';

export default function Guess() {
  const { currentWord, words, currentWordIndex, score, maxRightInRow } =
    useSelector((state: TStore) => state.sprintGameReducer);
  const { userId, token } = useSelector(
    (state: TStore) => state.userReducer.user!
  );
  const dispatch = useDispatch();
  const [variant, setvariant] = useState('');

  const [result, setResult] = useState(fiftyfifty());

  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const arrowHandler = (e: KeyboardEvent) => {
    if ((e as KeyboardEvent).code === 'ArrowLeft') {
      leftRef.current?.focus();
    }
    if ((e as KeyboardEvent).code === 'ArrowRight') {
      rightRef.current?.focus();
    }
  };
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
    await updateWordProgress(userId, currWordId, token, isCorrect);
    const body = await createStatsBody(userId, currWordId, token, {
      isRight: isCorrect,
      rightInRow: maxRightInRow,
      gameName: 'sprint',
    });
    const newStats = await updateUserStats(userId, token, body);
    dispatch(loadStats(newStats));
    if (!nextWord) dispatch(setStatus('ended'));
    dispatch(setCurrentWord({ word: nextWord, id: nextWordId }));
    if (isCorrect) {
      dispatch(setRightAnswer());
    } else dispatch(setWrongAnswer());
    dispatch(setCurrentWordIndex(index + 1));
    dispatch(setHistory({ guessWord: currentWord, result: isCorrect }));
  }
  return (
    <QuestionWrapper>
      <p className="score">score: {score}</p>
      <p className="word-to-guess">{currentWord}</p>
      <p className="answer-word">{variant}</p>
      <div className="btn-wrap">
        <button
          onClick={() => buttonHandler(false, currentWordIndex)}
          type="button"
          className="wrong"
          ref={leftRef}
        >
          Не Верно
        </button>
        <button
          onClick={() => buttonHandler(true, currentWordIndex)}
          type="button"
          className="right"
          ref={rightRef}
        >
          {' '}
          Верно
        </button>
      </div>
    </QuestionWrapper>
  );
}
