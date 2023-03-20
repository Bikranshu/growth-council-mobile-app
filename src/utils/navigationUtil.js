/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */

import * as React from 'react';
import {DrawerActions, StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

// export function navigate(name, params) {
//   navigationRef.current?.navigate(name, params);
// }

export const navigateToScreen = (screenName, params) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(screenName, params);
  }
};
// export function push(...args) {
//   navigationRef.current?.dispatch(StackActions.push(...args));
// }

// export const navigateData = notificationData => {
//   const navigation = notificationData;

//   if (
//     navigation?.foreground === false &&
//     notification.userInteraction === true
//   ) {
//     // console.log('Reshika');
//   }

// };

// export const notification = navigateData();
