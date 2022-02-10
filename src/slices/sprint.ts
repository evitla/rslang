import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TsprintState, TWord } from '../types';
import { getRandomIntInclusive } from '../utils';

const initialState: TsprintState = {
  words: [],
  group: 0,
  page: getRandomIntInclusive(),
  score: 0,
  rightInRow: 0,
  status: 'prepare',
  currentWord: '',
};

const sprintGameSlice = createSlice({
  name: 'sprintGame',
  initialState,
  reducers: {
    setWords: (state, { payload }: PayloadAction<TWord[]>) => {
      state.words = payload;
    },
    setStatus: (state, { payload }: PayloadAction<TsprintState['status']>) => {
      state.status = payload;
    },
    setOprioins: (state, { payload }: PayloadAction<{ group: number }>) => {
      state.group = payload.group;
    },
    setCurrentWord: (state, { payload }: PayloadAction<string>) => {
      state.currentWord = payload;
    },
  },
});

export const sprintGameReducer = sprintGameSlice.reducer;

export const { setWords, setStatus, setOprioins } = sprintGameSlice.actions;
