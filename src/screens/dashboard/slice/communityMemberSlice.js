import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllCommunityMembers = createAsyncThunk(
  'communityMember/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/users`)
      .then(response => response.data.body_response)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const communityMemberSlice = createSlice({
  name: 'communityMember',
  initialState: {
    communityMembers: [],
    communityMemberLoading: false,
    communityMemberError: null,
  },
  reducers: {
    resetCommunityMember: state => {
      state.communityMembers = [];
      state.communityMemberLoading = false;
      state.communityMemberError = null;
    },
  },
  extraReducers: {
    [fetchAllCommunityMembers.pending]: (state, action) => {
      state.communityMemberLoading = true;
      state.communityMemberError = null;
    },
    [fetchAllCommunityMembers.fulfilled]: (state, action) => {
      state.communityMembers = action.payload;
      state.communityMemberLoading = false;
      state.communityMemberError = null;
    },
    [fetchAllCommunityMembers.rejected]: (state, action) => {
      state.communityMemberLoading = false;
      if (action.payload) {
        state.communityMemberError = action.payload.error.message;
      } else {
        state.communityMemberError = action.error;
      }
    },
  },
});

export const {resetCommunityMember} = communityMemberSlice.actions;

export default communityMemberSlice.reducer;
