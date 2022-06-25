import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import {Provider as PaperProvider} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {store, persistor} from './store';
import MainNavigation from './navigations';
import {AuthProvider} from './context/auth';
import SplashScreen from './screens/splash';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;
let fakeApiCallWithoutBadNetwork = ms =>
  new Promise(resolve => setTimeout(resolve, ms));
const App = () => {
  useEffect(() => {
    init();
  }, []);

  let init = async () => {
    await RNBootSplash.hide();
  };

  useEffect(() => {
    getNotifications();
    Platform.OS === 'android' && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('***************************************');
    console.log(token);
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
  );
};
export default App;
