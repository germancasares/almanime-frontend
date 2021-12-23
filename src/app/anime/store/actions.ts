import { createAsyncThunk } from '@reduxjs/toolkit';
import AnimeApi from 'api/AnimeApi';

export const getAnimeBySlug = createAsyncThunk('GET_ANIME_BY_SLUG', async (slug: string) => (AnimeApi.GetBySlug(slug)));

const actions = '';

export default actions;
