import React from 'react';
import { TAnswer } from '../../types';

const GameResult = ({ userAnswers }: { userAnswers: TAnswer[] }) => {
  console.log('userAnswers', userAnswers);
  return <h2>Results</h2>;
};

export default GameResult;
