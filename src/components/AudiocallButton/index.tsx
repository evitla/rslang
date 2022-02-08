import React from 'react';
import { StyledButton } from './style';

const AudiocallButton = ({
  groupNum,
  setGame,
}: {
  groupNum: number;
  setGame: (groupID: number) => void;
}) => {
  return (
    <>
      <StyledButton onClick={() => setGame(groupNum)}>{groupNum}</StyledButton>
    </>
  );
};

export default AudiocallButton;
