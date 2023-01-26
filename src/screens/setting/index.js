import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Setting from './components';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {fetchNotificationOptions} from '../Notification/slice/notificationOptionsSlice';
import {updateNotificationByUser} from '../Notification/slice/updateNotificationSlice';

const SettingScreen = props => {
  const dispatch = useDispatch();

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const {
    notificationOptions,
    notificationOptionLoading,
    notificationOptionError,
  } = useSelector(state => state.notificationOptions);

  const {
    updateNotification,
    updateNotificationLoading,
    updateNotificationError,
  } = useSelector(state => state.updateNotification);

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  const fetchNotificationOption = () => {
    dispatch(fetchNotificationOptions());
  };

  const updateUserNotification = formData => {
    return dispatch(updateNotificationByUser(formData));
  };

  return (
    <Setting
      {...props}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
      notificationOptions={notificationOptions}
      notificationOptionLoading={notificationOptionLoading}
      notificationOptionError={notificationOptionError}
      fetchNotificationOption={fetchNotificationOption}
      updateNotification={updateNotification}
      updateNotificationLoading={updateNotificationLoading}
      updateNotificationError={updateNotificationError}
      updateUserNotification={updateUserNotification}
    />
  );
};

export default SettingScreen;
