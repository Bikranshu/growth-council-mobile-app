import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import jwt_decode from 'jwt-decode';
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
import {
  setAsyncStorage,
  clearAsyncStorage,
  getAsyncStorage,
} from './utils/storageUtil';

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

  const netInfo = useNetInfo();
  const {loading, setLoading, message, setMessage, signOut} =
    useAuthentication();

  useEffect(() => {
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
    // isTokenExpired();
  }, []);

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('***************************************');
    console.log(token);
  };

  const isTokenExpired = async () => {
    const token = await getAsyncStorage(JWT_TOKEN);
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      //   return true;
      await signOut();
    }
  };

  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp(remoteMessage => {});
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {});
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
    <>
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
                  <MainNavigation />
                </AuthProvider>
              </PaperProvider>
            </NativeBaseProvider>
          </PersistGate>
        </Provider>
      ) : (
        <NoInternetModel></NoInternetModel>
      )}
    </>
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
