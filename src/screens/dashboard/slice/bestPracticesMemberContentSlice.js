import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllbestPracticesMemberContents = createAsyncThunk(
    'bestPracticesMemberContents/fetchAll',
    (pillarId, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/pillars/${pillarId}`)
            .then(response => response.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const bestPracticesMemberContentSlice = createSlice({
    name: 'bestPracticesMemberContent',
    initialState: {
        bestPracticesMemberContents: [],
        bestPracticesMemberContentLoading: false,
        bestPracticesMemberContentError: null,
    },
    reducers: {
        resetbestPracticesMemberContent: state => {
            state.bestPracticesMemberContents = [];
            state.bestPracticesMemberContentLoading = false;
            state.bestPracticesMemberContentError = null;
        },
    },
    extraReducers: {
        [fetchAllbestPracticesMemberContents.pending]: (state, action) => {
            state.bestPracticesMemberContentLoading = true;
            state.bestPracticesMemberContentError = null;
        },
        [fetchAllbestPracticesMemberContents.fulfilled]: (state, action) => {
            state.bestPracticesMemberContents = action.payload;
            state.bestPracticesMemberContentLoading = false;
            state.bestPracticesMemberContentError = null;
        },
        [fetchAllbestPracticesMemberContents.rejected]: (state, action) => {
            state.bestPracticesMemberContentLoading = false;
            if (action.payload) {
                state.bestPracticesMemberContentError = action?.payload?.error?.message;
            } else {
                state.bestPracticesMemberContentError = action.error;
            }
        },
    },
});

export const {resetbestPracticesMemberContent} = bestPracticesMemberContentSlice.actions;
export default bestPracticesMemberContentSlice.reducer;
