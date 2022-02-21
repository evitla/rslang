import {
  shuffleArray,
  getRandomNumber,
  hasDuplicates,
  getRandomIntExcludingExistingNumbers,
} from '../../../utils';
import { TWord } from '../../../types';
import { WORDS_URL, TOTAL_QUESTIONS, TOTAL_ANSWERS } from '../../../constants';

export const fetchQuestion = async (group: number) => {
  const newWords: TWord[][] = [];

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const queries = `?group=${group}&page=${getRandomNumber(0, 29)}`;
    const data = await (await fetch(WORDS_URL + queries)).json();
    const answers: TWord[] = [];
    for (let j = 0; j < TOTAL_ANSWERS; j++) {
      const answer = {
        ...data[getRandomNumber(0, 19)],
      };
      if (hasDuplicates(answers, JSON.stringify(answer))) {
        j--;
      } else {
        answers.push(answer);
      }
    }
    newWords.push(shuffleArray(answers));
  }
  return newWords;
};

export const fetchFromBook = async (group: number, page: number) => {
  const newWords: TWord[][] = [];

  const queries = `?group=${group}&page=${page}`;
  const data = await (await fetch(WORDS_URL + queries)).json();
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const answers: TWord[] = [];
    const variant = { ...data[i] };
    answers.push(variant);
    for (let j = 0; j < TOTAL_ANSWERS - 1; j++) {
      const wrong = {
        ...data[getRandomIntExcludingExistingNumbers(0, 19, i)],
      };
      answers.push(wrong);
    }
    newWords.push(answers);
  }
  return newWords;
};
