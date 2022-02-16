import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TAnswer } from '../../types';
import { FILES_URL } from '../../constants/index';
import { playAudio } from '../../utils';
import { StyledTable, ResultWrapper, TableWrapper } from './style';
import soundSVG from '../../assets/images/sound.svg';

const GameResult = ({ userAnswers }: { userAnswers: TAnswer[] }) => {
  const navigate = useNavigate();
  const answers = userAnswers.map((answer) => {
    return (
      <tr key={answer.answer}>
        <td>
          <button
            className="play-sound"
            type="button"
            onClick={async () => {
              await playAudio(`${FILES_URL}/${answer.questionAudio}`);
            }}
          >
            <img className="img" src={soundSVG} alt="" />
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
      <button
        className="back-to-games"
        type="button"
        onClick={() => navigate('/games')}
      >
        Вернуться к играм
      </button>
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
