import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserWord } from '../types';

const initialState: {
  userWords: TUserWord[] | null;
} = {
  userWords: null,
};

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    onSaveUserWords: (state, { payload }: PayloadAction<TUserWord[]>) => {
      state.userWords = payload;
    },

    onCreateUserWord: (state, { payload }: PayloadAction<TUserWord>) => {
      if (state.userWords !== null) state.userWords.push(payload);
    },

    onRemoveUserWord: (state, { payload }: PayloadAction<string>) => {
      if (state.userWords !== null)
        state.userWords = state.userWords.filter(
          (word) => word.wordId !== payload
        );
    },
  },
});

export const wordReducer = wordSlice.reducer;

export const { onSaveUserWords, onCreateUserWord, onRemoveUserWord } =
  wordSlice.actions;
