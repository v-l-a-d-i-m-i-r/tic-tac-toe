import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { AuthUserModel } from '../models/auth-user';
import { getToken, setToken } from '../utils/localStorage';
import { signIn, signUp } from './authActions';

const accessToken = getToken();
const user = accessToken && jwtDecode<AuthUserModel>(accessToken);

const initialState = {
  loading: false,
  user,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.error = null;
      state.user = null;
    });

    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.user = jwtDecode(payload.accessToken);
      setToken(payload.accessToken);
    });

    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(signIn.pending, (state) => {
      state.error = null;
      state.user = null;
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.user = jwtDecode(payload.accessToken);
      setToken(payload.accessToken);
    });

    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const authReducer = authSlice.reducer;
