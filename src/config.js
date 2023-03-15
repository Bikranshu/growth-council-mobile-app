import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {navigateToScreen} from './utils/navigationUtil';
import {Platform} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';

const isIOS = Platform.OS == 'ios';
// const navigation = useNavigation();

// import moment from 'moment';
const PushNotificationsConfigs = {
  congigurations: () => {
    PushNotification.configure({
      onNotification: notification => {
        if (notification.foreground && isIOS) {
          PushNotification.localNotification(notification);
        }

        const clicked = notification.userInteraction && notification.foreground;

        if (clicked) {
          try {
            // handle the navigation here
            const data = notification?.data;

            if (data) {
              navigateToScreen('NotificationList');
              if (data?.type == 'chat') {
                console.log(notification.data);
                // navigate('Chat', {
                //   friendID: data?.friendID,
                //   friendName: data?.friendName,
                //   friendAvatar: data?.friendAvatar,
                //   userID: data?.userID,
                //   userName: data?.userName,
                //   userAvatar: data?.userAvatar,
                // });
              } else if (data?.type == 'event') {
                // navigateToScreen('NotificationList');
                navigate('Settings');
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
        console.log('isIOS', isIOS);
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
