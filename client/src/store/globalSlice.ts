import { createSlice, UnknownAction } from '@reduxjs/toolkit';

interface GlobalSliceInitialState {
  loading: boolean;
  error: string | null;
}

export const initialState: GlobalSliceInitialState = {
  loading: false,
  error: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: UnknownAction) => action.type.includes('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action: UnknownAction) => action.type.includes('/fulfilled'),
        (state) => {
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        (action: UnknownAction) => action.type.includes('/rejected'),
        (state, action: UnknownAction) => {
          state.error = JSON.stringify(action.payload);
          console.error(action);
        },
      );
  },
  reducers: {},
});

export const globalReducer = globalSlice.reducer;
