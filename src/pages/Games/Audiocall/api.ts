import useFetchWords from '../../../hooks/useFetchWords';
import { shuffleArray, getRandomNumber } from '../../../utils';
import { TWord } from '../../../types';

export type Question = TWord & {
  isRight: boolean;
};

export const fetchQuestion = async (group: number, page: number) => {
  const { words, isLoading, isError } = useFetchWords(group, page);
  if (!isLoading) {
    const rightAnswer = { ...words[getRandomNumber(0, 19)], isRight: true };
    const newWords: Question[] = [rightAnswer];
    for (let i = 0; i < 3; i++) {
      const wrongAnswer = {
        ...words[getRandomNumber(0, 19)],
        isRight: false,
      };
      if (rightAnswer.word === wrongAnswer.word) {
        console.log('rightAnswer', rightAnswer);
        console.log('wrongAnswer', wrongAnswer);
        console.log(i);
        i--;
      } else {
        newWords.push(wrongAnswer);
      }
    }
    return shuffleArray(newWords);
  }
};
