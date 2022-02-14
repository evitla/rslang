import React from 'react';
import { TAnswer } from '../../types';
import { FILES_URL } from '../../constants/index';
import { playAudio } from '../../utils';

const GameResult = ({ userAnswers }: { userAnswers: TAnswer[] }) => {
  const answers = userAnswers.map((answer) => {
    return (
      <tr key={answer.answer}>
        <td>{answer.questionAudio}</td>
        <td>{answer.question}</td>
        <td>{answer.transcript}</td>
        <td>{answer.correctAnswer}</td>
        <td>{answer.isCorrect ? '✔️' : '❌'}</td>
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
