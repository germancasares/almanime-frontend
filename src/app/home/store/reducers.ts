import { createSlice } from '@reduxjs/toolkit';
import { loadSeason } from './actions';
import { State } from './type';

const initialState: State = {
  animes: [],
};

// Then, handle actions in your reducers:
const homeSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSeason.fulfilled, (state, action) => {
        state.animes = action.payload;
      });
  },
});

export default homeSlice.reducer;
