import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWord } from '../types';

const initialState: {
  words: TWord[];
  group: number;
  page: number;
  score: number;
  rightInRow: number;
} = {
  words: [],
  group: 0,
  page: 0,
  score: 0,
  rightInRow: 0,
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
