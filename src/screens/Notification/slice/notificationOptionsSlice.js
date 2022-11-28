import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchNotificationOptions = createAsyncThunk(
  'notificationOption/fetchNotificationOptions',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/users/notification_options`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const notificationOptionSlice = createSlice({
  name: 'notificationOption',
  initialState: {
    notificationOptions: [],
    notificationOptionLoading: false,
    notificationOptionError: null,
  },
  reducers: {
    resetNotificationOption: state => {
      state.notificationOptions = [];
      state.notificationOptionLoading = false;
      state.notificationOptionError = null;
    },
  },
  extraReducers: {
    [fetchNotificationOptions.pending]: (state, action) => {
      state.notificationOptionLoading = true;
      state.notificationOptionError = null;
    },
    [fetchNotificationOptions.fulfilled]: (state, action) => {
      state.notificationOptions = action.payload;
      state.notificationOptionLoading = false;
      state.notificationOptionError = null;
    },
    [fetchNotificationOptions.rejected]: (state, action) => {
      state.notificationOptionLoading = false;
      if (action.payload) {
        state.notificationOptionError = action?.payload?.error?.message;
      } else {
        state.notificationOptionError = action.error;
      }
    },
  },
});

export const {resetNotificationOption} = notificationOptionSlice.actions;
export default notificationOptionSlice.reducer;
