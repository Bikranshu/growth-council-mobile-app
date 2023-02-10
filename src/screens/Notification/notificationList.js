import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import NotificationList from './components/notificationList';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {
  getNotificationList,
  resetnotificationList,
} from './slice/notificationListSlice';

const NotificationListScreen = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const {notificationList, notificationListLoading, notificationListError} =
    useSelector(state => state.notificationList);

  useEffect(() => {
    dispatch(fetchProfileByID());
  }, []);

  const getNotificationLists = formData => {
    dispatch(getNotificationList(formData));
  };

  const cleanNotificationLists = () => {
    dispatch(resetnotificationList());
  };
  return (
    <NotificationList
      {...props}
      profile={profile}
      profileLoading={profileLoading}
      notificationList={notificationList}
      notificationListLoading={notificationListLoading}
      getNotificationLists={getNotificationLists}
      cleanNotificationLists={cleanNotificationLists}
    />
  );
};

export default NotificationListScreen;