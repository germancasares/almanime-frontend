import { createAsyncThunk } from '@reduxjs/toolkit';
import FansubApi from 'api/FansubApi';

export const getFansubByAcronym = createAsyncThunk(
  'GET_FANSUB_BY_ACRONYM', 
  async (acronym: string) => (FansubApi.GetByAcronym(acronym)),
);

export const getMembers = createAsyncThunk(
  'GET_MEMBERS', 
  async (acronym: string) => (FansubApi.GetMembers(acronym)),
);

export const getSubtitles = createAsyncThunk(
  'GET_SUBTITLES', 
  async (acronym: string) => (FansubApi.GetSubtitles(acronym)),
);

export const getIsMember = createAsyncThunk(
  'GET_IS_MEMBER', 
  async ({ acronym, token }: { acronym: string, token: string }) => (FansubApi.IsMember(acronym, token)),
);
