import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const discussionByEventID = createAsyncThunk(
  'discussionForum/discussionByEventID',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/event/get_comments`, formData)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const discussionForumSlice = createSlice({
  name: 'discussionForum',
  initialState: {
    discussionForum: [],
    discussionForumLoading: false,
    discussionForumError: null,
  },
  reducers: {
    resetDiscussionForum: state => {
      state.discussionForum = [];
      state.discussionForumLoading = false;
      state.discussionForumError = null;
    },
  },
  extraReducers: {
    [discussionByEventID.pending]: (state, action) => {
      state.discussionForumLoading = true;
      state.discussionForumError = null;
    },
    [discussionByEventID.fulfilled]: (state, action) => {
      state.discussionForum = action.payload;
      state.discussionForumLoading = false;
      state.discussionForumError = null;
    },
    [discussionByEventID.rejected]: (state, action) => {
      state.discussionForumLoading = false;
      if (action.payload) {
        state.discussionForumError = action.payload;
      } else {
        state.discussionForumError = action.error;
      }
    },
  },
});

export const {resetDiscussionForum} = discussionForumSlice.actions;

export default discussionForumSlice.reducer;
