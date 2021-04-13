import { createSlice } from '@reduxjs/toolkit';
import Anime from 'types/anime';
import { getAnimeBySlug } from './actions';
import { State } from './type';

const initialState: State = {
  anime: {
    coverImage: null,
    posterImage: null,
  } as Anime,
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
