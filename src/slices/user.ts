import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuth } from '../types';
import { getLocalStorage } from '../utils';

const initialState: {
  user: TAuth | null;
} = {
  user: getLocalStorage('user'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogin: (state, { payload }: PayloadAction<TAuth>) => {
      state.user = payload;
    },
    onLogout: (state) => {
      state.user = null;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { onLogin, onLogout } = userSlice.actions;
