/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */

import * as React from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  const navigation = useNavigation();
  // Perform navigation if the react navigation is ready to handle actions
  navigation.navigate(name, params);
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}
