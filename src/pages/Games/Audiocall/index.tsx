import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { GamePreview, GameBg, GamePlay } from './style';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallQuestion from '../../../components/AudiocallQuestion';
import { TOTAL_GROUPS, TOTAL_QUESTIONS } from '../../../constants';
import { fetchQuestion } from './api';
import { AudioCallState, TWord } from '../../../types';
import { getRandomNumber, updateWordProgress } from '../../../utils';
import GameResult from '../../../components/GameResult';
import { TStore } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurQuestion,
  setGameOver,
  setNumber,
  setScore,
  setUserAnswers,
  startNewGame,
} from '../../../slices/audiocall';

const Audiocall = () => {
  const { questions, number, userAnswers, score, gameOver, qurrentQuestion } =
    useSelector((state: TStore) => state.audioGameReducer);
  const { userId, token } = useSelector(
    (state: TStore) => state.userReducer.user!
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPlay, setPlay] = useState(false);
  const navigate = useNavigate();
  const startGame = async (groupID: number) => {
    setLoading(true);
    setPlay(true);
    const newQuestions = await fetchQuestion(groupID);
    const defaultState: AudioCallState = {
      questions: newQuestions,
      qurrentQuestion: newQuestions[number][getRandomNumber(0, 3)],
      score: 0,
      userAnswers: [],
      number: 0,
      gameOver: false,
    };
    dispatch(startNewGame(defaultState));
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

  const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = (qurrentQuestion as TWord).wordTranslate === answer;
      const word = qurrentQuestion!.id;
      await updateWordProgress(userId, word, token, correct);
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
        <h2>Выберите сложность</h2>
        <div>
          {Array.from({ length: TOTAL_GROUPS }, (_, i) => (
            <AudiocallButton key={i} groupNum={i} startGame={startGame} />
          ))}
        </div>
        <button
          className="back"
          type="button"
          onClick={() => navigate('/games')}
        >
          Вернуться к играм
        </button>
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
