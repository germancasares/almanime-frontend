import { createSlice } from '@reduxjs/toolkit';
import { loadSeason } from './actions';
import { State } from './state';

const initialState: State = {
  animes: [],
  meta: {
    count: -1,
  },
};

// Then, handle actions in your reducers:
const homeSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => builder
    .addCase(loadSeason.fulfilled, (state, action) => {
      state.animes = action.payload.models;
      state.meta.count = action.payload.meta.count;
    }),
});

export default homeSlice.reducer;
