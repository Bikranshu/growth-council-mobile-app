import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const sendEmailThroughButton = createAsyncThunk(
  'sendEmail/sendEmailThroughButton',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const sendEmailSlice = createSlice({
  name: 'sendEmail',
  initialState: {
    sendEmail: [],
    sendEmailLoading: false,
    sendEmailError: null,
  },
  reducers: {
    resetsendEmail: state => {
      state.sendEmail = [];
      state.sendEmailLoading = false;
      state.sendEmailError = null;
    },
  },
  extraReducers: {
    [sendEmailThroughButton.pending]: (state, action) => {
      state.sendEmailLoading = true;
      state.sendEmailError = null;
    },
    [sendEmailThroughButton.fulfilled]: (state, action) => {
      state.sendEmail = action.payload;
      state.sendEmailLoading = false;
      state.sendEmailError = null;
    },
    [sendEmailThroughButton.rejected]: (state, action) => {
      state.sendEmailLoading = false;
      if (action.payload) {
        state.sendEmailError =
          action.payload.response || action?.payload?.error?.message;
      } else {
        state.sendEmailError = action.error;
      }
    },
  },
});

export const {resetsendEmail} = sendEmailSlice.actions;
export default sendEmailSlice.reducer;
