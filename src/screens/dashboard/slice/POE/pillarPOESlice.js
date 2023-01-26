import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../../utils/httpUtil';

export const fetchAllPillarPOEs = createAsyncThunk(
    'pillarPOEs/fetchAll',
    (pillarId, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/pillars/${pillarId}/poes`)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);

const pillarPOESlice = createSlice({
    name: 'pillarPOE',
    initialState: {
        pillarPOEs: [],
        pillarPOELoading: false,
        pillarPOEError: null,
    },
    reducers: {
        resetPillarPOE: state => {
            state.pillarPOEs = [];
            state.pillarPOELoading = false;
            state.pillarPOEError = null;
        },
    },
    extraReducers: {
        [fetchAllPillarPOEs.pending]: (state, action) => {
            state.pillarPOELoading = true;
            state.pillarPOEError = null;
        },
        [fetchAllPillarPOEs.fulfilled]: (state, action) => {
            state.pillarPOEs = action.payload;
            state.pillarPOELoading = false;
            state.pillarPOEError = null;
        },
        [fetchAllPillarPOEs.rejected]: (state, action) => {
            state.pillarPOELoading = false;
            if (action.payload) {
                state.pillarPOEError = action?.payload?.error?.message;
            } else {
                state.pillarPOEError = action.error;
            }
        },
    },
});

export const {resetPillarPOE} = pillarPOESlice.actions;
export default pillarPOESlice.reducer;
