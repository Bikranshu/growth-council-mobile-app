import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { navigate } from './utils/navigationUtil';
import { Platform } from 'react-native';

const isIOS = Platform.OS == 'ios';

// import moment from 'moment';
const PushNotificationsConfigs = {
  congigurations: () => {
    PushNotification.configure({
      onNotification: notification => {

        if (notification.foreground && !isIOS) {
          PushNotification.localNotificationSchedule({
            ...notification,
            date: new Date(Date.now() + 10 * 1000)
          });
        }

        const clicked = notification.userInteraction && !notification.foreground;

        if (clicked) {
          try {
            // handle the navigation here
            const data = notification?.data;

            if (data) {
              if (data?.type == 'chat') {
                console.log(notification.data);
                navigate('Chat', {
                  friendID: data?.friendID,
                  friendName: data?.friendName,
                  friendAvatar: data?.friendAvatar,
                  userID: data?.userID,
                  userName: data?.userName,
                  userAvatar: data?.userAvatar,
                })
              } else if (data?.type == "event") {
                navigate("EventDetail", { id: data?.post_id });
              }

            }
          } catch (error) {
            console.log(error);
          }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: notification => {
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: err => { },
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