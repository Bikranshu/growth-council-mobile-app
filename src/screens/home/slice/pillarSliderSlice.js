import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

const start = new Date();

export const fetchAllPillarSliders = createAsyncThunk(
  'pillarSlider/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/pillars`)
      .then(response => response.data.data)
      .catch(error => {
        rejectWithValue(error?.response?.data || error);
      });
  },
);

const pillarSliderSlice = createSlice({
  name: 'pillarSlider',
  initialState: {
    pillarSliders: [],
    pillarSliderLoading: false,
    pillarSliderError: null,
  },
  reducers: {
    resetPillarSlider: state => {
      state.pillarSliders = [];
      state.pillarSliderLoading = false;
      state.pillarSliderError = null;
    },
  },
  extraReducers: {
    [fetchAllPillarSliders.pending]: (state, action) => {
      state.pillarSliderLoading = true;
      state.pillarSliderError = null;
    },
    [fetchAllPillarSliders.fulfilled]: (state, action) => {
      state.pillarSliders = action.payload;
      state.pillarSliderLoading = false;
      state.pillarSliderError = null;
    },
    [fetchAllPillarSliders.rejected]: (state, action) => {
      state.pillarSliderLoading = false;
      if (action.payload) {
        state.pillarSliderError = action?.payload?.error?.message;
      } else {
        state.pillarSliderError = action.error;
      }
    },
  },
});

export const {resetPillarSlider} = pillarSliderSlice.actions;
export default pillarSliderSlice.reducer;
