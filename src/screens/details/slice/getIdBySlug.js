import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const getIdBySlug = createAsyncThunk(
  'getSlug/getIdBySlug',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/content-library/get_id_by_slug`,formData)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const getSlugSlice = createSlice({
  name: 'getSlug',
  initialState: {
    getSlug: [],
    getSlugLoading: false,
    getSlugError: null,
  },
  reducers: {
    resetGetSlug: state => {
      state.getSlug = [];
      state.getSlugLoading = false;
      state.getSlugError = null;
    },
  },
  extraReducers: {
    [getIdBySlug.pending]: (state, action) => {
      state.getSlugLoading = true;
      state.getSlugError = null;
    },
    [getIdBySlug.fulfilled]: (state, action) => {
      state.getSlug = action.payload;
      state.getSlugLoading = false;
      state.getSlugError = null;
    },
    [getIdBySlug.rejected]: (state, action) => {
      state.getSlugLoading = false;
      if (action.payload) {
        state.getSlugError =
          action.payload.response || action?.payload?.error?.message;
      } else {
        state.getSlugError = action.error;
      }
    },
  },
});

export const {resetGetSlug} = getSlugSlice.actions;
export default getSlugSlice.reducer;
