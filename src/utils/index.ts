import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {
  AUTH_TOTAL_GROUPS,
  EASY_TO_LEARNED_COUNT,
  HARD_TO_LEARNED_COUNT,
  PAGES_AT_GROUP,
  START_GROUP,
  START_PAGE,
  TOTAL_GROUPS,
  USERS_URL,
} from '../constants';
import * as lodash from 'lodash';

import {
  GetOneExistedWordRes,
  GamseStatsType,
  GamseStatsWithDate,
  GetOneWordRes,
  PlayedOptions,
  ShortStatsGameType,
  TAuth,
  TUser,
  TUserWord,
  UpdateStatsBody,
} from '../types';
import { stat } from 'fs';

export const getAll = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T[]> => {
  const response = await axios.get(url, config);
  return response.data;
};

export const getOne = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const response = await axios.get(url, config);
  return response.data;
};

export const playAudio = (src: string) => {
  return new Promise((res) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();

    audio.onended = () => {
      audio.currentTime = 0;
      res('ended');
    };
  });
};

export const create = async <T>(
  url: string,
  body: T,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const response = await axios.post(url, body, config);
  return response.data;
};

export const loginUser = async (url: string, user: TUser): Promise<TAuth> => {
  const response = await axios.post(url, user);
  return response.data;
};

export const remove = async (url: string, config: AxiosRequestConfig = {}) => {
  await axios.delete(url, config);
};

export const update = async <T>(
  url: string,
  body: T,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const response = await axios.put(url, body, config);
  return response.data;
};

export const setLocalStorage = <T>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorage = <T>(key: string) => {
  const value = localStorage.getItem(key);

  return value !== null ? (JSON.parse(value) as T) : null;
};

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const shuffleArray = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

export const hasDuplicates = <T>(array: T[], newel: string): boolean => {
  const newArr = [...array].map((el) => JSON.stringify(el));
  return newArr.includes(newel);
};

export function getRandomIntInclusive(start = 0, end = PAGES_AT_GROUP) {
  //Максимум и минимум включаются
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
export function getRandomIntExcludingExistingNumbers(
  start: number,
  end: number,
  exclude: number
) {
  //случайное число, с исключением
  let random = Math.floor(Math.random() * (end - start + 1)) + start;
  if (random === exclude && exclude < end) random = random + 1;
  else if (random === exclude && exclude === end) random = random - 1;
  return random;
}

export function fiftyfifty() {
  const result = Math.random();
  return result > 0.5;
}

function changeWordDifficult(word: GetOneExistedWordRes) {
  const updatedWord = { ...word };
  const rightInRow = updatedWord.optional.isPlayed.rightInRow;
  const { difficulty } = updatedWord;
  if (difficulty === 'easy' && rightInRow === EASY_TO_LEARNED_COUNT) {
    updatedWord.optional.learned = true;
  }

  if (difficulty === 'hard' && rightInRow === HARD_TO_LEARNED_COUNT) {
    updatedWord.optional.learned = true;
    updatedWord.difficulty = 'easy';
  }
  return updatedWord;
}

function toggleWordLearned(word: GetOneExistedWordRes, answer: boolean) {
  const updatedWord = { ...word };

  const isPlayed: PlayedOptions = lodash.get(updatedWord, 'optional.isPlayed');
  if (!answer) {
    isPlayed.rightInRow = 0;
    isPlayed.wrongTimes += 1;
    updatedWord.optional.learned = false;
  } else {
    isPlayed.rightTimes += 1;
    isPlayed.rightInRow += 1;
  }
  return updatedWord;
}

async function getOneUserWord(
  userId: string,
  currWordId: string,
  token: string
) {
  const URL = `${USERS_URL}/${userId}/words/${currWordId}`;
  const auth = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response: GetOneWordRes = await getOne(URL, auth);
  return response;
}
export const updateWordProgress = async (
  userId: string,
  currWordId: string,
  token: string,
  right: boolean
) => {
  const URL = `${USERS_URL}/${userId}/words/${currWordId}`;
  const auth = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const defaultOptions: PlayedOptions = {
    rightTimes: 0,
    wrongTimes: 0,
    rightInRow: 0,
  };
  try {
    const response: GetOneWordRes = await getOneUserWord(
      userId,
      currWordId,
      token
    );
    const options: PlayedOptions = lodash.get(
      response,
      'optional.isPlayed',
      defaultOptions
    );
    let updatedWord: GetOneExistedWordRes = {
      ...response,
      optional: { ...response.optional, isPlayed: options },
    };

    updatedWord = toggleWordLearned(updatedWord, right);
    updatedWord = changeWordDifficult(updatedWord);
    if (right) options.rightTimes += 1;
    else {
      options.wrongTimes += 1;
      response.optional.learned = right;
    }
    response.optional.isPlayed = options;
    const { difficulty, optional } = response;
    await update(URL, { difficulty, optional }, auth);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 404) {
      const body: TUserWord = {
        difficulty: 'easy',
        optional: {
          learned: right,
          isPlayed: {
            rightTimes: right ? 1 : 0,
            wrongTimes: right ? 0 : 1,
            rightInRow: right ? 1 : 0,
          },
        },
      };
      await create(URL, body, auth);
    }
  }
};
export const defineColor = (groupId: number, opacity = '') => {
  switch (groupId) {
    case 0:
      return `#577590${opacity}`;
    case 1:
      return `#43aa8b${opacity}`;
    case 2:
      return `#90be6d${opacity}`;
    case 3:
      return `#f9c74f${opacity}`;
    case 4:
      return `#f8961e${opacity}`;
    case 5:
      return `#f3722c${opacity}`;
    default:
      return `#f94144${opacity}`;
  }
};

