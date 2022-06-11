import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import {Alert, View} from 'react-native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {navigationRef} from '../utils/navigationUtil';
import {getAsyncStorage} from '../utils/storageUtil';
import {JWT_TOKEN} from '../constants';
import auth from '@react-native-firebase/auth';
import {useAuthentication} from '../context/auth';

const MainNavigation = () => {
  const {loggedIn} = useAuthentication();

  return (
    <NavigationContainer ref={navigationRef}>
      {loggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
