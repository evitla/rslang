import React from 'react';
import { GamseStatsType } from '../../../types';
import { StyledGameInfo } from './style';

type Tprops = {
  stats: GamseStatsType | undefined;
  gameName: string;
};

export default function GameInfo(props: Tprops) {
  const { gameName, stats } = props;
  const percent = stats
    ? Math.floor((stats.rightCount / stats.tries) * 100) + '%'
    : '0';
  return (
    <StyledGameInfo>
      <h4>{gameName}</h4>
      <p>Количество новых слов: {stats ? stats.newWords : '0'}</p>
      <p>Процент правильных ответов: {percent}</p>
      <p>Лучшая серия: {stats ? stats.maxRightInRow : '0'}</p>
    </StyledGameInfo>
  );
}