export const isValidPageAndGroup = (
  page: number,
  group: number,
  isAuth: boolean
) => {
  return (
    Number.isNaN(page) ||
    Number.isNaN(group) ||
    page < START_PAGE ||
    page > PAGES_AT_GROUP ||
    group < START_GROUP ||
    group > (isAuth ? AUTH_TOTAL_GROUPS : TOTAL_GROUPS)
  );
};

export const getUserStats = async (userId: string, token: string) => {
  try {
    const URL = `${USERS_URL}/${userId}/statistics}`;
    const auth = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<UpdateStatsBody>(URL, auth);
    return response.data;
  } catch (error) {
    return {
      learnedWords: 0,
      optional: {
        shortStats: {
          games: {
            audiocall: [],
            sprint: [],
          },
        },
      },
    };
  }
};

function setTwoDigitNumDate(date: string) {
  if (date.length === 1) return '0' + date;
  return date;
}

function createDateAsKey() {
  let currentDate = new Date(Date.now()).getDate().toLocaleString();
  let currentMouth = (new Date(Date.now()).getMonth() + 1).toLocaleString();
  currentDate = setTwoDigitNumDate(currentDate);
  currentMouth = setTwoDigitNumDate(currentMouth);
  return `${currentDate}.${currentMouth}`;
}

function checkWordIsLearned(wordInfo: GetOneWordRes) {
  try {
    return wordInfo.optional.learned;
  } catch (error) {
    return false;
  }
}
function checkWordIsPlayed(wordInfo: GetOneWordRes) {
  try {
    const isPlayed = wordInfo.optional.isPlayed!;
    if (isPlayed?.rightTimes > 0 || isPlayed?.wrongTimes > 0) return true;
    return false;
  } catch (error) {
    return false;
  }
}
function increasePlayedStat(stateCopy: UpdateStatsBody, currentDayKey: string) {
  const pathToWords = ['optional', 'shortStats', 'words', currentDayKey];
  const playedWordsCount: number = lodash.get(stateCopy, pathToWords, 0);

  lodash.set(stateCopy, pathToWords, playedWordsCount + 1);
  return stateCopy;
}

function addAnswerToStats(stats: GamseStatsType, isRight: boolean) {
  const copy = { ...stats };
  copy.tries += 1;
  const totalRightAnswers = Math.round(copy.rightPercent * copy.tries);

  if (isRight) {
    const newPercent = Math.round((totalRightAnswers + 1) / copy.tries);

    copy.rightPercent = newPercent;
  } else {
    const newPercent = Math.round(totalRightAnswers / copy.tries);
    console.log(newPercent);
    copy.rightPercent = newPercent;
  }
  return copy;
}

export async function createStatsBody(
  state: UpdateStatsBody,
  userId: string,
  wordId: string,
  token: string,
  game?: {
    isRight: boolean;
    rightInRow: number;
    gameName: 'sprint' | 'audiocall';
  }
) {
  const response: GetOneWordRes = await getOneUserWord(userId, wordId, token);

  const isLearned = checkWordIsLearned(response);
  const isPlayed = checkWordIsPlayed(response);
  let stateCopy = lodash.cloneDeep(state);
  const currentDayKey = createDateAsKey();

  if (!isLearned) {
    stateCopy.learnedWords += 1;
  }
  if (!isPlayed)
    lodash.set(
      stateCopy,
      ['optional', 'shortStats', 'words', currentDayKey],
      1
    );

  stateCopy = increasePlayedStat(stateCopy, currentDayKey);
  if (game) {
    const pathToGames = ['optional', 'shortStats', 'games'];
    let curGameStats: GamseStatsWithDate[] = lodash.get(
      stateCopy,
      [...pathToGames, game.gameName],
      0
    );
    const dateIsExist = curGameStats.find((date) => {
      return lodash.has(date, currentDayKey);
    });
    let curDateStats: GamseStatsWithDate;
    if (dateIsExist) {
      curDateStats = dateIsExist;
    } else {
      curDateStats = {};
      curDateStats[currentDayKey] = {
        newWords: 1,
        rightInRow: 0,
        rightPercent: game.isRight ? 100 : 0,
        tries: 0,
      };
    }
    curDateStats[currentDayKey] = addAnswerToStats(
      curDateStats[currentDayKey],
      game.isRight
    );
    curGameStats = [
      ...curGameStats,
      {
        [currentDayKey]: curDateStats[currentDayKey],
      },
    ];
    stateCopy.optional.shortStats.games![game.gameName] = curGameStats;
  }
  return stateCopy;
}
export const updateUserStats = async (
  userId: string,
  token: string,
  body: UpdateStatsBody
) => {
  const URL = `${USERS_URL}/${userId}/statistics`;
  const auth = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put<UpdateStatsBody>(URL, body, auth);
  return response.data;
};

export function extractStatsByDate(gameStats: ShortStatsGameType) {
  const copy = { ...gameStats };
  let currentDate = new Date(Date.now()).getDate().toLocaleString();
  let currentMouth = (new Date(Date.now()).getMonth() + 1).toLocaleString();
  currentDate = setTwoDigitNumDate(currentDate);
  currentMouth = setTwoDigitNumDate(currentMouth);
  const dayWithMonth = createDateAsKey();
  const result: ShortStatsGameType = {};

  lodash.forOwn(copy, (gamesValue, game) => {
    gamesValue?.map((el) => {
      lodash.forOwn(el, (gameInfo, gameDate) => {
        if (gameDate === dayWithMonth) lodash.set(result, game, gameInfo);
      });
    });
  });

  return result;
}
