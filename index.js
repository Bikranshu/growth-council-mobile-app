/**
 * @format
 */

import 'react-native-gesture-handler';
import {Alert, AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/index';
import PushNotification from 'react-native-push-notification';
import {name as appName} from './app.json';
import PushNotificationsConfigs from './src/config';
import { navigationRef } from './src/utils/navigationUtil';


messaging().setBackgroundMessageHandler(remoteMessage => {
  PushNotification.localNotification(remoteMessage);
});

PushNotificationsConfigs.congigurations(navigationRef);

AppRegistry.registerComponent(appName, () => App);
