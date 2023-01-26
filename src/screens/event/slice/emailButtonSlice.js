import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const GrowthPipelineEmail = createAsyncThunk(
  'sendEmail/PipelineEmail',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/gpd_email`, formData)
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
    resetSendEmail: state => {
      state.sendEmail = [];
      state.sendEmailLoading = false;
      state.sendEmailError = null;
    },
  },
  extraReducers: {
    [GrowthPipelineEmail.pending]: (state, action) => {
      state.sendEmailLoading = true;
      state.sendEmailError = null;
    },
    [GrowthPipelineEmail.fulfilled]: (state, action) => {
      state.sendEmail = action.payload;
      state.sendEmailLoading = false;
      state.sendEmailError = null;
    },
    [GrowthPipelineEmail.rejected]: (state, action) => {
      state.sendEmailLoading = false;
      if (action.payload) {
        state.sendEmailError = action?.payload?.error?.message;
      } else {
        state.sendEmailError = action.error;
      }
    },
  },
});

export const {resetSendEmail} = sendEmailSlice.actions;
export default sendEmailSlice.reducer;
