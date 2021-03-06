import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioCallState, TAnswer, TWord } from '../types';

const initialState: AudioCallState = {
  questions: [],
  number: 0,
  userAnswers: [],
  score: 0,
  gameOver: true,
  qurrentQuestion: null,
  maxRightInRow: 0,
};

const audioGameSlice = createSlice({
  name: 'audiocall',
  initialState,
  reducers: {
    setQuestions: (state, { payload }: PayloadAction<TWord[][]>) => {
      state.questions = payload;
    },
    startNewGame: (state, { payload }: PayloadAction<AudioCallState>) => {
      Object.assign(state, payload);
    },
    setNumber: (state, { payload }: PayloadAction<number>) => {
      state.number = payload;
    },
    setUserAnswers: (state, { payload }: PayloadAction<TAnswer[]>) => {
      state.userAnswers = payload;
    },
    setScore: (state, { payload }: PayloadAction<number>) => {
      state.score = payload;
    },
    setGameOver: (state, { payload }: PayloadAction<boolean>) => {
      state.gameOver = payload;
    },
    setRightAnswer: (state) => {
      state.maxRightInRow += 1;
    },
    setWrongAnswer: (state) => {
      state.maxRightInRow = 0;
    },
    setCurQuestion: (state, { payload }: PayloadAction<TWord>) => {
      state.qurrentQuestion = payload;
    },
  },
});

export const audioGameReducer = audioGameSlice.reducer;

export const {
  setQuestions,
  setNumber,
  setUserAnswers,
  setScore,
  setGameOver,
  setCurQuestion,
  startNewGame,
  setRightAnswer,
  setWrongAnswer,
} = audioGameSlice.actions;
