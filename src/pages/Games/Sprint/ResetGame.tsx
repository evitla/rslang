import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../../../slices/sprint';
import { ScoreButtonStyle } from './styles';

export default function ResetGame() {
  const dispatch = useDispatch();
  function handler() {
    dispatch(resetGame());
  }
  return (
    <ScoreButtonStyle>
      <button onClick={handler} type="button">
        ResetGame
      </button>
    </ScoreButtonStyle>
  );
}
