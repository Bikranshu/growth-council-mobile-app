import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Discussion from './component';
import {
  discussionByEventID,
  resetDiscussionForum,
} from './slice/discussionByEventIDSlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {
  postDiscussionByEventID,
  resetPostDiscussion,
} from './slice/postDiscussionByEventIDSlice';
import {
  deleteDiscussionByEventID,
  resetDeleteDiscusssion,
} from './slice/deleteDiscussionByEventIDSlice';

const DiscussionScreen = props => {
  const dispatch = useDispatch();

  const {discussionForum, discussionForumLoading, discussionForumError} =
    useSelector(state => state.discussionForum);
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const {postDiscussion, postDiscussionLoading, postDiscussionError} =
    useSelector(state => state.postDiscussion);
  const {deleteDiscusssion, deleteDiscusssionLoading, deleteDiscusssionError} =
    useSelector(state => state.deleteDiscussion);

  const discussionForumByIdentifier = formData => {
    return dispatch(discussionByEventID(formData));
  };

  const cleanForum = () => {
    dispatch(resetDiscussionForum());
  };

  const postDiscussionByEvent = formData => {
    return dispatch(postDiscussionByEventID(formData));
  };

  const cleanPostDiscussion = () => {
    dispatch(resetPostDiscussion());
  };
  const deleteDiscussionByIndentifier = formData => {
    return dispatch(deleteDiscussionByEventID(formData));
  };

  const cleanDeleteDiscussion = () => {
    dispatch(resetDeleteDiscusssion());
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
      postDiscussion={postDiscussion}
      postDiscussionLoading={postDiscussionLoading}
      postDiscussionByEvent={postDiscussionByEvent}
      cleanPostDiscussion={cleanPostDiscussion}
      deleteDiscussion={deleteDiscusssion}
      deleteDiscusssionLoading={deleteDiscusssionLoading}
      deleteDiscussionByIndentifier={deleteDiscussionByIndentifier}
      cleanDeleteDiscussion={cleanDeleteDiscussion}
    />
  );
};

export default DiscussionScreen;
