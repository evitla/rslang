import useFetchWords from '../../../hooks/useFetchWords';
import { shuffleArray, getRandomNumber, getAll } from '../../../utils';
import { TWord } from '../../../types';
import { WORDS_URL } from '../../../constants';

export type Question = TWord & {
  isRight: boolean;
};

export const fetchQuestion = async (group: number) => {
  const newWords: Question[][] = [];
  for (let i = 0; i < 20; i++) {
    const queries = `?group=${group}&page=${getRandomNumber(0, 29)}`;
    const data = await (await fetch(WORDS_URL + queries)).json();
    const rightAnswer: Question[] = [
      { ...data[getRandomNumber(0, 19)], isRight: true },
    ];
    for (let j = 0; j < 3; j++) {
      const wrongAnswer = {
        ...data[getRandomNumber(0, 19)],
        isRight: false,
      };
      if (rightAnswer[0].word === wrongAnswer.word) {
        j--;
      } else {
        rightAnswer.push(wrongAnswer);
      }
    }
    newWords.push(shuffleArray(rightAnswer));
  }
  return newWords;
};
