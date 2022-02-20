import { shuffleArray, getRandomNumber, hasDuplicates } from '../../../utils';
import { TWord } from '../../../types';
import { WORDS_URL, TOTAL_QUESTIONS, TOTAL_ANSWERS } from '../../../constants';

export const fetchQuestion = async (group: number, page?: number) => {
  const newWords: TWord[][] = [];
  console.log('group', group);
  console.log('page', page);
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const queries = `?group=${group}&page=${
      page !== undefined ? page : getRandomNumber(0, 29)
    }`;
    const data = await (await fetch(WORDS_URL + queries)).json();
    const answers: TWord[] = [];
    for (let j = 0; j < TOTAL_ANSWERS; j++) {
      const answer = { ...data[getRandomNumber(0, 19)] };
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
