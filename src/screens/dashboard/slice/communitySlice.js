import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../utils/httpUtil';

export const fetchAllCommunities = createAsyncThunk(
    'community/fetchAll',
    (_, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/pillars/194/events`)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const communitySlice = createSlice({
    name: 'community',
    initialState: {
        communities: [],
        communityLoading: false,
        communityError: null,
    },
    reducers: {
        resetcommunity: state => {
            state.communities = [];
            state.communityLoading = false;
            state.communityError = null;
        },
    },
    extraReducers: {
        [fetchAllCommunities.pending]: (state, action) => {
            state.communityLoading = true;
            state.communityError = null;
        },
        [fetchAllCommunities.fulfilled]: (state, action) => {
            state.communities = action.payload;
            state.communityLoading = false;
            state.communityError = null;
        },
        [fetchAllCommunities.rejected]: (state, action) => {
            state.communityLoading = false;
            if (action.payload) {
                state.communityError = action?.payload?.error?.message;
            } else {
                state.communityError = action.error;
            }
        },
    },
});

export const {resetCommunity} = communitySlice.actions;
export default communitySlice.reducer;
