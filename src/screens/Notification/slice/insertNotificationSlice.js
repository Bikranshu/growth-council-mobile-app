import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const insertNotificationToDB = createAsyncThunk(
  'insertNotification/insertNotificatioToDB',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/insert_notification_into_db`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const insertNotificationSlice = createSlice({
  name: 'insertNotification',
  initialState: {
    insertNotification: {},
    insertNotificationLoading: false,
    insertNotificationError: null,
  },
  reducers: {
    resetInsertNotification: state => {
      state.insertNotification = {};
      state.insertNotificationLoading = false;
      state.insertNotificationError = null;
    },
  },
  extraReducers: {
    [insertNotificationToDB.pending]: (state, action) => {
      state.insertNotificationLoading = true;
      state.insertNotificationError = null;
    },
    [insertNotificationToDB.fulfilled]: (state, action) => {
      state.insertNotification = action.payload;
      state.insertNotificationLoading = false;
      state.insertNotificationError = null;
    },
    [insertNotificationToDB.rejected]: (state, action) => {
      state.insertNotificationLoading = false;
      if (action.payload) {
        state.insertNotificationError = action.payload;
      } else {
        state.insertNotificationError = action.error;
      }
    },
  },
});

export const {resetInsertNotification} = insertNotificationSlice.actions;

export default insertNotificationSlice.reducer;
