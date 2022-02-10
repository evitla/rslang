import React, { useState } from 'react';
import { GamePreview, GameBg, GamePlay } from './style';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallQuestion from '../../../components/AudiocallQuestion';
import { TOTAL_GROUPS } from '../../../constants';
import { fetchQuestion } from './api';
import { TWord } from '../../../types';
import { getRandomNumber } from '../../../utils';
const TOTAL_QUESTIONS = 20;

export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Audiocall = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<TWord[][]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
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
        question: (qurrentQuestion as TWord).word,
        answer,
        correct,
        correctAnswer: (qurrentQuestion as TWord).wordTranslate,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
      console.log('number', number);
      if (number + 1 !== TOTAL_QUESTIONS) {
        setCurQuestion(questions[number + 1][getRandomNumber(0, 3)]);
      }
      nextQuestion();
    }
  };

  console.log('questions', questions);
  console.log('userAnswers', userAnswers);
  console.log('qurrentQuestion', qurrentQuestion);
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
      </GameBg>
    </>
  );
};

export default Audiocall;
