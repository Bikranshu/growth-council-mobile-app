import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import NotificationList from './components/notificationList';

const NotificationListScreen = props => {
  const dispatch = useDispatch();

  return <NotificationList {...props} />;
};

export default NotificationListScreen;
