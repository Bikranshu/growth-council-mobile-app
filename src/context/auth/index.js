import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import uuid from 'react-native-uuid';
import crashlytics from '@react-native-firebase/crashlytics';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {HOME_URL} from '../../constants';

import {
  setAsyncStorage,
  clearAsyncStorage,
  getAsyncStorage,
} from '../../utils/storageUtil';
import {isTokenExpired} from '../../utils/jwtUtil';
import {
  JWT_TOKEN,
  API_URL,
  USER_NAME,
  USER_AVATAR,
  USER_REGION,
} from '../../constants';

export const AuthContext = createContext({});

export const AuthProvider = props => {
  const {navigation, children} = props;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [userCountry, setUserCountry] = useState('');

  useEffect(() => {
    (async () => {
      //   const region = await getAsyncStorage(USER_REGION);
      //   console.log('ad', region);
      const token = await getAsyncStorage(JWT_TOKEN);
      if (token) {
        if (
          userCountry === undefined ||
          userCountry === null ||
          userCountry === ''
        ) {
          navigation.navigate('CountryPop');
        }
        setLoggedIn(true);
        await isTokenExpired(token);
      } else {
        setLoggedIn(false);
      }
    })();
  });

  const isTokenExpired = async token => {
    const decoded = jwt_decode(token);

    if (decoded?.iss !== HOME_URL) {
      await clearAsyncStorage(JWT_TOKEN);
      await clearAsyncStorage(USER_NAME);
      await clearAsyncStorage(USER_AVATAR);
      setLoggedIn(false);
    } else if (decoded.exp < Date.now() / 1000) {
      await clearAsyncStorage(JWT_TOKEN);
      await clearAsyncStorage(USER_NAME);
      await clearAsyncStorage(USER_AVATAR);
      setLoggedIn(false);
    } else {
    }
  };

  const createUser = () =>
    new Promise(async (resolve, reject) => {
      try {
        const raw_data = await getAsyncStorage('tempData');
        const data = JSON.parse(raw_data);

        const {formData, JWT_TOKEN, USER_AVATAR, USER_NAME} = data;

        const res = await auth().createUserWithEmailAndPassword(
          formData.username,
          '6AWgM#.Y(fE8Q2=',
        );

        await loginWithFirebase(response.data.user_email, '6AWgM#.Y(fE8Q2=', {
          JWT_TOKEN,
          USER_AVATAR,
          USER_NAME,
        });
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

  const loginWithFirebase = async (email, password, data) => {
    const res = await auth().signInWithEmailAndPassword(
      email,
      '6AWgM#.Y(fE8Q2=',
    );
    console.log('clearing cache...');
    console.log('login', res);
    await clearAsyncStorage('tempData');

    setLoggedIn(true);
    await setAsyncStorage(JWT_TOKEN, data.token ?? data.JWT_TOKEN);
    await setAsyncStorage(USER_NAME, data.user_display_name ?? data.USER_NAME);
    await setAsyncStorage(USER_AVATAR, data.avatar ?? data.USER_AVATAR);
    await setAsyncStorage(USER_REGION, data.region ?? data.USER_REGION);
    const token = await res.user;
    await Promise.all([
      crashlytics().setUserId(response?.data?.user_email),
      crashlytics().setAttributes({
        email,
      }),
    ]);
    if (token) setLoggedIn(true);
  };

  const postToAPI = async (email, token) => {
    return await axios.get(
      `${API_URL}/pd/fcm/subscribe?api_secret_key=s3D6nHoU9AUw%jjTHy0K@UO)&user_email=${email}&device_token=${token}&subscribed=UserNotification`,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        message,
        loggedIn,
        emailId,
        setMessage,
        setLoading,
        setEmailId,
        signIn: async fromData => {
          setLoading(true);
          try {
            console.log('Logging in...');
            const response = await axios.post(
              API_URL + '/jwt-auth/v1/token',
              fromData,
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                responseType: 'json',
              },
            );

            setUserCountry(response?.data?.region);
            console.log('userCountry', response?.data?.region);
            const messageToken = await messaging().getToken();
            await postToAPI(response.data.user_email, messageToken);

            if (response.data.token) {
              await setAsyncStorage(
                'tempData',
                JSON.stringify({
                  formData: fromData,
                  JWT_TOKEN: response.data.token,
                  USER_NAME: response.data.user_display_name,
                  USER_AVATAR: response.data.avatar,
                  USER_REGION: response.data.region,
                }),
              );

              await loginWithFirebase(
                response.data.user_email,
                '6AWgM#.Y(fE8Q2=',
                response.data,
              );
            } else {
              setLoading(false);
              setMessage(response?.data?.message);
            }
          } catch (error) {
            setLoading(false);

            if (error.toString().includes('user-not-found')) {
              createUser();
            }

            setMessage(error?.response?.data);
          }
        },
        signOut: async () => {
          await clearAsyncStorage(JWT_TOKEN);
          await clearAsyncStorage(USER_NAME);
          await clearAsyncStorage(USER_AVATAR);
          // await auth().signOut();
          setLoggedIn(false);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('You forgot to implement the auth provider.');
  }
  return context;
};
