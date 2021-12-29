import { createSlice } from '@reduxjs/toolkit';
import { Anime } from 'types/anime';
import { getAnimeBySlug } from './actions';
import { State } from './type';

const initialState: State = {
  anime: {} as Anime,
};

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clearAnime: (state) => {
      state.anime = initialState.anime;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimeBySlug.fulfilled, (state, action) => {
        state.anime = action.payload;
      });
  },
});

export const { clearAnime } = animeSlice.actions;
export default animeSlice.reducer;
