import { TAuth, TUser } from '../types';

export const getAll = async <T>(url: string, queryParams = ''): Promise<T> => {
  const response = await fetch(`${url}${queryParams}`);
  const data = await response.json();
  return data;
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
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const loginUser = async (url: string, user: TUser): Promise<TAuth> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getLocalStorage = (key: string) => localStorage.getItem(key) ?? '';
