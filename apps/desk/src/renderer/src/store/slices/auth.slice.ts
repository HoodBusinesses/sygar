import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AuthPayloadType = {
  isAuth: boolean;
  token: string | null;
};

export interface AuthSliceType {
  auth: AuthPayloadType;
}

const initialState: AuthSliceType = {
  auth: { isAuth: false, token: localStorage.getItem('token') },
};

const authSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setIsAuth: (state: AuthSliceType, { payload }: PayloadAction<boolean>) => {
      state.auth.isAuth = payload;
    },
    setToken: (
      state: AuthSliceType,
      { payload: token }: PayloadAction<string>
    ) => {
      state.auth.token = token;
    },
    reset: () => ({ auth: { isAuth: false, token: null } }),
  },
});

export const { setIsAuth, setToken, reset: resetAuth } = authSlice.actions;

export default authSlice.reducer;
