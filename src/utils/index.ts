import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
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
  GetOneWordRes,
  GetUserStatsResponse,
  PlayedOptions,
  ShortStatsGameType,
  TAuth,
  TUser,
  TUserWord,
  UpdateStatsBody,
} from '../types';

export const getAll = async (
  url: string,
  navigate: (_: string) => void = () => { },
  setIsAuthFormOpen: (_: boolean) => void = () => { },
  config: AxiosRequestConfig = {}
) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      setIsAuthFormOpen(true);
      navigate('/');
    }
  }
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
  const rightInRow = word.optional.isPlayed.rightInRow;
  const learned = word.optional.learned;
  const { difficulty } = word;
  if (
    !learned &&
    difficulty === 'easy' &&
    rightInRow > 0 &&
    rightInRow % EASY_TO_LEARNED_COUNT === 0
  ) {
    word.optional.isPlayed.rightInRow = 0;
    word.optional.learned = true;
  }

  if (
    !learned &&
    difficulty === 'hard' &&
    rightInRow > 0 &&
    rightInRow % HARD_TO_LEARNED_COUNT === 0
  ) {
    word.optional.isPlayed.rightInRow = 0;
    word.optional.learned = true;
    word.difficulty = 'easy';
  }
  return word;
}

function toggleWordLearned(word: GetOneExistedWordRes, answer: boolean) {
  const updatedWord = { ...word };

  const isPlayed: PlayedOptions = lodash.get(updatedWord, 'optional.isPlayed');
  if (!answer) {
    isPlayed.rightInRow = 0;
    updatedWord.optional.learned = false;
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
  right: boolean,
  navigate: (_: string) => void = () => { },
  setIsAuthFormOpen: (_: boolean) => void = () => { }
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
    if (right) {
      options.rightTimes += 1;
      options.rightInRow += 1;
    } else {
      options.wrongTimes += 1;
      response.optional.learned = false;
    }

    let updatedWord: GetOneExistedWordRes = {
      ...response,
      optional: { ...response.optional, isPlayed: options },
    };

    updatedWord = toggleWordLearned(updatedWord, right);
    updatedWord = changeWordDifficult(updatedWord);

    updatedWord.optional.isPlayed = options;
    const { difficulty, optional } = updatedWord;
    const updatedProm: AxiosResponse<GetOneWordRes> = await axios.put(
      URL,
      { difficulty, optional },
      auth
    );
    return updatedProm.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log('-----------------------');
    console.log(err);
    console.log('-----------------------');
    if (err.response?.status === 404) {
      const body: TUserWord = {
        difficulty: 'easy',
        optional: {
          learned: false,
          isPlayed: {
            rightTimes: right ? 1 : 0,
            wrongTimes: right ? 0 : 1,
            rightInRow: right ? 1 : 0,
          },
        },
      };
      const createProm: AxiosResponse<GetOneWordRes> = await axios.post(
        URL,
        body,
        auth
      );
      return createProm.data;
    } else if (err.response?.status === 401) {
      navigate('/');
      setIsAuthFormOpen(true);
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

export function createDefaultStatsBody(): UpdateStatsBody {
  return {
    learnedWords: 0,
    optional: {
      shortStats: {
        games: {
          sprint: {},
          audiocall: {},
        },
        words: {},
      },
    },
  };
}
export const getUserStats = async (userId: string, token: string) => {
  try {
    const URL = `${USERS_URL}/${userId}/statistics`;
    const auth = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<GetUserStatsResponse>(URL, auth);
    const responseData = lodash.cloneDeep(response.data);
    const result: UpdateStatsBody = lodash.omit(responseData, 'id');
    return result;
  } catch (error) {
    return createDefaultStatsBody();
  }
};
export const updateUserStats = async (
  userId: string,
  token: string,
  body: UpdateStatsBody
) => {
  const URL = `${USERS_URL}/${userId}/statistics`;
  const auth = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await axios.put<UpdateStatsBody>(URL, body, auth);
};

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
  5.3 изменить серию правильных ответов
  
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

  // const todayLearnedWords: number = lodash.get(stateCopy, wordsPath, 0);
  // const gamseStats: GamseStatsType = lodash.get(stateCopy, gamePath, {});

  await updateUserStats(userId, token, stateCopy);
}

export function extractStatsByDate(gameStats: ShortStatsGameType) {
  const copy = lodash.cloneDeep(gameStats);
  let currentDate = new Date(Date.now()).getDate().toLocaleString();
  let currentMouth = (new Date(Date.now()).getMonth() + 1).toLocaleString();
  currentDate = setTwoDigitNumDate(currentDate);
  currentMouth = setTwoDigitNumDate(currentMouth);
  const dayWithMonth = createDateAsKey();
}
