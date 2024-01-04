import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../auth/authSlice';
import { gameReducer } from '../game/gameSlice';
import { gamesReducer } from '../games/gamesSlice';
import { globalReducer } from './globalSlice';

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  games: gamesReducer,
  game: gameReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const globalSelector = (state: RootState): RootState['global'] => state.global;
export const authSelector = (state: RootState): RootState['auth'] => state.auth;
export const gamesSelector = (state: RootState): RootState['games'] => state.games;
export const gameSelector = (state: RootState): RootState['game'] => state.game;
