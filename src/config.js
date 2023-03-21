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

        if (notification.userInteraction === true) {
          console.log({notification});
          try {
            // handle the navigation here
            const data = notification?.data;
            let backgroundImage = '';
            let pillarname = '';
            let GrowthCoaching = 'Growth Coaching';
            let Executive = 'Executive Coaching Clinic';
            if (
              data?.event_categories?.indexOf(GrowthCoaching) > -1 !== true ||
              data?.event_categories?.indexOf(Executive) > -1 !== true ||
              data?.event_categories === '[]'
            ) {
              backgroundImage = require('./assets/img/Rectangle.png');
              pillarname = 'Growth Coaching';
            } else {
              backgroundImage = require('./assets/img/Rectangle2.png');
              pillarname = 'Growth Community';
            }

            if (data) {
              if (data?.type === 'chat') {
                console.log('chat');
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
                  title: pillarname,
                  image: backgroundImage,
                });
              } else if (data?.type === 'content') {
                navigateToScreen('ContentLibraryDetail', {
                  id: data?.post_id,
                });
              } else if (data?.type === 'connection') {
                navigateToScreen('Connection', {
                  type: 'Connection',
                });
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
