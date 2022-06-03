import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllCommunityMemberContents = createAsyncThunk(
  'communityMemberContent/fetchAll',
  (pillarId, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars/${pillarId}`)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const communityMemberContentSlice = createSlice({
  name: 'communityMemberContent',
  initialState: {
    communityMemberContents: [],
    communityMemberContentLoading: false,
    communityMemberContentError: null,
  },
  reducers: {
    resetCommunityMemberContent: state => {
      state.communityMemberContents = [];
      state.communityMemberContentLoading = false;
      state.communityMemberContentError = null;
    },
  },
  extraReducers: {
    [fetchAllCommunityMemberContents.pending]: (state, action) => {
      state.communityMemberContentLoading = true;
      state.communityMemberContentError = null;
    },
    [fetchAllCommunityMemberContents.fulfilled]: (state, action) => {
      state.communityMemberContents = action.payload;
      state.communityMemberContentLoading = false;
      state.communityMemberContentError = null;
    },
    [fetchAllCommunityMemberContents.rejected]: (state, action) => {
      state.communityMemberContentLoading = false;
      if (action.payload) {
        state.communityMemberContentError = action?.payload?.error?.message;
      } else {
        state.communityMemberContentError = action.error;
      }
    },
  },
});

export const {resetCommunityMemberContent} =
  communityMemberContentSlice.actions;

export default communityMemberContentSlice.reducer;
