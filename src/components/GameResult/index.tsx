import React from 'react';
import { TAnswer } from '../../types';

const GameResult = ({ userAnswers }: { userAnswers: TAnswer[] }) => {
  const answers = userAnswers.map((answer) => {
    return (
      <tr key={answer.answer}>
        <td>Sound</td>
        <td>{answer.question}</td>
        <td>transcript</td>
        <td>{answer.correctAnswer}</td>
        <td>{answer.isCorrect ? 'Right' : 'Not Right'}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>{answers}</tbody>
    </table>
  );
};

export default GameResult;
