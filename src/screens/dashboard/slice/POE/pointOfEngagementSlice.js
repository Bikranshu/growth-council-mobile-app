import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetch} from '../../../../utils/httpUtil';

export const fetchAllPOEs = createAsyncThunk(
    'POEs/fetchAll',
    (_, {rejectWithValue}) => {
        return fetch(`jwt-auth/v1/poes`)
            .then(response => response.data.data)
            .catch(error => rejectWithValue(error?.response?.data || error));
    },
);
const poeSlice = createSlice({
    name: 'poe',
    initialState: {
        poes: [],
        poeLoading: false,
        poeError: null,
    },
    reducers: {
        resetPOE: state => {
            state.poes = [];
            state.poeLoading = false;
            state.poeError = null;
        },
    },
    extraReducers: {
        [fetchAllPOEs.pending]: (state, action) => {
            state.poeLoading = true;
            state.poeError = null;
        },
        [fetchAllPOEs.fulfilled]: (state, action) => {
            state.poes = action.payload;
            state.poeLoading = false;
            state.poeError = null;
        },
        [fetchAllPOEs.rejected]: (state, action) => {
            state.poeLoading = false;
            if (action.payload) {
                state.poeError = action?.payload?.error?.message;
            } else {
                state.poeError = action.error;
            }
        },
    },
});

export const {resetPOE} = poeSlice.actions;
export default poeSlice.reducer;
