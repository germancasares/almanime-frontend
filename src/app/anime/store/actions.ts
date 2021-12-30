import { createAsyncThunk } from '@reduxjs/toolkit';
import AnimeApi from 'api/AnimeApi';
import EpisodeApi from 'api/EpisodeApi';

export const getAnimeBySlug = createAsyncThunk('GET_ANIME_BY_SLUG', async (slug: string) => (AnimeApi.GetBySlug(slug)));

export const getEpisodesByAnimeSlug = createAsyncThunk(
  'GET_EPISODES_BY_ANIME_SLUG',
  async (animeSlug: string) => (EpisodeApi.GetByAnimeSlug(animeSlug)),
);

const actions = '';

export default actions;
