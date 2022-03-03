import React from 'react';
import * as lodash from 'lodash';
import { GamseStatsWithDate } from '../../../types';
import { StyledGameInfo } from './style';
import { createDateAsKey } from '../../../utils/statistic';

type Tprops = {
  learnedWords: number;
  gameStats: {
    sprint: GamseStatsWithDate;
    audiocall: GamseStatsWithDate;
  };
};

export default function TotalSection(props: Tprops) {
  const { learnedWords } = props;
  const { sprint, audiocall } = props.gameStats;
  const key = createDateAsKey();
  const todaySprintStats = lodash.has(sprint, key) ? sprint[key] : undefined;

  const todayAudiocallStats = lodash.has(audiocall, key)
    ? audiocall[key]
    : undefined;

  const sprintPercent = todaySprintStats
    ? Math.floor((todaySprintStats.rightCount / todaySprintStats.tries) * 100)
    : 100;
  const audioPercent = todayAudiocallStats
    ? Math.floor(
        (todayAudiocallStats.rightCount / todayAudiocallStats.tries) * 100
      )
    : 100;
  const medianePercent = (sprintPercent + audioPercent) / 2 + '%';

  const sprintLearnedWords = todaySprintStats?.newWords
    ? todaySprintStats?.newWords
    : 0;
  const audiocallLearnedWords = todayAudiocallStats?.newWords
    ? todayAudiocallStats?.newWords
    : 0;
  const totalNewWords = sprintLearnedWords + audiocallLearnedWords;

  return (
    <StyledGameInfo>
      <p>количество новых слов за день: {totalNewWords}</p>
      <p>количество изученных слов за день: {learnedWords}</p>
      <p>процент правильных ответов за день: {medianePercent}</p>
    </StyledGameInfo>
  );
}
