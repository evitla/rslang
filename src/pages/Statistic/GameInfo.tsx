import React from 'react';
import { GamseStats } from '../../types';

type Tprops = {
  stats: GamseStats | undefined;
  gameName: string;
};

export default function GameInfo(props: Tprops) {
  const { gameName, stats } = props;
  return (
    <div>
      <p>{gameName}</p>

      <p>Количество изученных слов: {stats ? stats[0].newWords : '0'}</p>
      <p>
        Процент правильных ответов: {stats ? stats[0].rightPercent + '%' : '0'}
      </p>
      <p>Лучшая серия: {stats ? stats[0].rightInRow : '0'}</p>
    </div>
  );
}
