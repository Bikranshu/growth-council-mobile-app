import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
// import jwt_decode from 'jwt-decode';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import {Provider as PaperProvider} from 'react-native-paper';
import {useNetInfo} from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {store, persistor} from './store';
import MainNavigation from './navigations';
import {AuthProvider} from './context/auth';
import SplashScreen from './screens/splash';
import {Platform} from 'react-native';
import Modal from 'react-native-modal';
import {useAuthentication} from './context/auth';

// import {
// 	setAsyncStorage,
// 	clearAsyncStorage,
// 	getAsyncStorage,
// } from './utils/storageUtil';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;
let fakeApiCallWithoutBadNetwork = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

const NoInternetModel = () => (
  <Modal isVisible={true} style={styles.modal} animationInTiming={100}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Connection Error</Text>
      <Text style={styles.modalText}>
        Oops! Looks like your device is not connected to the internet or you
        don't have stable internet. Please check your internet connection
      </Text>
    </View>
  </Modal>
);

const App = () => {
  useEffect(() => {
    init();
  }, []);

  let init = async () => {
    await RNBootSplash.hide();
  };
  //   const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [loading, setLoading] = useState(true);

  const [initialRoute, setInitialRoute] = useState({
    name: 'Dashboard',
    params: {},
  });
  const [pillardata, setPillarData] = useState();
  const {message, setMessage, signOut} = useAuthentication();

  useEffect(() => {
    setInitialRoute({
      name: 'Dashboard',
      params: {},
    });
    getNotifications();

    (async () => {
      if (Platform.OS == 'ios') {
        const authorizationStatus = await messaging().requestPermission();

        if (authorizationStatus) {
          console.log('Permission status:', authorizationStatus);
        }
      }
    })();

    Platform.OS === 'android' && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          number: 1,
          category: 'userAction',
          userInfo: {...remoteMessage.data},
        });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log(token);
  };

  const getNotifications = async () => {
    let backgroundImage = '';
    let pillarname = '';
    let GrowthCoaching = 'Growth Coaching';
    let Executive = 'Executive Coaching Clinic';
    if (
      pillardata?.event_categories?.indexOf(GrowthCoaching) > -1 !== true ||
      pillardata?.event_categories?.indexOf(Executive) > -1 !== true ||
      pillardata?.event_categories === '[]'
    ) {
      backgroundImage = require('./assets/img/Rectangle.png');
      pillarname = 'Growth Coaching';
    } else {
      backgroundImage = require('./assets/img/Rectangle2.png');
      pillarname = 'Growth Community';
    }
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    const unSubscribe = await messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );

        //Navigation when we have data in remoteMessage
        if (remoteMessage?.data?.type === 'event') {
          setInitialRoute({
            name: 'EventDetail',
            params: {
              id: remoteMessage?.data?.post_id,
              title: pillarname,
              image: backgroundImage,
            },
          });
        } else if (remoteMessage?.data?.type === 'content') {
          setInitialRoute({
            name: 'ContentLibraryDetail',
            params: {id: remoteMessage?.data?.post_id},
          });
        } else if (remoteMessage?.data?.type === 'chat') {
          setInitialRoute({
            name: 'Chat',
            params: {
              friendID: remoteMessage?.data?.friendID,
              friendName: remoteMessage?.data?.friendName,
              friendAvatar: remoteMessage?.data?.friendAvatar,
              userID: remoteMessage?.data?.userID,
              userName: remoteMessage?.data?.userName,
              userAvatar: remoteMessage?.data?.userAvatar,
              type: 'Chat',
            },
          });
        } else if (remoteMessage?.data?.type === 'connection') {
          setInitialRoute({
            name: 'Connection',
            params: {id: remoteMessage?.data?.post_id},
          });
        }
      },
    );

    // Check whether an initial notification is available
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('remoteMessage', remoteMessage);
        setPillarData(remoteMessage?.data);

        //Navigation when we have data in remoteMessage
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          if (remoteMessage?.data?.type === 'event') {
            setInitialRoute({
              name: 'EventDetail',
              params: {
                id: remoteMessage?.data?.post_id,
                title: pillarname,
                image: backgroundImage,
              },
            });
          } else if (remoteMessage?.data?.type === 'content') {
            setInitialRoute({
              name: 'ContentLibraryDetail',
              params: {id: remoteMessage?.data?.post_id},
            });
          } else if (remoteMessage?.data?.type === 'chat') {
            setInitialRoute({
              name: 'Chat',
              params: {
                friendID: remoteMessage?.data?.friendID,
                friendName: remoteMessage?.data?.friendName,
                friendAvatar: remoteMessage?.data?.friendAvatar,
                userID: remoteMessage?.data?.userID,
                userName: remoteMessage?.data?.userName,
                userAvatar: remoteMessage?.data?.userAvatar,
                type: 'Chat',
              },
            });
          } else if (remoteMessage?.data?.type === 'connection') {
            setInitialRoute({
              name: 'Connection',
              params: {id: remoteMessage?.data?.post_id},
            });
          }
        }
        setLoading(false);
      });
    return unSubscribe;
  };

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'fcm_fallback_notification_channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log('created channel', created),
    );
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {netInfo.isConnected ? (
        <Provider store={store}>
          {/**
           * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
           * and saved to redux.
           * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
           * for example `loading={<SplashScreen />}`.
           * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
           */}
          <PersistGate
            loading={<SplashScreen />}
            onBeforeLift={fakeApiCallWithoutBadNetwork}
            persistor={persistor}>
            <NativeBaseProvider>
              <PaperProvider>
                <AuthProvider>
                  <MainNavigation
                    initialRouteName={initialRoute}
                    setInitialRoute={setInitialRoute}
                  />
                </AuthProvider>
              </PaperProvider>
            </NativeBaseProvider>
          </PersistGate>
        </Provider>
      ) : (
        <NoInternetModel></NoInternetModel>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
export default App;
