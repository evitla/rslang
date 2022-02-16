import React from 'react';
import { useDispatch } from 'react-redux';
import { TOTAL_GROUPS } from '../../../constants';
import { setOptioins, setStatus } from '../../../slices/sprint';
import { LevelButton, LevelWrapper } from './styles';
import { GamePreview } from '../Audiocall/style';
import { StyledButton } from '../../../components/AudiocallButton/style';
type LevelPropsType = {
  level: number;
  handler: (category: number) => void;
};

const Level = (props: LevelPropsType) => {
  const { level, handler } = props;
  return (
    <StyledButton
      onClick={() => handler(level)}
      className="sprint_level__button"
      groupNum={level - 1}
    >
      {level}
    </StyledButton>
  );
};

export default function Difficuilt() {
  const levels = new Array(TOTAL_GROUPS).fill(0).map((el, index) => index + 1);
  const dispatch = useDispatch();

  async function handler(group: number) {
    dispatch(setOptioins({ group: group - 1 }));
    dispatch(setStatus('playing'));
  }
  return (
    <GamePreview>
      <h2>Выберите уровень сложности</h2>
      <div className="btns-wrapper">
        {levels.map((level, index) => (
          <Level handler={handler} key={index} level={level}></Level>
        ))}
      </div>
    </GamePreview>
  );
}
