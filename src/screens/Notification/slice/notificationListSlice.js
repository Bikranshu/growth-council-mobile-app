import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const getNotificationList = createAsyncThunk(
  'notificationList/getNotificationList',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/get_notification_list_by_id`, formData)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const notificationListSlice = createSlice({
  name: 'notificationList',
  initialState: {
    notificationList: {},
    notificationListLoading: false,
    notificationListError: null,
  },
  reducers: {
    resetnotificationList: state => {
      state.notificationList = {};
      state.notificationListLoading = false;
      state.notificationListError = null;
    },
  },
  extraReducers: {
    [getNotificationList.pending]: (state, action) => {
      state.notificationListLoading = true;
      state.notificationListError = null;
    },
    [getNotificationList.fulfilled]: (state, action) => {
      state.notificationList = action.payload;
      state.notificationListLoading = false;
      state.notificationListError = null;
    },
    [getNotificationList.rejected]: (state, action) => {
      state.notificationListLoading = false;
      if (action.payload) {
        state.notificationListError = action.payload;
      } else {
        state.notificationListError = action.error;
      }
    },
  },
});

export const {resetnotificationList} = notificationListSlice.actions;

export default notificationListSlice.reducer;
