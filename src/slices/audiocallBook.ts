import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAudiocallBook } from '../types';

const initialState: TAudiocallBook = {
  group: null,
  page: null,
};

const audioGameBookSlice = createSlice({
  name: 'audiocallBook',
  initialState,
  reducers: {
    setCurGroup: (state, { payload }: PayloadAction<number | null>) => {
      state.group = payload;
    },
    setCurPage: (state, { payload }: PayloadAction<number | null>) => {
      state.page = payload;
    },
  },
});

export const audiogameBookReducer = audioGameBookSlice.reducer;

export const { setCurGroup, setCurPage } = audioGameBookSlice.actions;
