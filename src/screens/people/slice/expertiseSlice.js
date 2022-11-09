import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllExpertise = createAsyncThunk(
  'expertise/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/new/expertise_areas`)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const expertiseSlice = createSlice({
  name: 'expertise',
  initialState: {
    expertise: [],
    expertiseLoading: false,
    expertiseError: null,
  },
  reducers: {
    resetExpertise: state => {
      state.expertise = [];
      state.expertiseLoading = false;
      state.expertiseError = null;
    },
  },
  extraReducers: {
    [fetchAllExpertise.pending]: (state, action) => {
      state.expertiseLoading = true;
      state.expertiseError = null;
    },
    [fetchAllExpertise.fulfilled]: (state, action) => {
      state.expertise = action.payload;
      state.expertiseLoading = false;
      state.expertiseError = null;
    },
    [fetchAllExpertise.rejected]: (state, action) => {
      state.expertiseLoading = false;
      if (action.payload) {
        state.expertiseError = action?.payload?.error?.message;
      } else {
        state.expertiseError = action.error;
      }
    },
  },
});

export const {resetExpertise} = expertiseSlice.actions;
export default expertiseSlice.reducer;
