import axios from 'axios';

import { TAuth, TUser } from '../types';

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

export const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getLocalStorage = (key: string) => localStorage.getItem(key) ?? '';
