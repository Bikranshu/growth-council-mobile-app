import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {store} from '../../../utils/httpUtil';

export const ContentArticle = createAsyncThunk(
  'article/ContentArticle',
  (formData, {rejectWithValue}) => {
    return store(`jwt-auth/v1/content-library/feedback`, formData)
      .then(response => response.data)
      .catch(error => rejectWithValue(error?.response?.data || error));
  },
);

const ArticleSlice = createSlice({
  name: 'article',
  initialState: {
    article: [],
    articleLoading: false,
    articleError: null,
  },
  reducers: {
    resetArticle: state => {
      state.article = [];
      state.articleLoading = false;
      state.articleError = null;
    },
  },
  extraReducers: {
    [ContentArticle.pending]: (state, action) => {
      state.articleLoading = true;
      state.articleError = null;
    },
    [ContentArticle.fulfilled]: (state, action) => {
      state.article = action.payload;
      state.articleLoading = false;
      state.articleError = null;
    },
    [ContentArticle.rejected]: (state, action) => {
      state.articleLoading = false;
      if (action.payload) {
        state.articleError = action?.payload?.error?.message;
      } else {
        state.articleError = action.error;
      }
    },
  },
});

export const {resetArticle} = ArticleSlice.actions;
export default ArticleSlice.reducer;
