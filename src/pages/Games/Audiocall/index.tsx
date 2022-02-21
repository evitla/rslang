import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GamePreview, GameBg, GamePlay } from './style';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallQuestion from '../../../components/AudiocallQuestion';
import { TOTAL_GROUPS, TOTAL_QUESTIONS } from '../../../constants';
import { fetchQuestion } from './api';
import { AudioCallState, TWord } from '../../../types';
import {
  createStatsBody,
  getRandomNumber,
  updateUserStats,
  updateWordProgress,
} from '../../../utils';
import GameResult from '../../../components/GameResult';
import { TStore } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurQuestion,
  setGameOver,
  setNumber,
  setRightAnswer,
  setScore,
  setUserAnswers,
  setWrongAnswer,
  startNewGame,
} from '../../../slices/audiocall';
import Loader from '../../../components/Loader';
import { loadStats } from '../../../slices/stats';
import { onUpdateUserWord } from '../../../slices/word';

const Audiocall = () => {
  const {
    questions,
    number,
    userAnswers,
    score,
    gameOver,
    qurrentQuestion,
    maxRightInRow,
  } = useSelector((state: TStore) => state.audioGameReducer);
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
      maxRightInRow: 0,
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
      const updatedWord = await updateWordProgress(
        userId,
        word,
        token,
        correct
      );
      if (updatedWord !== undefined) {
        dispatch(onUpdateUserWord(updatedWord));
      }
      const body = await createStatsBody(userId, word, token, {
        isRight: correct,
        rightInRow: maxRightInRow,
        gameName: 'audiocall',
      });
      const newStats = await updateUserStats(userId, token, body);
      dispatch(loadStats(newStats));
      if (correct) {
        dispatch(setRightAnswer());
        dispatch(setScore(score + 1));
      } else dispatch(setWrongAnswer());
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
      {!isPlay && (
        <GamePreview>
          <h2>Выберите сложность</h2>
          <div className="btns-wrapper">
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
      )}

      {isPlay && (
        <GameBg>
          <GamePlay>
            {loading && <Loader />}
            {!gameOver && !loading && <p className="score">Score: {score} </p>}
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
            {!loading && gameOver && userAnswers.length > 0 && (
              <GameResult userAnswers={userAnswers} />
            )}
          </GamePlay>
        </GameBg>
      )}
    </>
  );
};

export default Audiocall;
