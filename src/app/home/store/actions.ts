import { createAsyncThunk } from '@reduxjs/toolkit';
import AnimeApi from 'api/AnimeApi';
import Helper from 'app/helper';

export const loadSeason = createAsyncThunk('LOAD_SEASON', async (page: number) => {
  const now = new Date(Date.now());
  const year = now.getFullYear();
  const season = Helper.GetSeason(now.getMonth());

  return (await AnimeApi.GetSeason(year, season, page)).models;
});

const actions = '';

export default actions;
