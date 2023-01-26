import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Chat from './components';
import {
  sendNotificationByUserID,
  resetNotification,
} from './slice/notificationSlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

const ChatScreen = props => {
  const dispatch = useDispatch();

  const {notifications, notificationLoading, notificationError} = useSelector(
    state => state.notifications,
  );

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  /**
   * Send notification connected member.
   * @param {object} formData
   *
   */
  const sendNotificationByIdentifier = formData => {
    return dispatch(sendNotificationByUserID(formData));
  };

  /**
   * Clear connect member notification.
   *
   */
  const cleanNotification = () => {
    dispatch(resetNotification());
  };

  const fetchProfileByIdentifier = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };
  return (
    <Chat
      {...props}
      notifications={notifications}
      notificationLoading={notificationLoading}
      notificationError={notificationError}
      sendNotificationByIdentifier={sendNotificationByIdentifier}
      cleanNotification={cleanNotification}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfileByIdentifier={fetchProfileByIdentifier}
      cleanProfile={cleanProfile}
    />
  );
};

export default ChatScreen;
