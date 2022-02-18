import React from 'react';
import { GamseStatsWithDate } from '../../types';
import { extractStatsByDate } from '../../utils';
import GameInfo from './GameInfo';

type Tprops = {
  gameStats: {
    sprint?: GamseStatsWithDate[] | undefined;
    audiocall?: GamseStatsWithDate[] | undefined;
  };
};

export default function GameSection(props: Tprops) {
  const { gameStats } = props;
  const currentgameStats = extractStatsByDate(gameStats);
  const { sprint, audiocall } = currentgameStats;
  const todaySprintStats = sprint ? sprint[0] : undefined;
  const todayAudiocallStats = audiocall ? audiocall[0] : undefined;
  return (
    <div>
      <GameInfo stats={todaySprintStats} gameName="Спринт" />
      <GameInfo stats={todayAudiocallStats} gameName="АудиоВызов" />
    </div>
  );
}
