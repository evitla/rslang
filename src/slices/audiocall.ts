import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioCallState, TAnswer, TWord } from '../types';

const initialState: AudioCallState = {
  questions: [],
  number: 0,
  userAnswers: [],
  score: 0,
  gameOver: true,
  qurrentQuestion: null,
};

const audioGameSlice = createSlice({
  name: 'audiocall',
  initialState,
  reducers: {
    setQuestions: (state, { payload }: PayloadAction<TWord[][]>) => {
      state.questions = payload;
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
} = audioGameSlice.actions;
