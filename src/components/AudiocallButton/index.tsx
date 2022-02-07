import React from 'react';
import { StyledButton } from './style';

const AudiocallButton = ({ groupNum }: { groupNum: number }) => {
  return (
    <>
      <StyledButton>{groupNum}</StyledButton>
    </>
  );
};

export default AudiocallButton;
