import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  RefreshControl,
  FlatList,
  Modal,
} from 'react-native';

import moment from 'moment-timezone';
import {Badge} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationList = props => {
  const {
    navigation,
    route,
    profile,
    profileLoading,
    fetchProfileByID,
    notificationList,
    notificationListLoading,
    getNotificationLists,
    cleanNotificationLists,

    notificationStatus,
    notificationStatusLoading,
    notificationStatusUpdate,
    cleanNotificationStatus,
  } = props;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [filter, setFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  // data refresh when we scroll up by call the api
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotificationLists({
      id: profile?.ID,
    });
    dispatch(fetchProfileByID());

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  //fetch data of profile list because we are showing notification data according the user so we need profile data
  useEffect(() => {
    dispatch(fetchProfileByID());
  }, [isFocused]);

  //fetch data of notification list using profile id
  useEffect(() => {
    getNotificationLists({
      id: profile?.ID,
    });
  }, [profile, isFocused]);

  // notification status update api when click on unread notification, it change the status to read notification
  const notificationStatusUpdateButton = async (notificationId, index) => {
    const response = await notificationStatusUpdate({
      notification_id: notificationId,
    });
  };

  //function to set the dropdown
  const handleFilterChange = value => {
    setFilter(value);
  };

  // function to sort notification data according to picker value
  const filteredNotifications =
    filter === 'All'
      ? notificationList
      : notificationList?.filter(
          notification =>
            notification.status === (filter === 'Read' ? '1' : '0'),
        );

  const _renderItem = ({item, index}) => {
    // get the device's timezone
    const deviceTimezone = moment?.tz?.guess();
    const Timezone = 'America/New_York'; //dublin is london so we set notification triggered date timezone as 'Europe/london'

    const triggeredDate = moment?.tz(item?.triggered_date, Timezone);

    const deviceDate = triggeredDate
      .tz(deviceTimezone)
      .format('MMM, DD ddd, HH:mm:ss');

    // icon for notification list
    let content = require('../../../assets/img/Content_Icon.png');
    let chat = require('../../../assets/img/Chat_Message_Icon.png');
    let event = require('../../../assets/img/Event_Calendar_Icon.png');
    let member = require('../../../assets/img/Member_Connection_icon.png');

    let backgroundImage = '';
    let pillarname = '';
    let GrowthCoaching = 'Growth Coaching';
    let Executive = 'Executive Coaching Clinic';

    //passing the header value like backgroundImage and pillarname when redirect to respective page when click notification list
    if (
      item?.event_categories?.indexOf(GrowthCoaching) > -1 !== false ||
      item?.event_categories?.indexOf(Executive) > -1 !== false ||
      item?.event_categories === '[]'
    ) {
      backgroundImage = require('../../../assets/img/Rectangle.png');
      pillarname = 'Growth Coaching';
    } else {
      backgroundImage = require('../../../assets/img/Rectangle2.png');
      pillarname = 'Growth Community';
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
          } else if (item?.notification_type === 'chat_notification') {
            navigation.navigate('Chat', {
              friendID: item?.sender_user_id,
              friendName: item?.receiver_fullname,
              friendAvatar: item?.receiver_profile_image,
              userID: item?.receiver_user_id,
              userName: profile?.user_login,
              userAvatar: profile?.profile_image,
            });
          } else {
            navigation.navigate('People');
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
              style={{width: 30, height: 30}}
              resizeMode="contain"
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
              }}>
              {deviceDate}
            </Text>
          </View>

          {/* badge when notification status value is unread */}
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
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
          }}>
          <ScrollView
            style={{marginTop: 5, padding: 5, flex: 1}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              style={[styles.picker, styles.shadowProp]}>
              <Text style={{fontSize: 14, color: 'black'}}>{filter}</Text>

              <Ionicons
                name="chevron-down-outline"
                size={20}
                color="black"
                style={{position: 'absolute', right: 15, top: 12}}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                margin: 5,
                marginTop: 20,
                marginVertical: 10,
                color: '#222B45',
              }}>
              Recent Notification
            </Text>
            <FlatList
              data={filteredNotifications}
              renderItem={_renderItem}
              inverted={true}
            />
          </ScrollView>
        </View>

        <Modal transparent visible={pickerVisible}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(56,56,56,0.3)',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                height: 300,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPickerVisible(false)}
                style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    padding: 15,
                    fontSize: 18,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>

              <View>
                <Picker
                  selectedValue={filter}
                  mode="dropdown"
                  itemTextStyle={{fontSize: 14}}
                  onValueChange={handleFilterChange}>
                  <Picker.Item label="All" value="All" style={{fontSize: 14}} />
                  <Picker.Item
                    label="Read"
                    value="Read"
                    style={{fontSize: 14}}
                  />
                  <Picker.Item
                    label="Unread"
                    value="Unread"
                    style={{fontSize: 14}}
                  />
                </Picker>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
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
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
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
