import {
  shuffleArray,
  getRandomNumber,
  hasDuplicates,
  getRandomIntExcludingExistingNumbers,
} from '../../../utils';
import { TWord } from '../../../types';
import {
  WORDS_URL,
  TOTAL_QUESTIONS,
  TOTAL_ANSWERS,
  MIN_PAGE,
  MAX_PAGE,
  MIN_INDEX_WORD,
  MAX_INDEX_WORD,
} from '../../../constants';

export const fetchQuestion = async (group: number) => {
  const newWords: TWord[][] = [];

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const queries = `?group=${group}&page=${getRandomNumber(
      MIN_PAGE,
      MAX_PAGE
    )}`;
    const data = await (await fetch(WORDS_URL + queries)).json();
    const answers: TWord[] = [];
    for (let j = 0; j < TOTAL_ANSWERS; j++) {
      const answer = {
        ...data[getRandomNumber(MIN_INDEX_WORD, MAX_INDEX_WORD)],
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
    answers.push({ ...data[i] });

    for (let j = 0; j < TOTAL_ANSWERS - 1; j++) {
      const wrong = {
        ...data[
          getRandomIntExcludingExistingNumbers(
            MIN_INDEX_WORD,
            MAX_INDEX_WORD,
            i
          )
        ],
      };
      if (hasDuplicates(answers, JSON.stringify(wrong))) {
        j--;
      } else {
        answers.push(wrong);
      }
    }
    newWords.push(answers);
  }
  return newWords;
};
