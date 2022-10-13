import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const fetchEventByRegion = createAsyncThunk(
  'RegionEvents/fetchEventByRegion',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/events/region`, formData)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const regionEventSlice = createSlice({
  name: 'regionEvent',
  initialState: {
    regionEvents: [],
    regionEventLoading: false,
    regionEventError: null,
  },
  reducers: {
    resetRegionEvent: state => {
      state.regionEvents = [];
      state.regionEventLoading = false;
      state.regionEventError = null;
    },
  },
  extraReducers: {
    [fetchEventByRegion.pending]: (state, action) => {
      state.regionEventLoading = true;
      state.regionEventError = null;
    },
    [fetchEventByRegion.fulfilled]: (state, action) => {
      state.regionEvents = action.payload;
      state.regionEventLoading = false;
      state.regionEventError = null;
    },
    [fetchEventByRegion.rejected]: (state, action) => {
      state.regionEventLoading = false;
      if (action.payload) {
        state.regionEventError = action?.payload?.error?.message;
      } else {
        state.regionEventError = action.error;
      }
    },
  },
});

export const {resetRegionEvent} = regionEventSlice.actions;
export default regionEventSlice.reducer;
