import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameModel } from '../models/game.model';
import { request } from '../utils/http';
import { socket } from '../utils/socket';

export const getById = createAsyncThunk(
  'game/getById',
  async ({ gameId }: GetGameByIdInput, { rejectWithValue }) => {
    try {
      return await request<GetGameByIdResponse>({
        method: 'GET',
        url: `/api/v1/games/${gameId}`,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const makeStep = createAsyncThunk(
  'game/makeStep',
  async ({ gameId, cell }: MakeStepInput, { rejectWithValue }) => {
    try {
      return await request<GetGameByIdResponse>({
        method: 'POST',
        url: `/api/v1/games/${gameId}/make-step`,
        data: { cell },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const subscribeToSocket = createAsyncThunk(
  'game/subscribeToSocket',
  async ({ gameId }: SubscribeToSocketInput, { rejectWithValue, dispatch }) => {
    try {
      socket.connect();
      socket.on<'message'>('message', (message) => {
        const data = JSON.parse(message.data);
        if (data.id === gameId) {
          dispatch({ type: 'game/saveReceivedMessages', payload: JSON.parse(message.data) });
        }
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const unsubscribeFromSocket = createAsyncThunk(
  'game/unsubscribeFromSocket',
  async (_: void, { rejectWithValue }) => {
    try {
      socket.disconnect();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type GetGameByIdInput = {
  gameId: string;
};

type GetGameByIdResponse = {
  data: GameModel;
};

type MakeStepInput = {
  gameId: string;
  cell: number;
};

type SubscribeToSocketInput = {
  gameId: string;
};
