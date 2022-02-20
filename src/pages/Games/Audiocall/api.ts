import { shuffleArray, getRandomNumber, hasDuplicates } from '../../../utils';
import { TWord } from '../../../types';
import { WORDS_URL, TOTAL_QUESTIONS, TOTAL_ANSWERS } from '../../../constants';
import { getRandomIntExcludingExistingNumbers } from '../../../utils';

export const fetchQuestion = async (group: number, page?: number) => {
  const newWords: TWord[][] = [];
  console.log('page', page);
  console.log('group', group);

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const queries = `?group=${group}&page=${
      page !== undefined ? page : getRandomNumber(0, 29)
    }`;
    console.log('group', queries);
    const data = await (await fetch(WORDS_URL + queries)).json();
    console.log('data', data);

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
