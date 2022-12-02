import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const registerEventByID = createAsyncThunk(
  'eventRegister/registerEventByID',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/events/register`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);


const eventRegisterSlice = createSlice({
  name: 'eventRegister',
  initialState: {
    eventRegisters: [],
    eventRegisterLoading: false,
    eventRegisterError: null,
  },
  reducers: {
    resetEventRegister: state => {
      state.eventRegisters = [];
      state.eventRegisterLoading = false;
      state.eventRegisterError = null;
    },
  },
  extraReducers: {
    [registerEventByID.pending]: (state, action) => {
      state.eventRegisterLoading = true;
      state.eventRegisterError = null;
    },
    [registerEventByID.fulfilled]: (state, action) => {
      state.eventRegisters = action.payload;
      state.eventRegisterLoading = false;
      state.eventRegisterError = null;
    },
    [registerEventByID.rejected]: (state, action) => {
      state.eventRegisterLoading = false;
      if (action.payload) {
        state.eventRegisterError =
          action.payload.response || action?.payload?.error?.message;
      } else {
        state.eventRegisterError = action.error;
      }
    },
  },
});

export const {resetEventRegister} = eventRegisterSlice.actions;
export default eventRegisterSlice.reducer;
