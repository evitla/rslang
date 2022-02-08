import React from 'react';
import { StyledAnswer } from './style';
import { TWord } from '../../types';

const AudiocallAnswer = ({ word }: { word: TWord }) => {
  return (
    <>
      <StyledAnswer>{word.word}</StyledAnswer>
    </>
  );
};

export default AudiocallAnswer;
