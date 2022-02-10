import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../store';

export default function Guess() {
  const { currentWord } = useSelector(
    (state: TStore) => state.sprintGameReducer
  );

  return <div>{currentWord}</div>;
}
