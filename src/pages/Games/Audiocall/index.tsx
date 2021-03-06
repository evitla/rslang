import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GamePreview, GameBg, GamePlay } from './style';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallQuestion from '../../../components/AudiocallQuestion';
import { TOTAL_GROUPS, TOTAL_QUESTIONS } from '../../../constants';
import { fetchQuestion, fetchFromBook } from './api';
import { AudioCallState, TWord } from '../../../types';
import {
  createStatsBody,
  updateUserStats,
  updateWordProgress,
  getRandomIntInclusive,
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
import { setCurGroup, setCurPage } from '../../../slices/audiocallBook';
import useOpenAuthForm from '../../../hooks/useOpenAuthForm';

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
  const userId = useSelector((state: TStore) => state.userReducer.user?.userId);
  const token = useSelector((state: TStore) => state.userReducer.user?.token);
  const { group, page } = useSelector(
    (state: TStore) => state.audiogameBookReducer
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPlay, setPlay] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthFormOpen } = useOpenAuthForm();

  const startGame = async (groupID: number) => {
    setLoading(true);
    setPlay(true);
    const newQuestions =
      group !== null && page !== null
        ? await fetchFromBook(group - 1, page - 1)
        : await fetchQuestion(groupID);
    const defaultState: AudioCallState = {
      questions: newQuestions,
      qurrentQuestion:
        newQuestions[number][
          group !== null && page !== null ? 0 : getRandomIntInclusive(0, 3)
        ],
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
      dispatch(setCurGroup(null));
      dispatch(setCurPage(null));
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

      if (userId && token) {
        const updatedWord = await updateWordProgress(
          userId,
          word,
          token,
          correct,
          navigate,
          setIsAuthFormOpen
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
      }
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
        dispatch(
          setCurQuestion(
            questions[number + 1][
              group !== null && page !== null ? 0 : getRandomIntInclusive(0, 3)
            ]
          )
        );
      }
      nextQuestion();
    }
  };

  useEffect(() => {
    if (page !== null && group !== null) {
      startGame(group);
    }
  }, []);
  return (
    <>
      {!isPlay && group === null && page === null && (
        <GamePreview>
          <h2>???????????????? ??????????????????</h2>
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
            ?????????????????? ?? ??????????
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
