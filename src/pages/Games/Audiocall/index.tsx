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
  const [group, setGroup] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [pressedAnswer, setAnswer] = useState(0);
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

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    setAnswer(i);
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correctArr = questions.map((question) => question[number]);
      console.log('pressedAnswer', pressedAnswer);
      console.log('correctArr', correctArr);

      const correct = correctArr[i].wordTranslate === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObj = {
        question: correctArr[i].word,
        answer,
        correct,
        correctAnswer: correctArr[i].wordTranslate,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
    nextQuestion();
  };

  console.log('questions', questions);
  console.log('userAnswers', userAnswers);
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
              questionAudio={questions[number][getRandomNumber(0, 3)]}
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
