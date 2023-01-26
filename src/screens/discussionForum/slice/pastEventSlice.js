import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const pastEventInForum = createAsyncThunk(
  'pastEvent/pastEventInForum',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/events/past_events`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const pastEventSlice = createSlice({
  name: 'pastEvent',
  initialState: {
    pastEvent: [],
    pastEventLoading: false,
    pastEventError: null,
  },
  reducers: {
    resetPastEvent: state => {
      state.pastEvent = [];
      state.pastEventLoading = false;
      state.pastEventError = null;
    },
  },
  extraReducers: {
    [pastEventInForum.pending]: (state, action) => {
      state.pastEventLoading = true;
      state.pastEventError = null;
    },
    [pastEventInForum.fulfilled]: (state, action) => {
      state.pastEvent = action.payload;
      state.pastEventLoading = false;
      state.pastEventError = null;
    },
    [pastEventInForum.rejected]: (state, action) => {
      state.pastEventLoading = false;
      if (action.payload) {
        state.pastEventError = action.payload;
      } else {
        state.pastEventError = action.error;
      }
    },
  },
});

export const {resetPastEvent} = pastEventSlice.actions;

export default pastEventSlice.reducer;
