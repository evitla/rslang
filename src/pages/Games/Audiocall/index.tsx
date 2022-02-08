import React, { useState } from 'react';
import { GamePreview, GameBg, GamePlay } from './style';
import useFetchWords from '../../../hooks/useFetchWords';
import AudiocallButton from '../../../components/AudiocallButton';
import AudiocallAnswer from '../../../components/AudiocallAnswer';
import { TOTAL_GROUPS } from '../../../constants';
import { getRandomNumber } from '../../../utils';

const Audiocall = () => {
  const [group, setGroup] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const setGame = (groupID: number) => {
    setGroup(groupID);
    setPlay(true);
  };
  const { words, isLoading, isError } = useFetchWords(group - 1, 8);
  console.log('words', words);
  console.log('group', group);
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
