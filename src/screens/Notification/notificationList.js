import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import NotificationList from './components/notificationList';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {
  getNotificationList,
  resetnotificationList,
} from './slice/notificationListSlice';
import {
  updateNotificationStatus,
  resetnotificationStatus,
} from './slice/notificationStatusUpdateSlice';

const NotificationListScreen = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const {notificationList, notificationListLoading, notificationListError} =
    useSelector(state => state.notificationList);
  const {
    notificationStatus,
    notificationStatusLoading,
    notificationStatusError,
  } = useSelector(state => state.notificationStatus);

  useEffect(() => {
    dispatch(fetchProfileByID());
  }, []);

  const getNotificationLists = formData => {
    dispatch(getNotificationList(formData));
  };

  const cleanNotificationLists = () => {
    dispatch(resetnotificationList());
  };

  const notificationStatusUpdate = formData => {
    return dispatch(updateNotificationStatus(formData));
  };

  const cleanNotificationStatus = () => {
    dispatch(resetnotificationStatus());
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
      notificationStatus={notificationStatus}
      notificationStatusLoading={notificationStatusLoading}
      notificationStatusUpdate={notificationStatusUpdate}
      cleanNotificationStatus={cleanNotificationStatus}
    />
  );
};

export default NotificationListScreen;
