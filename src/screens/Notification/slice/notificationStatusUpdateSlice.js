import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const updateNotificationStatus = createAsyncThunk(
  'notificationStatus/updateNotifcationStatus',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/update_notification_status`, formData)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const notificationStatusSlice = createSlice({
  name: 'notificationStatus',
  initialState: {
    notificationStatus: {},
    notificationStatusLoading: false,
    notificationStatusError: null,
  },
  reducers: {
    resetnotificationStatus: state => {
      state.notificationStatus = {};
      state.notificationStatusLoading = false;
      state.notificationStatusError = null;
    },
  },
  extraReducers: {
    [updateNotificationStatus.pending]: (state, action) => {
      state.notificationStatusLoading = true;
      state.notificationStatusError = null;
    },
    [updateNotificationStatus.fulfilled]: (state, action) => {
      state.notificationStatus = action.payload;
      state.notificationStatusLoading = false;
      state.notificationStatusError = null;
    },
    [updateNotificationStatus.rejected]: (state, action) => {
      state.notificationStatusLoading = false;
      if (action.payload) {
        state.notificationStatusError = action.payload;
      } else {
        state.notificationStatusError = action.error;
      }
    },
  },
});

export const {resetnotificationStatus} = notificationStatusSlice.actions;

export default notificationStatusSlice.reducer;
