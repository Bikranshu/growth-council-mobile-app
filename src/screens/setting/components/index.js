import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Switch,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';

import {useFormik} from 'formik';
import {Button} from 'native-base';
import {List} from 'react-native-paper';
import analytics from '@react-native-firebase/analytics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Footer from '../../../shared/footer';
import Loading from '../../../shared/loading';
import ToastMessage from '../../../shared/toast';
import FloatingButton from '../../../shared/floatingButton';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import {CommonStyles, Colors, Typography} from '../../../theme';

const Setting = props => {
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

  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const [contentEnabled, setContentEnabled] = useState(
    notificationOptions?.content_notification === '0' ||
      notificationOptions?.content_notification === ''
      ? false
      : true,
  );
  const [eventEnabled, setEventEnabled] = useState(
    notificationOptions?.event_notification === '0' ||
      notificationOptions?.event_notification === ''
      ? false
      : true,
  );
  const [memberEnabled, setMemberEnabled] = useState(
    notificationOptions?.member_connection_add_delete_notification === '0' ||
      notificationOptions?.member_connection_add_delete_notification === ''
      ? false
      : true,
  );
  const [chatEnabled, setChatEnabled] = useState(
    notificationOptions?.chat_notification === '0' ||
      notificationOptions?.chat_notification === ''
      ? false
      : true,
  );

  const [boardEnabled, setBoardEnabled] = useState(
    notificationOptions?.discussion_board_notification === '0' ||
      notificationOptions?.discussion_board_notification === ''
      ? false
      : true,
  );
  const [regEvents, setRegEvents] = useState(
    notificationOptions?.registered_event_notification === '0' ||
      notificationOptions?.registered_event_notification === ''
      ? false
      : true,
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
      registered_event_notification: regEvents,
    },
    onSubmit: async values => {
      await updateUserNotification(values).then(response => {
        ToastMessage.show(
          'You have successfully updated your notification settings',
        );
      });
    },
  });

  const contentSwitch = () => {
    setFieldValue('content_notification', !contentEnabled);

    setFieldValue('event_notification', eventEnabled);
    setFieldValue('member_connection_add_delete_notification', memberEnabled);
    setFieldValue('chat_notification', chatEnabled);
    setFieldValue('registered_event_notification', regEvents);

    setContentEnabled(!contentEnabled);
    // handleSubmit();
  };

  const eventSwitch = () => {
    setFieldValue('event_notification', !eventEnabled);

    setFieldValue('member_connection_add_delete_notification', memberEnabled);
    setFieldValue('chat_notification', chatEnabled);
    setFieldValue('content_notification', contentEnabled);
    setFieldValue('registered_event_notification', regEvents);

    setEventEnabled(!eventEnabled);
    // handleSubmit();
  };

  const memberSwitch = () => {
    setFieldValue('member_connection_add_delete_notification', !memberEnabled);

    setFieldValue('content_notification', contentEnabled);
    setFieldValue('chat_notification', chatEnabled);
    setFieldValue('event_notification', eventEnabled);
    setFieldValue('registered_event_notification', regEvents);

    setMemberEnabled(!memberEnabled);
    // handleSubmit();
  };

  const chatSwitch = () => {
    setFieldValue('chat_notification', !chatEnabled);

    setFieldValue('event_notification', eventEnabled);
    setFieldValue('content_notification', contentEnabled);
    setFieldValue('member_connection_add_delete_notification', memberEnabled);
    setFieldValue('registered_event_notification', regEvents);

    setChatEnabled(!chatEnabled);
    // handleSubmit();
  };

  const boardSwitch = () => {
    setFieldValue('discussion_board_notification', !boardEnabled);

    setFieldValue('chat_notification', chatEnabled);
    setFieldValue('event_notification', eventEnabled);
    setFieldValue('content_notification', contentEnabled);
    setFieldValue('member_connection_add_delete_notification', memberEnabled);

    setBoardEnabled(!boardEnabled);
    // handleSubmit();
  };

  const regEventSwitch = () => {
    setFieldValue('registered_event_notification', !regEvents);

    setFieldValue('chat_notification', chatEnabled);
    setFieldValue('event_notification', eventEnabled);
    setFieldValue('content_notification', contentEnabled);
    setFieldValue('member_connection_add_delete_notification', memberEnabled);

    setRegEvents(!regEvents);
    // handleSubmit();
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
      notificationOptions?.content_notification === '0' ||
        notificationOptions?.content_notification === ''
        ? false
        : true,
    );
    setEventEnabled(
      notificationOptions?.event_notification === '0' ||
        notificationOptions?.event_notification === ''
        ? false
        : true,
    );
    setChatEnabled(
      notificationOptions?.chat_notification === '0' ||
        notificationOptions?.chat_notification === ''
        ? false
        : true,
    );
    setMemberEnabled(
      notificationOptions?.member_connection_add_delete_notification === '0' ||
        notificationOptions?.member_connection_add_delete_notification === ''
        ? false
        : true,
    );
    setRegEvents(
      notificationOptions?.registered_event_notification === '0' ||
        notificationOptions?.registered_event_notification === ''
        ? false
        : true,
    );
  }, [notificationOptions]);

  return (
    <View style={{flex: 1}}>
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

          <View style={styles.container}>
            <View>
              <View style={styles.middle}>
                <View style={styles.wrapper}>
                  <TouchableOpacity
                    onPress={async () => {
                      await analytics().logEvent('SettingAccount', {
                        item: 'Button to manage account',
                      });
                      navigation.navigate('ManageAccount');
                    }}>
                    <View style={styles.middleWrapper}>
                      <View style={styles.middleImage}>
                        <Ionicons
                          name="person-outline"
                          color="white"
                          size={20}
                        />
                      </View>
                      <Text style={styles.menuText}>Account</Text>
                      <View style={{right: 15, position: 'absolute'}}>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={20}
                          color="black"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {updateNotificationLoading && <Loading />}
                  {/* <TouchableOpacity
                    onPress={async () => {
                      navigation.navigate('Notification');
                    }}>
                    <View
                      style={[styles.middleWrapper, {borderBottomWidth: 0}]}>
                      <View style={styles.middleImage}>
                        <Ionicons
                          name={'notifications'}
                          size={20}
                          color="white"
                        />
                      </View>
                      <Text style={styles.menuText}>Notifications</Text>
                     
                    </View>
                  </TouchableOpacity> */}
                  <View>
                    <List.Section>
                      <List.Accordion
                        title={
                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#222B45',
                                fontWeight: '500',
                              }}>
                              Notifications
                            </Text>
                          </View>
                        }
                        left={props => (
                          <View
                            style={{
                              width: 40,
                              height: 40,
                              backgroundColor: '#3A9BDC',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 10,
                              marginRight: 8,
                            }}>
                            <Ionicons
                              name={'notifications'}
                              size={20}
                              color="white"
                            />
                          </View>
                        )}
                        expanded={expanded}
                        onPress={handlePress}
                        style={{
                          borderBottomWidth: 1,
                          alignItems: 'center',
                          borderBottomColor: '#EDF1F7',
                          backgroundColor: 'white',
                          paddingBottom: 15,
                        }}>
                        <List.Item
                          title={
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#222B45',
                                  fontWeight: '500',
                                }}>
                                Chat
                              </Text>
                            </View>
                          }
                          left={props => (
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: '#3A9BDC',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Image
                                source={require('../../../../src/assets/img/chatN.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                          right={props => (
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
                          )}
                          style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            borderBottomColor: '#EDF1F7',
                            paddingBottom: 15,
                            width: 300,
                            marginLeft: 20,
                          }}
                        />
                        <List.Item
                          title={
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#222B45',
                                  fontWeight: '500',
                                }}>
                                Content
                              </Text>
                            </View>
                          }
                          left={props => (
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: '#3A9BDC',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Image
                                source={require('../../../../src/assets/img/contentN.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                          right={props => (
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
                          )}
                          style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            borderBottomColor: '#EDF1F7',
                            paddingBottom: 15,
                            width: 300,
                            marginLeft: 20,
                          }}
                        />
                        {/* <List.Item
                          title={
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#222B45',
                                  fontWeight: '500',
                                }}>
                                Discussion Boards
                              </Text>
                            </View>
                          }
                          left={props => (
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: '#3A9BDC',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Image
                                source={require('../../../../src/assets/img/board.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                          right={props => (
                            <Switch
                              trackColor={{false: '#767577', true: '#32a32e'}}
                              thumbColor={boardEnabled ? 'white' : 'white'}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={boardSwitch}
                              value={boardEnabled}
                              style={{
                                right: 0,
                                position: 'absolute',
                              }}
                            />
                          )}
                          style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            borderBottomColor: '#EDF1F7',
                            paddingBottom: 15,
                            // backgroundColor: 'red',
                            width: 300,
                            marginLeft: 20,
                          }}
                        /> */}
                        <List.Item
                          title={
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#222B45',
                                  fontWeight: '500',
                                }}>
                                Events
                              </Text>
                            </View>
                          }
                          left={props => (
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: '#3A9BDC',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Image
                                source={require('../../../../src/assets/img/event.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                          right={props => (
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
                          )}
                          style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            borderBottomColor: '#EDF1F7',
                            paddingBottom: 15,
                            paddingTop: 15,

                            width: 300,
                            marginLeft: 20,
                          }}
                        />
                        <List.Item
                          title={
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#222B45',
                                  fontWeight: '500',
                                }}>
                                Registered Events
                              </Text>
                            </View>
                          }
                          left={props => (
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: '#3A9BDC',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Image
                                source={require('../../../../src/assets/img/regEvents.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                          right={props => (
                            <Switch
                              trackColor={{false: '#767577', true: '#32a32e'}}
                              thumbColor={regEvents ? 'white' : 'white'}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={regEventSwitch}
                              value={regEvents}
                              style={{
                                right: 0,
                                position: 'absolute',
                              }}
                            />
                          )}
                          style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            borderBottomColor: '#EDF1F7',
                            paddingBottom: 15,
                            width: 300,
                            marginLeft: 20,
                          }}
                        />
                        <List.Item
                          title={
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#222B45',
                                  fontWeight: '500',
                                }}>
                                Member Connections
                              </Text>
                            </View>
                          }
                          left={props => (
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: '#3A9BDC',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Image
                                source={require('../../../../src/assets/img/connection.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                          right={props => (
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
                          )}
                          style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            borderBottomColor: '#EDF1F7',
                            paddingBottom: 15,
                            width: 300,
                            marginLeft: 20,
                          }}
                        />

                        <List.Item
                          right={props => (
                            <View style={styles.loginButtonWrapper}>
                              <Button
                                style={[styles.loginButton]}
                                onPress={handleSubmit}>
                                <Text style={styles.loginButtonText}>Save</Text>
                              </Button>
                            </View>
                          )}
                          style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            borderBottomColor: '#EDF1F7',
                            paddingBottom: 15,
                            width: 300,
                            marginLeft: 20,
                          }}
                        />
                      </List.Accordion>
                    </List.Section>
                  </View>
                </View>
                <View style={styles.wrapper}>
                  <TouchableOpacity
                    onPress={async () => {
                      navigation.navigate('Gmail', {
                        title: 'Account Assistance',
                      });
                      await analytics().logEvent('settingGmail', {
                        item: 'setting',
                      });
                    }}>
                    <View style={styles.middleWrapper}>
                      <View style={styles.middleImage1}>
                        <AntDesign name={'mail'} size={20} color="white" />
                      </View>
                      <Text style={styles.menuText}>Help</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Privacy')}>
                    <View style={styles.middleWrapper}>
                      <View style={styles.middleImage1}>
                        <Ionicons
                          name={'lock-closed-outline'}
                          size={20}
                          color="white"
                        />
                      </View>
                      <Text style={styles.menuText}>Privacy Policy</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatingButton {...props} navigation={navigation} />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: Platform.OS === 'ios' ? 35 : 40,
    paddingRight: Platform.OS === 'ios' ? 35 : 40,
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
  middle: {},
  wrapper: {
    marginTop: 35,
  },
  middleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#EDF1F7',
    position: 'relative',
  },

  middleImage: {
    width: 40,
    height: 40,
    backgroundColor: '#3A9BDC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  middleImage1: {
    width: 40,
    height: 40,
    backgroundColor: '#d7d7d7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 15,
    color: '#222B45',
  },

  loginButtonWrapper: {
    ...CommonStyles.buttonWrapper,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRACTICE_COLOR,
    height: 40,
    marginLeft: 20,
    marginBottom: 15,
    borderRadius: 10,
    width: '50%',
  },

  loginButtonText: {
    ...CommonStyles.buttonText,
  },
});
