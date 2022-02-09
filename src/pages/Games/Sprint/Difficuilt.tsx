import React from 'react';
import styled from 'styled-components';
import { TOTAL_GROUPS } from '../../../constants';

type LevelPropsType = PropsType & {
  numb: number;
};
const LevelWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const LevelButton = styled.button`
  width: 3rem;
`;

const Level = (props: LevelPropsType) => {
  const { numb, handler } = props;
  return (
    <LevelButton onClick={handler} className="sprint_level__button">
      {numb}
    </LevelButton>
  );
};

type PropsType = {
  handler: () => void;
};
export default function Difficuilt(props: PropsType) {
  const { handler } = props;

  const levels = new Array(TOTAL_GROUPS).fill(0).map((el, index) => index + 1);

  return (
    <div className="sprint_difficuilt">
      <h4>Выберите уровень сложности</h4>
      <LevelWrapper>
        {levels.map((level, index) => (
          <Level handler={handler} key={index} numb={level}></Level>
        ))}
      </LevelWrapper>
    </div>
  );
}
