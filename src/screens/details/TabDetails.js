import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TabDetail from './components/TabDetails';

import {
  fetchAllContentLibraryDetails,
  resetContentLibraryDetails,
} from './slice/contentLibraryDetailSlice';

const TabDetailScreen = props => {
  const dispatch = useDispatch();

  const {
    contentLibraryDetails,
    contentLibraryDetailsLoading,
    contentLibraryDetailsError,
  } = useSelector(state => state.contentLibraryDetails);

  const fetchContentLibraryDetail = id => {
    dispatch(fetchAllContentLibraryDetails(id));
  };

  const cleanContentLibraryDetail = () => {
    dispatch(resetContentLibraryDetails());
  };

  return (
    <TabDetail
      {...props}
      contentLibraryDetails={contentLibraryDetails}
      contentLibraryDetailsLoading={contentLibraryDetailsLoading}
      contentLibraryDetailsError={contentLibraryDetailsError}
      fetchContentLibraryDetail={fetchContentLibraryDetail}
      cleanContentLibraryDetail={cleanContentLibraryDetail}
    />
  );
};

export default TabDetailScreen;
