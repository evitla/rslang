import React from 'react';
import { StyledButton } from './style';

const AudiocallButton = ({
  groupNum,
  startGame,
}: {
  groupNum: number;
  startGame: (groupID: number) => void;
}) => {
  return (
    <>
      <StyledButton onClick={() => startGame(groupNum)}>
        {groupNum + 1}
      </StyledButton>
    </>
  );
};

export default AudiocallButton;
