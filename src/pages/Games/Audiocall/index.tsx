import React, { useState } from 'react';
import { GamePreview, GameBg, GamePlay } from './style';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallQuestion from '../../../components/AudiocallQuestion';
import { TOTAL_GROUPS, TOTAL_QUESTIONS } from '../../../constants';
import { fetchQuestion } from './api';
import { TWord, TAnswer } from '../../../types';
import { getRandomNumber } from '../../../utils';
import GameResult from '../../../components/GameResult';

const Audiocall = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<TWord[][]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<TAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [isPlay, setPlay] = useState(false);
  const [qurrentQuestion, setCurQuestion] = useState<TWord>();
  const startGame = async (groupID: number) => {
    setLoading(true);
    setGameOver(false);
    setPlay(true);
    const newQuestions = await fetchQuestion(groupID);
    setQuestions(newQuestions);
    setCurQuestion(newQuestions[number][getRandomNumber(0, 3)]);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = (qurrentQuestion as TWord).wordTranslate === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObj = {
        questionAudio: (qurrentQuestion as TWord).audio,
        question: (qurrentQuestion as TWord).word,
        transcript: (qurrentQuestion as TWord).transcription,
        answer,
        isCorrect: correct,
        correctAnswer: (qurrentQuestion as TWord).wordTranslate,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
      if (number + 1 !== TOTAL_QUESTIONS) {
        setCurQuestion(questions[number + 1][getRandomNumber(0, 3)]);
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
