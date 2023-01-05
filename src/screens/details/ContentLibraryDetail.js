import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ContentLibraryDetail from './components/ContentLibraryDetail';

import {
  fetchAllContentLibraryDetails,
  resetContentLibraryDetails,
} from './slice/contentLibraryDetailSlice';
import {
  sendEmailThroughButton,
  resetsendEmail,
} from '../event/slice/emailButtonSlice';
import {ContentArticle, resetArticle} from './slice/articleSlice';

const ContentLibraryDetailScreen = props => {
  const dispatch = useDispatch();

  const {
    contentLibraryDetails,
    contentLibraryDetailsLoading,
    contentLibraryDetailsError,
  } = useSelector(state => state.contentLibraryDetails);
  const {sendEmail, sendEmailLoading, sendEmailError} = useSelector(
    state => state.sendEmail,
  );

  const {article, articleLoading, articleError} = useSelector(
    state => state.article,
  );

  const fetchContentLibraryDetail = id => {
    dispatch(fetchAllContentLibraryDetails(id));
  };

  const cleanContentLibraryDetail = () => {
    dispatch(resetContentLibraryDetails());
  };

  /**
   * Send email through button.
   * @param {object} formData
   *
   */
  const sendEmailThroughButtons = formData => {
    return dispatch(sendEmailThroughButton(formData));
  };

  const cleanSendEmail = () => {
    dispatch(resetsendEmail());
  };

  const ContentLibraryArticle = formData => {
    return dispatch(ContentArticle(formData));
  };

  return (
    <ContentLibraryDetail
      {...props}
      contentLibraryDetails={contentLibraryDetails}
      contentLibraryDetailsLoading={contentLibraryDetailsLoading}
      contentLibraryDetailsError={contentLibraryDetailsError}
      fetchContentLibraryDetail={fetchContentLibraryDetail}
      cleanContentLibraryDetail={cleanContentLibraryDetail}
      // Send Email
      sendEmail={sendEmail}
      sendEmailLoading={sendEmailLoading}
      sendEmailError={sendEmailError}
      sendEmailThroughButtons={sendEmailThroughButtons}
      cleanSendEmail={cleanSendEmail}
      article={article}
      articleLoading={articleLoading}
      articleError={articleError}
      ContentLibraryArticle={ContentLibraryArticle}
    />
  );
};

export default ContentLibraryDetailScreen;
