import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../utils/httpUtil';

export const fetchGrowthPipeline = createAsyncThunk(
  'GDP/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/page/growth_pipeline_dialog`)
      .then(response => response.data.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const growthPipelineSlice = createSlice({
  name: 'GDP',
  initialState: {
    GDP: [],
    GDPLoading: false,
    GDPError: null,
  },
  reducers: {
    resetGrowthPipeline: state => {
      state.GDP = [];
      state.GDPLoading = false;
      state.GDPError = null;
    },
  },
  extraReducers: {
    [fetchGrowthPipeline.pending]: (state, action) => {
      state.GDPLoading = true;
      state.GDPError = null;
    },
    [fetchGrowthPipeline.fulfilled]: (state, action) => {
      state.GDP = action.payload;
      state.GDPLoading = false;
      state.GDPError = null;
    },
    [fetchGrowthPipeline.rejected]: (state, action) => {
      state.GDPLoading = false;
      if (action.payload) {
        state.GDPError = action?.payload?.error?.message;
      } else {
        state.GDPError = action.error;
      }
    },
  },
});

export const {resetGrowthPipeline} = growthPipelineSlice.actions;
export default growthPipelineSlice.reducer;
