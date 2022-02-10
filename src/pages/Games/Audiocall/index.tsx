import React, { useState } from 'react';
import { GamePreview, GameBg, GamePlay } from './style';
import useFetchWords from '../../../hooks/useFetchWords';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallAnswer from '../../../components/AudiocallAnswer';
import AudiocallQuestion from '../../../components/AudiocallQuestion';
import { TOTAL_GROUPS } from '../../../constants';
import { getRandomNumber } from '../../../utils';
import { fetchQuestion, Question } from './api';
const TOTAL_QUESTIONS = 20;

export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: boolean;
};

const Audiocall = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[][]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [group, setGroup] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const startGame = async (groupID: number) => {
    setLoading(true);
    setGameOver(false);
    setGroup(groupID);
    setPlay(true);
    const newQuestions = await fetchQuestion(groupID);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correctArr = questions.map((question) => question[number]);
      const correct = correctArr[number].word === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObj = {
        question: correctArr[number].word,
        answer,
        correct,
        correctAnswer: correctArr[number].isRight,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  console.log('questions', questions);
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
              questionAudio={questions[number]}
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
