import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import useOpenAuthForm from '../../../hooks/useOpenAuthForm';
import {
  setCurrentWord,
  setCurrentWordIndex,
  setHistory,
  setRightAnswer,
  setStatus,
  setWrongAnswer,
} from '../../../slices/sprint';
import { loadStats } from '../../../slices/stats';
import { onUpdateUserWord } from '../../../slices/word';
import { TStore } from '../../../store';
import {
  getRandomIntExcludingExistingNumbers,
  updateUserStats,
  updateWordProgress,
} from '../../../utils';
import { QuestionWrapper } from './styles';

export default function Guess() {
  const {
    currentWord,
    words,
    currentWordIndex,
    score,
    maxRightInRow,
    isRight,
  } = useSelector((state: TStore) => state.sprintGameReducer);

  const dispatch = useDispatch();
  const [variant, setvariant] = useState('');
  const userId = useSelector((state: TStore) => state.userReducer.user?.userId);
  const token = useSelector((state: TStore) => state.userReducer.user?.token);

  const navigate = useNavigate();
  const { setIsAuthFormOpen } = useOpenAuthForm();

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
    window.addEventListener('keydown', arrowHandler);
  });
  useEffect(() => {
    let translate = '';

    if (isRight) {
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
  }, [currentWord, currentWordIndex]);

  async function buttonHandler(
    userAnswer: boolean,
    index: number,
    verity: boolean
  ) {
    const nextWord = words[index + 1]?.word;
    if (!nextWord) dispatch(setStatus('ended'));
    const isCorrect = userAnswer === verity;
    const currWordId = words[index]?.id;

    const nextWordId = words[index + 1]?.id;

    if (userId && token) {
      const updatedWord = await updateWordProgress(
        userId,
        currWordId,
        token,
        isCorrect,
        navigate,
        setIsAuthFormOpen
      );
      if (updatedWord !== undefined) {
        dispatch(onUpdateUserWord(updatedWord));
      }
    }

    if (isCorrect) {
      dispatch(setRightAnswer());
    } else dispatch(setWrongAnswer());
    dispatch(setHistory({ guessWord: currentWord, result: isCorrect }));
    dispatch(setCurrentWord({ word: nextWord, id: nextWordId }));
    dispatch(setCurrentWordIndex(index + 1));
  }
  return (
    <QuestionWrapper>
      <p className="score">score: {score}</p>
      <p className="word-to-guess">{currentWord}</p>
      <p className="answer-word">{variant}</p>
      <div className="btn-wrap">
        <button
          onClick={() => buttonHandler(false, currentWordIndex, isRight)}
          type="button"
          className="wrong"
          ref={leftRef}
        >
          Не Верно
        </button>
        <button
          onClick={() => buttonHandler(true, currentWordIndex, isRight)}
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
