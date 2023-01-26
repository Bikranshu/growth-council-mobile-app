import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const updateNotificationByUser = createAsyncThunk(
  'updateNotification/updateNotificationByUser',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/users/notification/update`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const updateNotificationSlice = createSlice({
  name: 'updateNotification',
  initialState: {
    updateNotification: {},
    updateNotificationLoading: false,
    updateNotificationError: null,
  },
  reducers: {
    resetUpdateNotification: state => {
      state.updateNotification = {};
      state.updateNotificationLoading = false;
      state.updateNotificationError = null;
    },
  },
  extraReducers: {
    [updateNotificationByUser.pending]: (state, action) => {
      state.updateNotificationLoading = true;
      state.updateNotificationError = null;
    },
    [updateNotificationByUser.fulfilled]: (state, action) => {
      state.updateNotification = action.payload;
      state.updateNotificationLoading = false;
      state.updateNotificationError = null;
    },
    [updateNotificationByUser.rejected]: (state, action) => {
      state.updateNotificationLoading = false;
      if (action.payload) {
        state.updateNotificationError = action.payload;
      } else {
        state.updateNotificationError = action.error;
      }
    },
  },
});

export const {resetUpdateNotification} = updateNotificationSlice.actions;

export default updateNotificationSlice.reducer;
