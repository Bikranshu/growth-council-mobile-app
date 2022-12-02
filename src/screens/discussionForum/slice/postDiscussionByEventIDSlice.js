import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const postDiscussionByEventID = createAsyncThunk(
  'postDiscussion/postDiscussionByEventID',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/event/comment`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const postDiscussionSlice = createSlice({
  name: 'postDiscussion',
  initialState: {
    postDiscussion: [],
    postDiscussionLoading: false,
    postDiscussionError: null,
  },
  reducers: {
    resetPostDiscussion: state => {
      state.postDiscussion = [];
      state.postDiscussionLoading = false;
      state.postDiscussionError = null;
    },
  },
  extraReducers: {
    [postDiscussionByEventID.pending]: (state, action) => {
      state.postDiscussionLoading = true;
      state.postDiscussionError = null;
    },
    [postDiscussionByEventID.fulfilled]: (state, action) => {
      state.postDiscussion = action.payload;
      state.postDiscussionLoading = false;
      state.postDiscussionError = null;
    },
    [postDiscussionByEventID.rejected]: (state, action) => {
      state.postDiscussionLoading = false;
      if (action.payload) {
        state.postDiscussionError = action.payload;
      } else {
        state.postDiscussionError = action.error;
      }
    },
  },
});

export const {resetPostDiscussion} = postDiscussionSlice.actions;

export default postDiscussionSlice.reducer;
