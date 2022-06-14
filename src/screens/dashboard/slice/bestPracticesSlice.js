import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllbestPractices = createAsyncThunk(
    'bestPractices/fetchAll',
    (_, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/pillars/171/events`)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const bestPracticeSlice = createSlice({
    name: 'bestPractice',
    initialState: {
        bestPractices: [],
        bestPracticeLoading: false,
        bestPracticeError: null,
    },
    reducers: {
        resetbestPractice: state => {
            state.bestPractices = [];
            state.bestPracticeLoading = false;
            state.bestPracticeError = null;
        },
    },
    extraReducers: {
        [fetchAllbestPractices.pending]: (state, action) => {
            state.bestPracticeLoading = true;
            state.bestPracticeError = null;
        },
        [fetchAllbestPractices.fulfilled]: (state, action) => {
            state.bestPractices = action.payload;
            state.bestPracticeLoading = false;
            state.bestPracticeError = null;
        },
        [fetchAllbestPractices.rejected]: (state, action) => {
            state.bestPracticeLoading = false;
            if (action.payload) {
                state.bestPracticeError = action?.payload?.error?.message;
            } else {
                state.bestPracticeError = action.error;
            }
        },
    },
});

export const {resetbestPractice} = bestPracticeSlice.actions;
export default bestPracticeSlice.reducer;
