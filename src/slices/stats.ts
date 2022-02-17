import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateStatsBody } from '../types';

const initialState: UpdateStatsBody = {
  learnedWords: 0,
  optional: {
    shortStats: {
      games: {
        audiocall: [],
        sprint: [],
      },
    },
  },
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    loadStats: (state, { payload }: PayloadAction<UpdateStatsBody>) => {
      Object.assign(state, payload);
    },
  },
});

export const statsReducer = statsSlice.reducer;

export const { loadStats } = statsSlice.actions;
