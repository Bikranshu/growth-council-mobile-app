import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Notification from './components';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {fetchNotificationOptions} from './slice/notificationOptionsSlice';

const NotificationScreen = props => {
  const dispatch = useDispatch();

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const {
    notificationOptions,
    notificationOptionLoading,
    notificationOptionError,
  } = useSelector(state => state.notificationOptions);

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  const fetchNotificationOption = () => {
    dispatch(fetchNotificationOptions());
  };

  useEffect(() => {
    fetchNotificationOption();
  }, []);

  return (
    <Notification
      {...props}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
      notificationOptions={notificationOptions}
      notificationOptionLoading={notificationOptionLoading}
      notificationOptionError={notificationOptionError}
    />
  );
};

export default NotificationScreen;
