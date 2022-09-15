import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

const start = new Date();
export const fetchAllDetails = createAsyncThunk(
  'detail/fetchAll',
  (_, {rejectWithValue}) => {
    return fetch(`jwt-auth/v1/page/why_right_community`)
      .then(response => {
        {
          
          console.log('data fetch', new Date());
		  console.log('api hit', start);
          console.log('cc2', new Date() - start);
        }
        return response.data.data;
      })
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    details: [],
    detailLoading: false,
    detailError: null,
  },
  reducers: {
    resetdetail: state => {
      state.details = [];
      state.detailLoading = false;
      state.detailError = null;
    },
  },
  extraReducers: {
    [fetchAllDetails.pending]: (state, action) => {
      state.detailLoading = true;
      state.detailError = null;
    },
    [fetchAllDetails.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.detailLoading = false;
      state.detailError = null;
    },
    [fetchAllDetails.rejected]: (state, action) => {
      state.detailLoading = false;
      if (action.payload) {
        state.detailError = action?.payload?.error?.message;
      } else {
        state.detailError = action.error;
      }
    },
  },
});

export const {resetDetail} = detailSlice.actions;
export default detailSlice.reducer;
