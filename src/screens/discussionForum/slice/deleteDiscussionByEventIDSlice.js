import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const deleteDiscussionByEventID = createAsyncThunk(
  'deleteDiscusssion/deleteDiscussionByEventID',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/event/comment/delete`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const deleteDiscusssionSlice = createSlice({
  name: 'deleteDiscusssion',
  initialState: {
    deleteDiscusssion: [],
    deleteDiscusssionLoading: false,
    deleteDiscusssionError: null,
  },
  reducers: {
    resetDeleteDiscusssion: state => {
      state.deleteDiscusssion = [];
      state.deleteDiscusssionLoading = false;
      state.deleteDiscusssionError = null;
    },
  },
  extraReducers: {
    [deleteDiscussionByEventID.pending]: (state, action) => {
      state.deleteDiscusssionLoading = true;
      state.deleteDiscusssionError = null;
    },
    [deleteDiscussionByEventID.fulfilled]: (state, action) => {
      state.deleteDiscusssion = action.payload;
      state.deleteDiscusssionLoading = false;
      state.deleteDiscusssionError = null;
    },
    [deleteDiscussionByEventID.rejected]: (state, action) => {
      state.deleteDiscusssionLoading = false;
      if (action.payload) {
        state.deleteDiscusssionError = action.payload;
      } else {
        state.deleteDiscusssionError = action.error;
      }
    },
  },
});

export const {resetDeleteDiscusssion} = deleteDiscusssionSlice.actions;

export default deleteDiscusssionSlice.reducer;
