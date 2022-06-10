import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllgrowthCoachingMemberContents = createAsyncThunk(
    'growthCoachingMemberContents/fetchAll',
    (pillarId, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/pillars/171`)
            .then(response => response.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const growthCoachingMemberContentSlice = createSlice({
    name: 'growthCoachingMemberContent',
    initialState: {
        growthCoachingMemberContents: [],
        growthCoachingMemberContentLoading: false,
        growthCoachingMemberContentError: null,
    },
    reducers: {
        resetgrowthCoachingMemberContent: state => {
            state.growthCoachingMemberContents = [];
            state.growthCoachingMemberContentLoading = false;
            state.growthCoachingMemberContentError = null;
        },
    },
    extraReducers: {
        [fetchAllgrowthCoachingMemberContents.pending]: (state, action) => {
            state.growthCoachingMemberContentLoading = true;
            state.growthCoachingMemberContentError = null;
        },
        [fetchAllgrowthCoachingMemberContents.fulfilled]: (state, action) => {
            state.growthCoachingMemberContents = action.payload;
            state.growthCoachingMemberContentLoading = false;
            state.growthCoachingMemberContentError = null;
        },
        [fetchAllgrowthCoachingMemberContents.rejected]: (state, action) => {
            state.growthCoachingMemberContentLoading = false;
            if (action.payload) {
                state.growthCoachingMemberContentError =
                    action?.payload?.error?.message;
            } else {
                state.growthCoachingMemberContentError = action.error;
            }
        },
    },
});

export const {resetgrowthCoachingMemberContent} = growthCoachingMemberContentSlice.actions;
export default growthCoachingMemberContentSlice.reducer;
