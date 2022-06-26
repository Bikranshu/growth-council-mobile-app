import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { GROWTH_COACHING_ID } from '../../../constants';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllgrowthCoachings = createAsyncThunk(
    'growthCoachings/fetchAll',
    (_, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/pillars/${GROWTH_COACHING_ID}/events`)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const growthCoachingSlice = createSlice({
    name: 'growthCoaching',
    initialState: {
        growthCoachings: [],
        growthCoachingLoading: false,
        growthCoachingError: null,
    },
    reducers: {
        resetgrowthCoaching: state => {
            state.growthCoachings = [];
            state.growthCoachingLoading = false;
            state.growthCoachingError = null;
        },
    },
    extraReducers: {
        [fetchAllgrowthCoachings.pending]: (state, action) => {
            state.growthCoachingLoading = true;
            state.growthCoachingError = null;
        },
        [fetchAllgrowthCoachings.fulfilled]: (state, action) => {
            state.growthCoachings = action.payload;
            state.growthCoachingLoading = false;
            state.growthCoachingError = null;
        },
        [fetchAllgrowthCoachings.rejected]: (state, action) => {
            state.growthCoachingLoading = false;
            if (action.payload) {
                state.growthCoachingError = action?.payload?.error?.message;
            } else {
                state.growthCoachingError = action.error;
            }
        },
    },
});

export const {resetgrowthCoaching} = growthCoachingSlice.actions;
export default growthCoachingSlice.reducer;
