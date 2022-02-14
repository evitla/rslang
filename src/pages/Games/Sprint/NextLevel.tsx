import React from 'react';
import { useDispatch } from 'react-redux';
import { nextLevel } from '../../../slices/sprint';

export default function NextLevel() {
  const dispatch = useDispatch();
  function handler() {
    dispatch(nextLevel());
  }
  return (
    <div>
      <button onClick={handler} type="button">
        Продолжить
      </button>
    </div>
  );
}
