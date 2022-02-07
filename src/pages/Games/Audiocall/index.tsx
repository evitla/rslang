import React from 'react';
import { GamePreview } from './style';
import useFetchWords from '../../../hooks/useFetchWords';
import AudiocallButton from '../../../components/AudiocallButton';
import { TOTAL_GROUPS } from '../../../constants';

const Audiocall = () => {
  return (
    <>
      <GamePreview>
        <h2>Audiocall</h2>
        <p>
          Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать
          перевод услышанного слова.
        </p>
        <div>
          {Array.from({ length: TOTAL_GROUPS }, (_, i) => (
            <AudiocallButton groupNum={i + 1}></AudiocallButton>
          ))}
        </div>
      </GamePreview>
    </>
  );
};

export default Audiocall;
