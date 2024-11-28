import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Role = 'Owner' | 'Admin' | 'User';

export type UserType = 'ORGANIZATION_USER' | 'SOLUTION_OWNER';
export type AuthPayloadType = {
  isAuth: boolean;
  token: string | null;
  userId: string;
  organizationId: string;
  isAccountActivated: boolean;
  role: Role;
  userType: UserType;
};

export interface AuthSliceType {
  auth: AuthPayloadType;
}

const initialState: AuthSliceType = {
  auth: {
    isAuth: false,
    token: localStorage.getItem('token'),
    userId: '',
    organizationId: '',
    role: 'User',
    userType: 'ORGANIZATION_USER',
    isAccountActivated: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
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
    setUserData: (
      state: AuthSliceType,
      { payload }: PayloadAction<Partial<AuthPayloadType>>
    ) => {
      state.auth = { ...state.auth, ...payload };
    },
    reset: () => ({
      auth: {
        isAuth: false,
        token: null,
        userId: '',
        organizationId: '',
        role: 'User' as Role,
        userType: 'ORGANIZATION_USER' as UserType,
        isAccountActivated: false,
      },
    }),
  },
});

export const {
  setIsAuth,
  setToken,
  setUserData,
  reset: resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
