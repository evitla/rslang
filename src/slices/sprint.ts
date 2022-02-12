import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thistory, TsprintState, TWord } from '../types';
import { getRandomIntInclusive } from '../utils';

const initialState: TsprintState = {
  words: [],
  group: 0,
  page: getRandomIntInclusive(),
  score: 0,
  rightInRow: 0,
  status: 'prepare',
  currentWord: '',
  currentWordIndex: 0,
  history: [],
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
    setRightAnswer: (state) => {
      if (state.rightInRow <= 2) {
        state.score += 20;
        state.rightInRow += 1;
      } else {
        state.score += 40;
        state.rightInRow = 0;
      }
    },
    setCurrentWordIndex: (state, { payload }: PayloadAction<number>) => {
      state.currentWordIndex = payload;
    },
    setHistory: (state, { payload }: PayloadAction<Thistory>) => {
      state.history.push(payload);
    },
    resetGame: (state) => {
      state.status = 'playing';
      state.history = [];
      state.score = 0;
      state.currentWordIndex = 0;
      state.currentWord = '';
      state.rightInRow = 0;
    },
  },
});

export const sprintGameReducer = sprintGameSlice.reducer;

export const {
  setWords,
  setStatus,
  setOprioins,
  setCurrentWord,
  setRightAnswer,
  setCurrentWordIndex,
  setHistory,
  resetGame,
} = sprintGameSlice.actions;
