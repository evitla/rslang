import * as lodash from 'lodash';
import { getUserStats, updateUserStats } from '.';
import { GetOneWordRes, UpdateStatsBody } from '../types';

function setTwoDigitNumDate(date: string) {
  if (date.length === 1) return '0' + date;
  return date;
}

export function createDateAsKey() {
  let currentDate = new Date(Date.now()).getDate().toLocaleString();
  let currentMouth = (new Date(Date.now()).getMonth() + 1).toLocaleString();
  currentDate = setTwoDigitNumDate(currentDate);
  currentMouth = setTwoDigitNumDate(currentMouth);
  return `${currentDate}.${currentMouth}`;
}

function changeLearnedFromGame(
  wordInfo: GetOneWordRes,
  stats: UpdateStatsBody
) {
  const statsCopy = lodash.cloneDeep(stats);
  const rightInRow: number = lodash.get(wordInfo, [
    'optional',
    'isPlayed',
    'rightInRow',
  ]);
  const learned: boolean = lodash.get(wordInfo, ['optional', 'learned']);
  if (rightInRow === 0 && learned) {
    const dateKey = createDateAsKey();
    const wordPath = ['optional', 'shortStats', 'words', dateKey, 'learned'];
    const todayLearnedWords: number = lodash.get(statsCopy, wordPath, 0);
    statsCopy.learnedWords += 1;
    lodash.set(statsCopy, wordPath, todayLearnedWords + 1);
  }
  return statsCopy;
}

function checkWordIsPlayed(wordInfo: GetOneWordRes) {
  const isPlayed = wordInfo.optional.isPlayed!;
  const rightTimes = isPlayed.rightTimes;
  const wrongTimes = isPlayed.wrongTimes;
  if (rightTimes === 1 && wrongTimes === 0) return false;
  if (rightTimes === 0 && wrongTimes === 1) return false;
  return true;
}

function changeNewWordsCount(
  state: UpdateStatsBody,
  wordPath: string[],
  gamepath: string[]
) {
  const todayNewWordsCount = lodash.get(state, [...wordPath, 'newWords'], 0);
  const todayGameNewWordsCount = lodash.get(
    state,
    [...gamepath, 'newWords'],
    0
  );
  lodash.set(state, [...wordPath, 'newWords'], todayNewWordsCount + 1);
  lodash.set(state, [...gamepath, 'newWords'], todayGameNewWordsCount + 1);
  return state;
}

function addAnswerToStats(
  stats: UpdateStatsBody,
  isRight: boolean,
  gamePath: string[]
) {
  const copy = lodash.cloneDeep(stats);
  const tries = lodash.get(copy, [...gamePath, 'tries'], 0);
  lodash.set(copy, [...gamePath, 'tries'], tries + 1);
  if (isRight) {
    const rightCount = lodash.get(copy, [...gamePath, 'rightCount'], 0);
    lodash.set(copy, [...gamePath, 'rightCount'], rightCount + 1);
  }
  return copy;
}

function changeRightInRow(
  stats: UpdateStatsBody,
  isRight: boolean,
  gamePath: string[]
) {
  const copy = lodash.cloneDeep(stats);
  const rightInRow: number = lodash.get(copy, [...gamePath, 'rightInRow'], 0);
  if (isRight) {
    const maxRightInRow: number = lodash.get(
      copy,
      [...gamePath, 'maxRightInRow'],
      0
    );
    lodash.set(copy, [...gamePath, 'rightInRow'], rightInRow + 1);

    if (rightInRow + 1 > maxRightInRow)
      lodash.set(copy, [...gamePath, 'maxRightInRow'], rightInRow + 1);
  } else lodash.set(copy, [...gamePath, 'rightInRow'], 0);
  return copy;
}

function changePercentStats(stats: UpdateStatsBody, dateKey: string) {
  const copy = lodash.cloneDeep(stats);
  const pathToSprint = ['optional', 'shortStats', 'games', 'sprint', dateKey];
  const pathToAudio = ['optional', 'shortStats', 'games', 'audiocall', dateKey];
  const sprintTries: number = lodash.get(copy, [...pathToSprint, 'tries'], 0);
  const audioTries: number = lodash.get(copy, [...pathToAudio, 'tries'], 0);
  const sprintRightCount: number = lodash.get(
    copy,
    [...pathToSprint, 'rightCount'],
    0
  );
  const audioRightCount: number = lodash.get(
    copy,
    [...pathToAudio, 'rightCount'],
    0
  );
  const totalPercent = Math.floor(
    ((sprintRightCount + audioRightCount) / (sprintTries + audioTries)) * 100
  );
  lodash.set(
    copy,
    ['optional', 'shortStats', 'words', dateKey, 'percent'],
    totalPercent
  );
  return copy;
}

export async function changeStatsFromBook(
  userId: string,
  token: string,
  isLearned: boolean
) {
  const state = await getUserStats(userId, token);
  const stateCopy = lodash.cloneDeep(state);
  const dateKey = createDateAsKey();
  const path = ['optional', 'shortStats', 'words', dateKey, 'learned'];
  const todayLearnedWords: number = lodash.get(stateCopy, path, 0);
  if (isLearned) {
    stateCopy.learnedWords += 1;
    lodash.set(stateCopy, path, todayLearnedWords + 1);
  } else {
    stateCopy.learnedWords -= 1;
    if (todayLearnedWords > 0) {
      lodash.set(stateCopy, path, todayLearnedWords - 1);
    }
  }
  await updateUserStats(userId, token, stateCopy);
}

export async function changeStatsFromGame(
  userId: string,
  token: string,
  wordInfo: GetOneWordRes,
  isRight: boolean,
  game: string
) {
  /* 
  1 загрузить статистику пользователя *
  2 загрузить информацию о текущем слове *
  3 проверить игралось ли слово ранее *
  4 изменить инфорамцию о статистике слов
  4.1 изменить количество новых слов *
  4.2 изменить количество правильных ответов *
  4.3 изменить количество правильных ответов подряд *
  4.4 изменить либо оставить как было learned *
  5 изменить статистику игры
  5.1 изменить либо оставить newWords *
  5.2 добавить попытку tries *
  5.3 изменить процент правильных ответов
  
  */
  const state = await getUserStats(userId, token);
  let stateCopy = lodash.cloneDeep(state);

  const dateKey = createDateAsKey();
  // 3 проверить игралось ли слово ранее *
  const isPlayed = checkWordIsPlayed(wordInfo);

  const wordsPath = ['optional', 'shortStats', 'words', dateKey];
  const gamePath = ['optional', 'shortStats', 'games', game, dateKey];
  // 4.1 изменить количество новых слов
  //  5.1 изменить либо оставить newWords
  if (!isPlayed)
    stateCopy = changeNewWordsCount(stateCopy, wordsPath, gamePath);
  // 4.2 изменить количество правильных ответов
  stateCopy = addAnswerToStats(stateCopy, isRight, gamePath);
  // 4.3 изменить количество правильных ответов подряд
  stateCopy = changeRightInRow(stateCopy, isRight, gamePath);
  // 4.4 изменить либо оставить как было learned
  stateCopy = changeLearnedFromGame(wordInfo, stateCopy);
  //  5.3 изменить процент правильных ответов
  stateCopy = changePercentStats(stateCopy, dateKey);
  await updateUserStats(userId, token, stateCopy);
}
