import { shuffleArray, getRandomNumber, hasDuplicates } from '../../../utils';
import { TWord } from '../../../types';
import { WORDS_URL } from '../../../constants';

export const fetchQuestion = async (group: number) => {
  const newWords: TWord[][] = [];
  for (let i = 0; i < 20; i++) {
    const queries = `?group=${group}&page=${getRandomNumber(0, 29)}`;
    const data = await (await fetch(WORDS_URL + queries)).json();
    const answers: TWord[] = [];
    for (let j = 0; j < 4; j++) {
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
