import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {navigate} from './utils/navigationUtil';
import {Platform} from 'react-native';

// import moment from 'moment';
const PushNotificationsConfigs = {
  congigurations: () => {
    PushNotification.configure({
      onNotification: notification => {
        const clicked = notification.userInteraction;

        if (Platform.OS == 'ios') {
          if (
            notification.foreground &&
            (notification.userInteraction || notification.remote)
          ) {
            PushNotification.localNotification(notification);
          }

          if (clicked) {
            // handle the navigation here
            if (notification.data.type == 'chat') {
              console.log(notification.data);
              navigate('Chat', {
                friendID: notification.data.friendID,
                friendName: notification.data.friendName,
                friendAvatar: notification.data.friendAvatar,
                userID: notification.data.userID,
                userName: notification.data.userName,
                userAvatar: notification.data.userAvatar,
              });
            } else if (notification.data.type == 'event') {
              navigate('EventDetail', {
                id: notification.data.post_id,
                image: require('../src/assets/img/appBG.png'),
                title: 'Growth Community',
              });
            }
          }

            notification.finish(PushNotificationIOS.FetchResult.NoData);
        } else {
          if (notification.foreground) {
            PushNotification.localNotification(notification);
          }
        }

        if (clicked) {
          // handle the navigation here
          if (notification.data.type == 'chat') {
            console.log(notification.data);
            navigate('Chat', {
              friendID: notification.data.friendID,
              friendName: notification.data.friendName,
              friendAvatar: notification.data.friendAvatar,
              userID: notification.data.userID,
              userName: notification.data.userName,
              userAvatar: notification.data.userAvatar,
            });
          } else if (notification.data.type == 'event') {
            navigate('EventDetail', {
              id: notification.data.post_id,
              image: require('../src/assets/img/appBG.png'),
              title: 'Growth Community',
            });
          }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: notification => {
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: err => {},
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  },
};
export default PushNotificationsConfigs;
