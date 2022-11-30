import {position} from 'native-base/lib/typescript/theme/styled-system';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Switch,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToastMessage from '../../../shared/toast';
import {useFormik} from 'formik';
import Loading from '../../../shared/loading';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';

const Notification = props => {
  const {
    navigation,
    route,
    profile,
    profileLoading,
    profileError,
    fetchProfile,
    cleanProfile,

    notificationOptions,
    notificationOptionLoading,
    notificationOptionError,
    fetchNotificationOption,

    updateNotification,
    updateNotificationLoading,
    updateNotificationError,
    updateUserNotification,
  } = props;

  const [contentEnabled, setContentEnabled] = useState(
    notificationOptions?.content_notification === '1' ? true : false,
  );
  const [eventEnabled, setEventEnabled] = useState(
    notificationOptions?.event_notification === '1' ? true : false,
  );
  const [memberEnabled, setMemberEnabled] = useState(
    notificationOptions?.member_connection_add_delete_notification === '1'
      ? true
      : false,
  );
  const [chatEnabled, setChatEnabled] = useState(
    notificationOptions?.chat_notification === '1' ? true : false,
  );

  console.log(
    'contentEnabled',
    contentEnabled,
    'eventEnabled',
    eventEnabled,
    'memberEnabled',
    memberEnabled,
  );
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    setErrors,
    touched,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues: {
      event_notification: eventEnabled,
      member_connection_add_delete_notification: memberEnabled,
      chat_notification: chatEnabled,
      content_notification: contentEnabled,
    },
    onSubmit: async values => {
      console.log({values});
      await updateUserNotification(values).then(response => {
        console.log(response);
      });
    },
  });

  const contentSwitch = () => {
    setFieldValue('content_notification', !contentEnabled);

    setFieldValue('event_notification', eventEnabled);
    setFieldValue('member_connection_add_delete_notification', memberEnabled);
    setFieldValue('chat_notification', chatEnabled);

    setContentEnabled(!contentEnabled);
    handleSubmit();
  };

  const eventSwitch = () => {
    setFieldValue('event_notification', !eventEnabled);

    setFieldValue('member_connection_add_delete_notification', memberEnabled);
    setFieldValue('chat_notification', chatEnabled);
    setFieldValue('content_notification', contentEnabled);

    setEventEnabled(!eventEnabled);
    handleSubmit();
  };

  const memberSwitch = () => {
    setFieldValue('member_connection_add_delete_notification', !memberEnabled);

    setFieldValue('content_notification', contentEnabled);
    setFieldValue('chat_notification', chatEnabled);
    setFieldValue('event_notification', eventEnabled);

    setMemberEnabled(!memberEnabled);
    handleSubmit();
  };

  const chatSwitch = () => {
    setFieldValue('chat_notification', !chatEnabled);

    setFieldValue('event_notification', eventEnabled);
    setFieldValue('content_notification', contentEnabled);
    setFieldValue('member_connection_add_delete_notification', memberEnabled);

    setChatEnabled(!chatEnabled);
    handleSubmit();
  };

  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfile();
    };
    fetchProfileAsync();
  }, []);

  useEffect(() => {
    fetchNotificationOption();
  }, []);

  useEffect(() => {
    setContentEnabled(
      notificationOptions?.content_notification === '1' ? true : false,
    );
    setEventEnabled(
      notificationOptions?.event_notification === '1' ? true : false,
    );
    setChatEnabled(
      notificationOptions?.chat_notification === '1' ? true : false,
    );
    setMemberEnabled(
      notificationOptions?.member_connection_add_delete_notification === '1'
        ? true
        : false,
    );
  }, [notificationOptions]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.y;
          if (offset >= 70) {
            navigation.setOptions({
              headerShown: false,
            });
          } else {
            navigation.setOptions({
              headerShown: true,
            });
          }
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: PRIMARY_BACKGROUND_COLOR,
        }}>
        <View
          style={{backgroundColor: PRIMARY_BACKGROUND_COLOR, width: '100%'}}>
          <Image
            source={require('../../../assets/img/appBG.png')}
            style={{
              height: Dimensions.get('screen').height / 4,
              paddingTop: Dimensions.get('screen').height / 8,
            }}
          />
          <View
            style={{
              display: 'flex',
              marginTop: -80,
              alignContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <View
              style={{
                padding: 20,
                alignItems: 'center',
                width: 328,
                backgroundColor: PRIMARY_BACKGROUND_COLOR,
                borderRadius: 12,
                position: 'relative',
                paddingTop: 100,
                borderWidth: 1,
                borderColor: '#707070',
              }}>
              <View style={styles.icon}>
                <Image
                  source={{uri: profile.avatar}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.header}>
                <Text style={styles.headingText1}>{profile?.user_login}</Text>
                <Text style={{color: '#222B45'}}>
                  {profile?.user_meta?.title === undefined
                    ? profile?.user_meta?.Title[0]
                    : profile?.user_meta?.title[0]}
                </Text>
              </View>
            </View>
          </View>
          {updateNotificationLoading && <Loading />}
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <View style={styles.middleWrapper}>
                <View style={styles.middleImage}>
                  <Ionicons name="person-outline" color="white" size={20} />
                </View>
                <Text style={styles.text}>Event</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#32a32e'}}
                  thumbColor={eventEnabled ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={eventSwitch}
                  value={eventEnabled}
                  style={{
                    right: 0,
                    position: 'absolute',
                  }}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <View style={styles.middleWrapper}>
                <View style={styles.middleImage}>
                  <Ionicons name="person-outline" color="white" size={20} />
                </View>
                <Text style={styles.text}>New Member</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#32a32e'}}
                  thumbColor={memberEnabled ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={memberSwitch}
                  value={memberEnabled}
                  style={{
                    right: 0,
                    position: 'absolute',
                  }}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <View style={styles.middleWrapper}>
                <View style={styles.middleImage}>
                  <Ionicons name="person-outline" color="white" size={20} />
                </View>
                <Text style={styles.text}>Chat</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#32a32e'}}
                  thumbColor={chatEnabled ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={chatSwitch}
                  value={chatEnabled}
                  style={{
                    right: 0,
                    position: 'absolute',
                  }}
                />
              </View>
            </View>
            <View style={styles.wrapper}>
              <View style={styles.middleWrapper}>
                <View style={styles.middleImage}>
                  <Ionicons name="person-outline" color="white" size={20} />
                </View>
                <Text style={styles.text}>Content</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#32a32e'}}
                  thumbColor={contentEnabled ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={contentSwitch}
                  value={contentEnabled}
                  style={{
                    right: 0,
                    position: 'absolute',
                  }}
                />
              </View>
            </View>
            <View></View>
          </View>
        </View>

        {/* <Footer /> */}
      </ScrollView>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    // ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingTop: 10,
    paddingLeft: Platform.OS === 'ios' ? 40 : 50,
    paddingRight: Platform.OS === 'ios' ? 40 : 50,
  },
  header: {
    alignItems: 'center',
  },
  icon: {
    width: 110,
    height: 110,
    borderColor: PRIMARY_BACKGROUND_COLOR,
    borderRadius: 16,
    borderWidth: 3,
    overflow: 'hidden',
    position: 'absolute',
    top: -35,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
    color: '#222B45',
  },

  wrapper: {
    // marginTop: 5,
    // borderBottomColor: '#d7d7d7',
  },
  middleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0,
    alignItems: 'center',

    position: 'relative',
  },

  middleImage: {
    width: 40,
    height: 40,
    backgroundColor: '#3A9BDC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
    margin: 15,
    color: '#222B45',
  },
  subWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    position: 'relative',
  },
  subText: {
    fontSize: 16,
    marginTop: 15,
    color: '#222B45',
  },

  moreButton: {
    width: 134,
    marginTop: 30,
    borderRadius: 10,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COMMUNITY_COLOR,
    marginLeft: 5,
  },
  moreButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
});
