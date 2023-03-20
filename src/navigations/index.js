import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {Alert, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {JWT_TOKEN} from '../constants';
import auth from '@react-native-firebase/auth';
import {useAuthentication} from '../context/auth';
import {getAsyncStorage} from '../utils/storageUtil';
import {navigationRef} from '../utils/navigationUtil';
import analytics from '@react-native-firebase/analytics';

// export const navigationRef = useRef();

const MainNavigation = ({initialRouteName, setInitialRoute}) => {
  const {loggedIn} = useAuthentication();
  // console.log('loggedin bool', loggedIn);
  const routeNameRef = useRef();


  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
      independent={true}>
      {loggedIn ? (
        <AppStack
          initialRouteName={initialRouteName}
          setInitialRoute={setInitialRoute}
        />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;
