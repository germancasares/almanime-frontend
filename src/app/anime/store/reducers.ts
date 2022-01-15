import { createSlice } from '@reduxjs/toolkit';
import { Anime } from 'types/anime';
import { getAnimeBySlug, getEpisodesByAnimeSlug } from './actions';
import { State } from './state';

const initialState: State = {
  anime: {} as Anime,
  episodes: [],
};

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clearAnime: (state) => {
      state.anime = initialState.anime;
    },
    clearEpisodes: (state) => {
      state.episodes = initialState.episodes;
    },
  },
  extraReducers: (builder) => builder
    .addCase(getAnimeBySlug.fulfilled, (state, action) => {
      state.anime = action.payload;
    })
    .addCase(getEpisodesByAnimeSlug.fulfilled, (state, action) => {
      state.episodes = action.payload;
    }),
});

export const { clearAnime, clearEpisodes } = animeSlice.actions;
export default animeSlice.reducer;
