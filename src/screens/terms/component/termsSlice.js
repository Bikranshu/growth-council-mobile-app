import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchTerms = createAsyncThunk(
  'terms/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/page/terms_and_conditions`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const termsSlice = createSlice({
  name: 'terms',
  initialState: {
    terms: [],
    termsLoading: false,
    termsError: null,
  },
  reducers: {
    resetTerms: state => {
      state.terms = [];
      state.termsLoading = false;
      state.termsError = null;
    },
  },
  extraReducers: {
    [fetchTerms.pending]: (state, action) => {
      state.termsLoading = true;
      state.termsError = null;
    },
    [fetchTerms.fulfilled]: (state, action) => {
      state.terms = action.payload;
      state.termsLoading = false;
      state.termsError = null;
    },
    [fetchTerms.rejected]: (state, action) => {
      state.termsLoading = false;
      if (action.payload) {
        state.termsError = action?.payload?.error?.message;
      } else {
        state.termsError = action.error;
      }
    },
  },
});

export const {resetTerms} = termsSlice.actions;
export default termsSlice.reducer;
