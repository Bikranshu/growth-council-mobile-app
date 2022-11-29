import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Discussion from './component';
import {
  discussionByEventID,
  resetDiscussionForum,
} from './slice/discussionByEventIDSlice';

const DiscussionScreen = props => {
  const dispatch = useDispatch();

  const {discussionForum, discussionForumLoading, discussionForumError} =
    useSelector(state => state.discussionForum);

  const discussionForumByIdentifier = formData => {
    return dispatch(discussionByEventID(formData));
  };

  const cleanForum = () => {
    dispatch(resetDiscussionForum());
  };
  return (
    <Discussion
      {...props}
      discussionForum={discussionForum}
      discussionForumLoading={discussionForumLoading}
      discussionForumError={discussionForumError}
      discussionForumByIdentifier={discussionForumByIdentifier}
      cleanForum={cleanForum}
    />
  );
};

export default DiscussionScreen;
