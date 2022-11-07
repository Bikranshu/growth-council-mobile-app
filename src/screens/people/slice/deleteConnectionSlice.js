import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const deleteMemberByID = createAsyncThunk(
  'deleteConnection/deleteMemberByID',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/users/connection/remove`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const deleteConnectionSlice = createSlice({
  name: 'deleteConnection',
  initialState: {
    deleteConnections: [],
    deleteConnectionLoading: false,
    deleteConnectionError: null,
  },
  reducers: {
    resetConnectdelete: state => {
      state.deleteConnections = [];
      state.deleteConnectionLoading = false;
      state.deleteConnectionError = null;
    },
  },
  extraReducers: {
    [deleteMemberByID.pending]: (state, action) => {
      state.deleteConnectionLoading = true;
      state.deleteConnectionError = null;
    },
    [deleteMemberByID.fulfilled]: (state, action) => {
      state.deleteConnections = action.payload;
      state.deleteConnectionLoading = false;
      state.deleteConnectionError = null;
    },
    [deleteMemberByID.rejected]: (state, action) => {
      state.deleteConnectionLoading = false;
      if (action.payload) {
        state.deleteConnectionError =
          action.payload.response || action?.payload?.error?.message;
      } else {
        state.deleteConnectionError = action.error;
      }
    },
  },
});

export const {resetConnectdelete} = deleteConnectionSlice.actions;
export default deleteConnectionSlice.reducer;
