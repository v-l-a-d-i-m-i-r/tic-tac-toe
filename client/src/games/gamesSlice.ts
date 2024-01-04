import { createSlice } from '@reduxjs/toolkit';
import { createNewGame, getForPlayer, joinGame } from './gamesActions';

const initialState = {
  games: [],
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForPlayer.pending, (state) => {
      state.error = false;
    });
    builder.addCase(getForPlayer.fulfilled, (state, { payload }) => {
      state.games = payload.data;
    });
    builder.addCase(getForPlayer.rejected, (state, { error }) => {
      state.error = error;
    });

    builder.addCase(createNewGame.pending, (state) => {
      state.error = false;
    });
    builder.addCase(createNewGame.fulfilled, (state, { payload }) => {
      state.games.push(payload.data);
    });
    builder.addCase(createNewGame.rejected, (state, { error }) => {
      state.error = error;
    });

    builder.addCase(joinGame.pending, (state) => {
      state.error = false;
    });
    builder.addCase(joinGame.rejected, (state, { error }) => {
      state.error = error;
    });
  },
});

export const gamesReducer = gamesSlice.reducer;
