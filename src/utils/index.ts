import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {
  EASY_TO_LEARNED_COUNT,
  HARD_TO_LEARNED_COUNT,
  PAGES_AT_GROUP,
  USERS_URL,
} from '../constants';
import * as lodash from 'lodash';

import {
  GetOneExistedWordRes,
  GetOneWordRes,
  PlayedOptions,
  StatsState,
  TAuth,
  TUser,
  TUserWord,
} from '../types';

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
export const getUserStats = async (url: string, id = '') => {
  const response = await axios.get<StatsState>(`${url}${id}/statistics`);
  return response.data;
};

function changeWordDifficult(word: GetOneExistedWordRes) {
  const updatedWord = { ...word };
  const rightInRow = updatedWord.optional.isPlayed.rightInRow;
  let learned = updatedWord.optional.learned;
  let { difficulty } = updatedWord;
  if (difficulty === 'easy' && rightInRow === EASY_TO_LEARNED_COUNT) {
    learned = true;
  }

  if (difficulty === 'hard' && rightInRow === HARD_TO_LEARNED_COUNT) {
    learned = true;
    difficulty = 'easy';
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
    const response: GetOneWordRes = await getOne(URL, auth);
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
    console.log(updatedWord);
    updatedWord = changeWordDifficult(updatedWord);

    const { difficulty, optional } = updatedWord;
    await update(URL, { difficulty, optional }, auth);
  } catch (error) {
    const err = error as AxiosError;
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
      await create(URL, body, auth);
    }
  }
};
