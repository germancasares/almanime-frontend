import { createAsyncThunk } from '@reduxjs/toolkit';
import AnimeApi from 'api/AnimeApi';
import Helper from 'app/helper';
import { DateTime } from 'luxon';

export const loadSeason = createAsyncThunk('LOAD_SEASON', async (page: number) => {
  const now = DateTime.now();
  const season = Helper.GetSeason(now);

  return AnimeApi.GetSeason(now.year, season, page, true);
});

const actions = '';

export default actions;
