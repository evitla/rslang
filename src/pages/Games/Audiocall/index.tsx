import React, { useState } from 'react';
import { GamePreview, GameBg, GamePlay } from './style';
import useFetchWords from '../../../hooks/useFetchWords';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallAnswer from '../../../components/AudiocallAnswer';
import AudiocallQuestion from '../../../components/AudiocallQuestion';
import { TOTAL_GROUPS } from '../../../constants';
import { getRandomNumber } from '../../../utils';

const TOTAL_QUESTIONS = 10;

const Audiocall = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  // Test
  const [group, setGroup] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const startGame = async () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};
  const setGame = (groupID: number) => {
    setGroup(groupID);
    setPlay(true);
  };
  const { words, isLoading, isError } = useFetchWords(group - 1, 8);
  console.log('words', words);
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
            <AudiocallButton key={i} groupNum={i + 1} setGame={setGame} />
          ))}
        </div>
      </GamePreview>
      {/* <AudiocallQuestion
        questionNum={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        questionAudio={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <GameBg isPlay={isPlay}>
        <GamePlay>
          {isLoading ? (
            <h2>Loading...</h2>
          ) : isError ? (
            <div>Error while fetching</div>
          ) : (
            <>
              {words.map((word, i) => {
                if (i < 4) {
                  return <AudiocallAnswer key={word.id} word={word} />;
                }
              })}
            </>
          )}
        </GamePlay>
      </GameBg>
    </>
  );
};

export default Audiocall;
