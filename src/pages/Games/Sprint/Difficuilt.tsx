import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TOTAL_GROUPS } from '../../../constants';
import { setOprioins, setStatus } from '../../../slices/sprint';

type LevelPropsType = {
  level: number;
  handler: (category: number) => void;
};
const LevelWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const LevelButton = styled.button`
  width: 3rem;
`;

const Level = (props: LevelPropsType) => {
  const { level, handler } = props;
  return (
    <LevelButton
      onClick={() => handler(level)}
      className="sprint_level__button"
    >
      {level}
    </LevelButton>
  );
};

export default function Difficuilt() {
  const levels = new Array(TOTAL_GROUPS).fill(0).map((el, index) => index + 1);
  const dispatch = useDispatch();

  async function handler(group: number) {
    dispatch(setOprioins({ group: group - 1 }));
    dispatch(setStatus('playing'));
  }
  return (
    <div className="sprint_difficuilt">
      <h4>Выберите уровень сложности</h4>
      <LevelWrapper>
        {levels.map((level, index) => (
          <Level handler={handler} key={index} level={level}></Level>
        ))}
      </LevelWrapper>
    </div>
  );
}
