import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Content from './component';
import {fetchAllContent, resetContent} from './slice/contentSlice';
import {
  searchContentByKey,
  resetSearchContent,
} from './slice/searchContentSlice';
import useLoader from '../loading/useLoader';

const ContentScreen = props => {
  const dispatch = useDispatch();
  const [loader, showLoader, hideLoader] = useLoader();

  const {content, contentLoading, contentError} = useSelector(
    state => state.content,
  );

  const {searchContent, searchContentLoading, searchContentError} = useSelector(
    state => state.searchContent,
  );

  useEffect(() => {
    dispatch(fetchAllContent());
  }, []);


  const cleanContent = () => {
    dispatch(resetContent());
  };

  const searchContentByIdentifier = formData => {
    return dispatch(searchContentByKey(formData));
  };

  const cleanContentSearch = () => {
    dispatch(resetSearchContent());
  };



  return (
    <Content
      {...props}
      content={content}
      contentLoading={contentLoading}
      contentError={contentError}
	  loader={loader}
    //   fetchContent={fetchContent}
      cleanContent={cleanContent}
      searchContent={searchContent}
      searchContentLoading={searchContentLoading}
      searchContentError={searchContentError}
      searchContentByIdentifier={searchContentByIdentifier}
      cleanContentSearch={cleanContentSearch}
    />
  );
};

export default ContentScreen;
