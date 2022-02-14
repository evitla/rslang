import React from 'react';
import { TAnswer } from '../../types';
import { FILES_URL } from '../../constants/index';
import { playAudio } from '../../utils';
import { StyledTable, ResultWrapper, TableWrapper } from './style';

const GameResult = ({ userAnswers }: { userAnswers: TAnswer[] }) => {
  const answers = userAnswers.map((answer) => {
    return (
      <tr key={answer.answer}>
        <td>
          <button
            type="button"
            onClick={async () => {
              await playAudio(`${FILES_URL}/${answer.questionAudio}`);
            }}
          >
            Play
          </button>
        </td>
        <td>{answer.question}</td>
        <td>{answer.transcript}</td>
        <td>{answer.correctAnswer}</td>
        <td>{answer.isCorrect ? '✔️' : '❌'}</td>
      </tr>
    );
  });
  return (
    <ResultWrapper>
      <h3>Результаты</h3>
      <TableWrapper>
        <StyledTable>
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
        </StyledTable>
      </TableWrapper>
    </ResultWrapper>
  );
};

export default GameResult;
