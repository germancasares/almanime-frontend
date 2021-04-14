import { createSlice } from '@reduxjs/toolkit';
import { AnimeWithEpisodes } from 'types/anime';
import Episode from 'types/episode';
import { getAnimeBySlug } from './actions';
import { State } from './type';

const initialState: State = {
  anime: {
    coverImage: null,
    posterImage: null,
    episodes: [] as Episode[],
  } as AnimeWithEpisodes,
};

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimeBySlug.fulfilled, (state, action) => {
        state.anime = action.payload;
      });
  },
});

export default animeSlice.reducer;
