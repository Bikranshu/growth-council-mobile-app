/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging'
import App from './src/index';
import PushNotification from 'react-native-push-notification';
import {name as appName} from './app.json';
import PushNotificationsConfigs from './src/config';

messaging().setBackgroundMessageHandler(remoteMessage => {
    PushNotification.localNotification(remoteMessage);
})

PushNotificationsConfigs.congigurations();

AppRegistry.registerComponent(appName, () => App);
