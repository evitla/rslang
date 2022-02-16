import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
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
    <StyledButton onClick={() => handler(level)} groupNum={level - 1}>
      {level}
    </StyledButton>
  );
};

export default function Difficuilt() {
  const levels = new Array(TOTAL_GROUPS).fill(0).map((el, index) => index + 1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <button className="back" type="button" onClick={() => navigate('/games')}>
        Вернуться к играм
      </button>
    </GamePreview>
  );
}
