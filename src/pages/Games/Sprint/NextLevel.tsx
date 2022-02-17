import React from 'react';
import { useDispatch } from 'react-redux';
import { nextLevel } from '../../../slices/sprint';
import { ScoreButtonStyle } from './styles';

export default function NextLevel() {
  const dispatch = useDispatch();
  function handler() {
    dispatch(nextLevel());
  }
  return (
    <ScoreButtonStyle>
      <button onClick={handler} type="button">
        Продолжить
      </button>
    </ScoreButtonStyle>
  );
}
