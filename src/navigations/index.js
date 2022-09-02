import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer,} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import {Alert, View} from 'react-native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {navigationRef} from '../utils/navigationUtil';
import {getAsyncStorage} from '../utils/storageUtil';
import {JWT_TOKEN} from '../constants';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import {useAuthentication} from '../context/auth';

const MainNavigation = () => {
  const {loggedIn} = useAuthentication();
  const navigationRef = useRef();
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
	  independent={true}
	  >
      {loggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
