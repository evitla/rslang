import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BONUS_POINTS, PAGES_AT_GROUP, POINTS } from '../constants';
import { Thistory, TsprintState, TWord } from '../types';
import { fiftyfifty } from '../utils';

const initialState: TsprintState = {
  words: [],
  group: 0,
  page: 0,
  score: 0,
  rightInRow: 0,
  status: 'prepare',
  currentWord: '',
  currentWordIndex: 0,
  history: [],
  currentWordId: '',
  isRight: false,
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
    setOptioins: (state, { payload }: PayloadAction<{ group: number }>) => {
      state.group = payload.group;
    },
    setCurrentWord: (
      state,
      { payload }: PayloadAction<{ word: string; id: string }>
    ) => {
      state.isRight = fiftyfifty();
      state.currentWord = payload.word;
    },
    setRightAnswer: (state) => {
      state.rightInRow += 1;
      if (state.rightInRow <= 2) {
        state.score += POINTS;
      } else {
        state.score += POINTS;
        state.score += BONUS_POINTS;
        state.rightInRow = 0;
      }
    },
    setWrongAnswer: (state) => {
      state.rightInRow = 0;
    },
    setCurrentWordIndex: (state, { payload }: PayloadAction<number>) => {
      state.currentWordIndex = payload;
    },
    setHistory: (state, { payload }: PayloadAction<Thistory>) => {
      state.history.push(payload);
    },
    resetGame: (state) => {
      state.status = 'prepare';
      state.history = [];
      state.score = 0;
      state.currentWordIndex = 0;
      state.currentWord = '';
      state.rightInRow = 0;
    },
    nextLevel: (state) => {
      state.status = 'playing';
      state.history = [];
      state.score = 0;
      state.currentWordIndex = 0;
      state.currentWord = '';
      state.rightInRow = 0;
      if (state.page < PAGES_AT_GROUP) state.page += 1;
    },
  },
});

export const sprintGameReducer = sprintGameSlice.reducer;

export const {
  setWords,
  setStatus,
  setOptioins,
  setCurrentWord,
  setRightAnswer,
  setCurrentWordIndex,
  setHistory,
  resetGame,
  nextLevel,
  setWrongAnswer,
} = sprintGameSlice.actions;
