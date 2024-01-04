import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../utils/http';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (input: SignUpInput, { rejectWithValue }) => {
    try {
      return await request<{ accessToken: string }>({
        method: 'POST',
        url: '/api/v1/auth/sign-up',
        data: input,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (input: SignInInput, { rejectWithValue }) => {
    try {
      return await request<{ accessToken: string }>({
        method: 'POST',
        url: '/api/v1/auth/sign-in',
        data: input,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

type SignInInput = {
  email: string;
  password: string;
};
