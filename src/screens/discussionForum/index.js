import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Discussion from './component';
import {
  discussionByEventID,
  resetDiscussionForum,
} from './slice/discussionByEventIDSlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

const DiscussionScreen = props => {
  const dispatch = useDispatch();

  const {discussionForum, discussionForumLoading, discussionForumError} =
    useSelector(state => state.discussionForum);
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const discussionForumByIdentifier = formData => {
    return dispatch(discussionByEventID(formData));
  };

  const cleanForum = () => {
    dispatch(resetDiscussionForum());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };
  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  return (
    <Discussion
      {...props}
      discussionForum={discussionForum}
      discussionForumLoading={discussionForumLoading}
      discussionForumError={discussionForumError}
      discussionForumByIdentifier={discussionForumByIdentifier}
      cleanForum={cleanForum}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
    />
  );
};

export default DiscussionScreen;
