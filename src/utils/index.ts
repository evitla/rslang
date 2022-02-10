import axios from 'axios';

import { TAuth, TUser, TWord } from '../types';

export const getAll = async <T>(url: string, queryParams = ''): Promise<T> => {
  const response = await axios.get(`${url}${queryParams}`);
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

export const create = async <T>(url: string, body: T): Promise<T> => {
  const response = await axios.post(url, body);
  return response.data;
};

export const loginUser = async (url: string, user: TUser): Promise<TAuth> => {
  const response = await axios.post(url, user);
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

export const shuffleArray = (array: TWord[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const hasDuplicates = (array: TWord[], newel: string) => {
  const newArr = [...array].map((el) => JSON.stringify(el));
  return newArr.includes(newel);
};
