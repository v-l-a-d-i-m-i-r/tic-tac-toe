import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameModel } from '../models/game.model';
import { request } from '../utils/http';

type GetForPlayerResponse = {
  data: GameModel[];
};

type JoinGameInput = {
  gameId: string;
};

export const getForPlayer = createAsyncThunk(
  'games/getForPlayer',
  async (_, { rejectWithValue }) => {
    try {
      return await request<GetForPlayerResponse>({
        method: 'GET',
        url: '/api/v1/games/',
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createNewGame = createAsyncThunk(
  'games/createNewGame',
  async (_, { rejectWithValue }) => {
    try {
      return await request<GetForPlayerResponse>({
        method: 'POST',
        url: '/api/v1/games/',
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const joinGame = createAsyncThunk(
  'games/joinGame',
  async ({ gameId }: JoinGameInput, { rejectWithValue }) => {
    try {
      return await request<GetForPlayerResponse>({
        method: 'POST',
        url: `/api/v1/games/${gameId}/join`,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
