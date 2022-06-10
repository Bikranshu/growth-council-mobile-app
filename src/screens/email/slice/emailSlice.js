import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const sendMailByUser = createAsyncThunk(
  'sendMail/sendMailByUser',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/send_mail`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const sendMailSlice = createSlice({
  name: 'sendMail',
  initialState: {
    sendMail: [],
    sendMailLoading: false,
    sendMailError: null,
  },
  reducers: {
    resetSendMail: state => {
      state.sendMail = [];
      state.sendMailLoading = false;
      state.sendMailError = null;
    },
  },
  extraReducers: {
    [sendMailByUser.pending]: (state, action) => {
      state.sendMailLoading = true;
      state.sendMailError = null;
    },
    [sendMailByUser.fulfilled]: (state, action) => {
      state.sendMail = action.payload;
      state.sendMailLoading = false;
      state.sendMailError = null;
    },
    [sendMailByUser.rejected]: (state, action) => {
      state.sendMailLoading = false;
      if (action.payload) {
        state.sendMailError = action?.payload?.error?.message;
      } else {
        state.sendMailError = action.error;
      }
    },
  },
});

export const {resetSendMail} = sendMailSlice.actions;
export default sendMailSlice.reducer;
