import React, { useState } from 'react';
import { GamePreview, GameBg, GamePlay } from './style';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallQuestion from '../../../components/AudiocallQuestion';
import { TOTAL_GROUPS, TOTAL_QUESTIONS } from '../../../constants';
import { fetchQuestion } from './api';
import { TWord, TAnswer } from '../../../types';
import { getRandomNumber } from '../../../utils';
import GameResult from '../../../components/GameResult';
import { TStore } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurQuestion,
  setGameOver,
  setNumber,
  setQuestions,
  setScore,
  setUserAnswers,
} from '../../../slices/audiocall';

const Audiocall = () => {
  const { questions, number, userAnswers, score, gameOver, qurrentQuestion } =
    useSelector((state: TStore) => state.audioGameReducer);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPlay, setPlay] = useState(false);

  const startGame = async (groupID: number) => {
    setLoading(true);
    dispatch(setGameOver(false));
    setPlay(true);
    const newQuestions = await fetchQuestion(groupID);
    dispatch(setQuestions(newQuestions));
    dispatch(setCurQuestion(newQuestions[number][getRandomNumber(0, 3)]));
    dispatch(setScore(0));
    dispatch(setUserAnswers([]));
    dispatch(setNumber(0));
    setLoading(false);
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      dispatch(setGameOver(true));
    } else {
      dispatch(setNumber(nextQ));
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = (qurrentQuestion as TWord).wordTranslate === answer;
      if (correct) dispatch(setScore(score + 1));
      const answerObj = {
        questionAudio: (qurrentQuestion as TWord).audio,
        question: (qurrentQuestion as TWord).word,
        transcript: (qurrentQuestion as TWord).transcription,
        answer,
        isCorrect: correct,
        correctAnswer: (qurrentQuestion as TWord).wordTranslate,
      };
      const newUserAnswers = [...userAnswers, answerObj];
      dispatch(setUserAnswers(newUserAnswers));
      if (number + 1 !== TOTAL_QUESTIONS) {
        dispatch(setCurQuestion(questions[number + 1][getRandomNumber(0, 3)]));
      }
      nextQuestion();
    }
  };
  return (
    <>
      <GamePreview isPlay={isPlay}>
        <h2>Аудиовызов</h2>
        <p>
          Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать
          перевод услышанного слова.
        </p>
        <div>
          {Array.from({ length: TOTAL_GROUPS }, (_, i) => (
            <AudiocallButton key={i} groupNum={i} startGame={startGame} />
          ))}
        </div>
      </GamePreview>
      <GameBg isPlay={isPlay}>
        <GamePlay>
          {loading && <p>Loading Questions...</p>}
          {!gameOver && !loading && <p>Score: {score} </p>}
          {!loading && !gameOver && (
            <AudiocallQuestion
              questionNum={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              questionAudio={qurrentQuestion as TWord}
              answers={questions[number]}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
        </GamePlay>
        {!loading && gameOver && <GameResult userAnswers={userAnswers} />}
      </GameBg>
    </>
  );
};

export default Audiocall;
