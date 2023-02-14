import {position} from 'native-base/lib/typescript/theme/styled-system';
import {Badge} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {
  COMMUNITY_COLOR,
  PRIMARY_TEXT_COLOR,
  SECONDARY_TEXT_COLOR,
} from '../../../theme/colors';
import ToastMessage from '../../../shared/toast';

const NotificationList = props => {
  const {
    navigation,
    route,
    profile,
    profileLoading,
    notificationList,
    notificationListLoading,
    getNotificationLists,
    cleanNotificationLists,

    notificationStatus,
    notificationStatusLoading,
    notificationStatusUpdate,
    cleanNotificationStatus,
  } = props;

  const [status, setstatus] = useState([]);

  useEffect(() => {
    getNotificationLists({
      id: profile?.ID,
    });
  }, []);

  useEffect(() => {
    setstatus(notificationList);
  }, [notificationList]);

  const notificationStatusUpdateButton = async (notificationId, index) => {
    const response = await notificationStatusUpdate({
      notification_id: notificationId,
    });

    // if (response?.payload?.code === 200) {
    //   ToastMessage.show(response?.payload?.message);
    // } else {
    //   ToastMessage.show(response?.payload?.message);
    // }
  };

  const _renderItem = ({item, index}) => {
    // get the device's timezone
    const deviceTimezone = moment?.tz?.guess();
    const londonTimezone = 'America/New_York'; //dublin is london so we set notification triggered date timezone as 'Europe/london'

    const triggeredDate = moment?.tz(item?.triggered_date, londonTimezone);
    // console.log({triggeredDate});

    const deviceDate = triggeredDate
      .tz(deviceTimezone)
      .format('YYYY-MM-DD ddd HH:mm:ss');

    // console.log({deviceDate});
    let content = require('../../../assets/img/Content_Icon.png');
    let chat = require('../../../assets/img/Chat_Message_Icon.png');
    let event = require('../../../assets/img/Event_Calendar_Icon.png');
    let member = require('../../../assets/img/Member_Connection_icon.png');

    let backgroundImage = '';
    let pillarname = '';

    if (
      'Growth Coaching'?.indexOf(item?.event_categories) > -1 === false ||
      'Executive Coaching Clinic'?.indexOf(item?.event_categories) > -1 ===
        false
    ) {
      backgroundImage = require('../../../assets/img/Rectangle2.png');
      pillarname = 'Growth Community';
    } else {
      backgroundImage = require('../../../assets/img/Rectangle.png');
      pillarname = 'Growth Coaching';
    }

    return (
      <TouchableOpacity
        onPress={() => {
          if (item?.notification_type === 'event_notification') {
            navigation.navigate('EventDetail', {
              id: item?.event_id,
              title: pillarname,
              image: backgroundImage,
            });
          } else if (item?.notification_type === 'Content_notification') {
            navigation.navigate('ContentLibraryDetail', {
              id: item?.event_id,
            });
          }

          notificationStatusUpdateButton(item?.id, index);
        }}>
        <View style={[styles.bottomWrapper, styles.shadowProp]}>
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              backgroundColor: '#f0f0f8',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                item?.notification_type === 'Content_notification'
                  ? content
                  : item?.notification_type === 'event_notification'
                  ? event
                  : item?.notification_type === 'chat_notification'
                  ? chat
                  : member
              }
              style={{width: 40, height: 40}}
              resizeMode="center"
            />
          </View>

          <View
            style={{
              padding: 5,
              paddingLeft: 15,
              width: Dimensions.get('window').width / 2 + 80,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#030303',
                marginTop: 3,
              }}>
              {item?.notification_title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#A9A9A9',
                marginTop: 3,
              }}>
              {item?.notification_content}
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: '#A9A9A9',
                marginTop: 3,
                // position: 'absolute',
                // right: 0,
                // bottom: 0,
              }}>
              {deviceDate}
            </Text>
          </View>
          {item?.status === '0' && (
            <View
              style={{
                position: 'absolute',
                left: 3,
                top: 3,
              }}>
              <Badge style={{backgroundColor: '#14a2e2'}} size={15} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <View style={{marginTop: 5, padding: 5}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            margin: 5,
            marginVertical: 10,
            color: '#222B45',
          }}>
          Recent Notification
        </Text>
        <FlatList data={notificationList} renderItem={_renderItem} />
      </View>
    </>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  bottomWrapper: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 20,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    height: 100,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
