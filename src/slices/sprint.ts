import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWord } from '../types';
import { getRandomIntInclusive } from '../utils';

const initialState: {
  words: TWord[];
  group: number;
  page: number;
  score: number;
  rightInRow: number;
  status: 'prepare' | 'playing' | ' ended';
} = {
  words: [],
  group: 0,
  page: getRandomIntInclusive(),
  score: 0,
  rightInRow: 0,
  status: 'prepare',
};

const sprintGameSlice = createSlice({
  name: 'sprintGame',
  initialState,
  reducers: {
    setWords: (state, { payload }: PayloadAction<TWord[]>) => {
      state.words = payload;
    },
  },
});

export const sprintGameReducer = sprintGameSlice.reducer;

export const { setWords } = sprintGameSlice.actions;
