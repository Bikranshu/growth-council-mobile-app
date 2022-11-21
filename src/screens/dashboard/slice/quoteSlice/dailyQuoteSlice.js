import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../../utils/httpUtil';

export const fetchDailyQuote = createAsyncThunk(
  'dailyQuote/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const dailyQuoteSlice = createSlice({
  name: 'dailyQuote',
  initialState: {
    dailyQuote: [],
    dailyQuoteLoading: false,
    dailyQuoteError: null,
  },
  reducers: {
    resetDailyQuote: state => {
      state.dailyQuote = [];
      state.dailyQuoteLoading = false;
      state.dailyQuoteError = null;
    },
  },
  extraReducers: {
    [fetchDailyQuote.pending]: (state, action) => {
      state.dailyQuoteLoading = true;
      state.dailyQuoteError = null;
    },
    [fetchDailyQuote.fulfilled]: (state, action) => {
      state.dailyQuote = action.payload;
      state.dailyQuoteLoading = false;
      state.dailyQuoteError = null;
    },
    [fetchDailyQuote.rejected]: (state, action) => {
      state.dailyQuoteLoading = false;
      if (action.payload) {
        state.dailyQuoteError = action?.payload?.error?.message;
      } else {
        state.dailyQuoteError = action.error;
      }
    },
  },
});

export const {resetDailyQuote} = dailyQuoteSlice.actions;

export default dailyQuoteSlice.reducer;
