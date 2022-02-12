import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../../../slices/sprint';

export default function ResetGame() {
  const dispatch = useDispatch();
  function handler() {
    dispatch(resetGame());
  }
  return (
    <div>
      <button onClick={handler} type="button">
        ResetGame
      </button>
    </div>
  );
}
