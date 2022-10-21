import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllRegion = createAsyncThunk(
  'region/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/mobile_region`)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const regionSlice = createSlice({
  name: 'region',
  initialState: {
    region: [],
    regionLoading: false,
    regionError: null,
  },
  reducers: {
    resetRegion: state => {
      state.region = [];
      state.regionLoading = false;
      state.regionError = null;
    },
  },
  extraReducers: {
    [fetchAllRegion.pending]: (state, action) => {
      state.regionLoading = true;
      state.regionError = null;
    },
    [fetchAllRegion.fulfilled]: (state, action) => {
      state.region = action.payload;
      state.regionLoading = false;
      state.regionError = null;
    },
    [fetchAllRegion.rejected]: (state, action) => {
      state.regionLoading = false;
      if (action.payload) {
        state.regionError = action?.payload?.error?.message;
      } else {
        state.regionError = action.error;
      }
    },
  },
});

export const {resetRegion} = regionSlice.actions;
export default regionSlice.reducer;
