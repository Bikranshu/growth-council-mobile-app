import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Badge} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getNotificationList} from '../../screens/Notification/slice/notificationListSlice';

const HeaderRight = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {navigation, profile} = props;
  const {notificationList, notificationListLoading, notificationListError} =
    useSelector(state => state.notificationList);

  useEffect(() => {
    dispatch(getNotificationList({id: profile?.ID}));
  }, []);

  //getting the length of notification whose status is 0
  const unreadNotifications1 = notificationList?.filter(
    notification => notification?.status === '0',
  );
  const unreadCount = unreadNotifications1?.length;

  const [unreadNotifications, setUnreadNotifications] = useState(unreadCount);

  useEffect(() => {
    // Code to retrieve the number of unread notifications from the database or local storage goes here
    // Example value
    setUnreadNotifications(unreadCount);
  }, [isFocused]);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        style={{marginRight: 8}}
        onPress={() => navigation.navigate('NotificationList')}>
        <Ionicons name="notifications" color="white" size={28} />
        <Badge visible={true} size={15} style={{top: 0, position: 'absolute'}}>
          {unreadNotifications}
        </Badge>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginRight: 8}}
        onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search-outline" color={'white'} size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{height: 40, width: 40, borderRadius: 20}}
        onPress={() => navigation.navigate('Account')}>
        <View>
          <Image
            source={{
              uri: profile?.profile_image,
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
