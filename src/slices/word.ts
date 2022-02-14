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

    onUpdateUserWord: (state, { payload }: PayloadAction<TUserWord>) => {
      if (state.userWords === null) return;
      const wordIndex = state.userWords.findIndex(
        (word) => word.id === payload.id
      );
      if (wordIndex === -1) {
        state.userWords.push(payload);
      } else {
        Object.assign(state.userWords[wordIndex], payload);
      }
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

export const { onSaveUserWords, onUpdateUserWord, onRemoveUserWord } =
  wordSlice.actions;
