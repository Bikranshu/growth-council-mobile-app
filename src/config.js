import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {navigateToScreen, navigateData} from './utils/navigationUtil';
import {Platform} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';

const isIOS = Platform.OS == 'ios';

// import moment from 'moment';
const PushNotificationsConfigs = {
  congigurations: () => {
    PushNotification.configure({
      onNotification: notification => {
        if (notification.foreground && !isIOS) {
          PushNotification.localNotification(notification);
        }

        // const clicked = notification.userInteraction && notification.foreground;

        console.log({notification});
        if (
          notification?.foreground === true &&
          notification.userInteraction === true
        ) {
          try {
            // handle the navigation here
            const data = notification?.data;
            if (data) {
              if (data?.type === 'chat') {
                navigateToScreen('Chat', {
                  friendID: data?.friendID,
                  friendName: data?.friendName,
                  friendAvatar: data?.friendAvatar,
                  userID: data?.userID,
                  userName: data?.userName,
                  userAvatar: data?.userAvatar,
                });
              } else if (data?.type === 'event') {
                navigateToScreen('EventDetail', {
                  id: data?.post_id,
                  title: 'Growth Coaching',
                  image: require('./assets/img/Rectangle.png'),
                });
              } else if (data?.notification_type === 'content') {
                navigateToScreen('ContentLibraryDetail', {
                  id: data?.content_id,
                });
              } else {
                navigateToScreen('People');
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
        {
          isIOS && notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
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
