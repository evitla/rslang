import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatsState } from '../types';

const initialState: StatsState = {
  games: {
    sprint: {
      newWords: 0,
      persentRight: 0,
      rightInRow: 0,
    },
    audiocall: {
      newWords: 0,
      persentRight: 0,
      rightInRow: 0,
    },
  },
  learnedWords: 0,
  totalRightPercent: 0,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    loadStats: (state, { payload }: PayloadAction<StatsState>) => {
      Object.assign(state, payload);
    },
  },
});

export const statsReducer = statsSlice.reducer;

export const { loadStats } = statsSlice.actions;
