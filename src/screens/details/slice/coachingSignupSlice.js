import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const GrowthCoachingSignup = createAsyncThunk(
  'coachingSignup/Signup',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/signup_coaching_session`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const CoachingSignupSlice = createSlice({
  name: 'coachingSignup',
  initialState: {
    coachingSignup: [],
    coachingSignupLoading: false,
    coachingSignupError: null,
  },
  reducers: {
    resetCoachingSignup: state => {
      state.coachingSignup = [];
      state.coachingSignupLoading = false;
      state.coachingSignupError = null;
    },
  },
  extraReducers: {
    [GrowthCoachingSignup.pending]: (state, action) => {
      state.coachingSignupLoading = true;
      state.coachingSignupError = null;
    },
    [GrowthCoachingSignup.fulfilled]: (state, action) => {
      state.coachingSignup = action.payload;
      state.coachingSignupLoading = false;
      state.coachingSignupError = null;
    },
    [GrowthCoachingSignup.rejected]: (state, action) => {
      state.coachingSignupLoading = false;
      if (action.payload) {
        state.coachingSignupError = action?.payload?.error?.message;
      } else {
        state.coachingSignupError = action.error;
      }
    },
  },
});

export const {resetCoachingSignup} = CoachingSignupSlice.actions;
export default CoachingSignupSlice.reducer;
