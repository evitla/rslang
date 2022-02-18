import React from 'react';
import { GamseStatsWithDate } from '../../types';
import { extractStatsByDate } from '../../utils';
import GameInfo from './GameInfo';

type Tprops = {
  gameStats: {
    sprint: GamseStatsWithDate[];
    audiocall: GamseStatsWithDate[];
  };
};

export default function GameSection(props: Tprops) {
  const { gameStats } = props;
  const todaygameStats = extractStatsByDate(gameStats);
  const { sprint, audiocall } = todaygameStats;

  const todaySprintStats = sprint ? sprint[0] : undefined;

  const todayAudiocallStats = audiocall ? audiocall[0] : undefined;
  return (
    <div>
      <GameInfo stats={todaySprintStats} gameName="Спринт" />
      <GameInfo stats={todayAudiocallStats} gameName="АудиоВызов" />
    </div>
  );
}
