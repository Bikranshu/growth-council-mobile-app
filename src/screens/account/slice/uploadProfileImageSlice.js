import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {uploadImage} from '../../../utils/httpUtil';

export const uploadProfileImage = createAsyncThunk(
  'profile_image/upload',
  (formData, {rejectWithValue}) => {
    return uploadImage(`jwt-auth/v1/user/new_image_upload`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const uploadProfileImageSlice = createSlice({
  name: 'uploadProfileImage',
  initialState: {
    uploadProfileImages: [],
    uploadProfileImageLoading: false,
    uploadProfileImageError: null,
  },
  reducers: {
    resetUploadProfileImage: state => {
      state.uploadProfileImages = [];
      state.uploadProfileImageLoading = false;
      state.uploadProfileImageError = null;
    },
  },
  extraReducers: {
    [uploadProfileImage.pending]: (state, action) => {
      state.uploadProfileImageLoading = true;
      state.uploadProfileImageError = {};
    },
    [uploadProfileImage.fulfilled]: (state, action) => {
      state.uploadProfileImages = action.payload;
      state.uploadProfileImageLoading = false;
    },
    [uploadProfileImage.rejected]: (state, action) => {
      state.uploadProfileImageLoading = false;
      if (action.payload) {
        state.uploadProfileImageError = action.payload;
      } else {
        state.uploadProfileImageError = action.error;
      }
    },
  },
});

export const {resetUploadProfileImage} = uploadProfileImageSlice.actions;

export default uploadProfileImageSlice.reducer;
