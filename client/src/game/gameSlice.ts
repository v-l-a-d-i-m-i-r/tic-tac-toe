import { createSlice } from '@reduxjs/toolkit';
import { GameModel } from '../models/game.model';
import { getById, makeStep } from './gameActions';

type GameState = {
  game?: GameModel;
  error?: unknown;
};

const initialState: GameState = {
  game: null,
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    saveReceivedMessages(state, { payload }) {
      state.game = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getById.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getById.fulfilled, (state, { payload }) => {
      state.game = payload.data;
    });
    builder.addCase(getById.rejected, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(makeStep.pending, (state) => {
      state.error = null;
    });
    builder.addCase(makeStep.fulfilled, (state, { payload }) => {
      state.game = payload.data;
    });
    builder.addCase(makeStep.rejected, (state, { error }) => {
      state.error = error;
    });
  },
});

export const gameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;
