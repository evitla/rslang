import React from 'react';
import * as lodash from 'lodash';
import { GamseStatsWithDate } from '../../../types';
import GameInfo from './GameInfo';
import { createDateAsKey } from '../../../utils/statistic';

type Tprops = {
  gameStats: {
    sprint: GamseStatsWithDate;
    audiocall: GamseStatsWithDate;
  };
};

export default function GameSection(props: Tprops) {
  const { sprint, audiocall } = props.gameStats;
  const key = createDateAsKey();
  const todaySprintStats = lodash.has(sprint, key) ? sprint[key] : undefined;

  const todayAudiocallStats = lodash.has(audiocall, key)
    ? audiocall[key]
    : undefined;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <GameInfo stats={todaySprintStats} gameName="Спринт" />
      <GameInfo stats={todayAudiocallStats} gameName="Аудиовызов" />
    </div>
  );
}
