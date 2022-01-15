import { createSlice } from '@reduxjs/toolkit';
import { Fansub } from 'types/fansub';
import { Member } from 'types/member';
import { Subtitle } from 'types/subtitle';
import { getFansubByAcronym, getIsMember, getMembers, getSubtitles } from './actions';
import { State } from './state';

const initialState: State = {
  fansub: {} as Fansub,
  members: [] as Member[],
  subtitles: [] as Subtitle[],
  isMember: false,
};

const fansubSlice = createSlice({
  name: 'fansub',
  initialState,
  reducers: {
    clear: (state) => {
      state.fansub = initialState.fansub;
      state.members = initialState.members;
      state.subtitles = initialState.subtitles;
      state.isMember = initialState.isMember;
    },
  },
  extraReducers: (builder) => builder
    .addCase(getFansubByAcronym.fulfilled, (state, action) => {
      state.fansub = action.payload;
    })
    .addCase(getMembers.fulfilled, (state, action) => {
      state.members = action.payload;
    })
    .addCase(getSubtitles.fulfilled, (state, action) => {
      state.subtitles = action.payload;
    })
    .addCase(getIsMember.fulfilled, (state, action) => {
      state.isMember = action.payload;
    }),
});

export const { clear } = fansubSlice.actions;
export default fansubSlice.reducer;