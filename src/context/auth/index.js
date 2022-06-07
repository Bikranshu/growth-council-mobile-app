import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import uuid from 'react-native-uuid';
import crashlytics from '@react-native-firebase/crashlytics';
import auth from '@react-native-firebase/auth';

import {
  setAsyncStorage,
  clearAsyncStorage,
  getAsyncStorage,
} from '../../utils/storageUtil';
import {JWT_TOKEN, API_URL, USER_NAME, USER_AVATAR} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getAsyncStorage(JWT_TOKEN);
      if (token) setLoggedIn(true);
      else setLoggedIn(false);
    })();
  });

  const createUser = () => new Promise(async (resolve, reject) => {
      try {
  
        const raw_data = await getAsyncStorage('tempData');
        const data = JSON.parse(raw_data);
  
        const {formData, JWT_TOKEN, USER_AVATAR, USER_NAME} = data;
  
        const res = await auth().createUserWithEmailAndPassword(formData.username, formData.password);
        await loginWithFirebase(formData.username, formData.password, {JWT_TOKEN, USER_AVATAR, USER_NAME});
        resolve(true);
  
      } catch(error){
        console.log(error);
        reject(error);
      }
  })

  const loginWithFirebase = async (email, password, data) => {
    const res = await auth().signInWithEmailAndPassword(email, password);
    console.log("clearing cache...");
    await clearAsyncStorage("tempData");



    setLoggedIn(true);
    await setAsyncStorage(JWT_TOKEN, data.token ?? data.JWT_TOKEN);
    await setAsyncStorage(USER_NAME, data.user_display_name ?? data.USER_NAME);
    await setAsyncStorage(USER_AVATAR, data.avatar ?? data.USER_AVATAR);


    const token = await res.user;
    await Promise.all([
        crashlytics().setUserId(response?.data?.user_email),
        crashlytics().setAttributes({
          email,
         }),
      ]);
      if (token) setLoggedIn(true);

  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        message,
        loggedIn,
        setMessage,
        setLoading,
        signIn: async fromData => {
          setLoading(true);
          try {
            console.log("Logging in...")
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


            if (response.data.token) {

              await setAsyncStorage("tempData", JSON.stringify({
                formData: fromData,
                JWT_TOKEN: response.data.token,
                USER_NAME: response.data.user_display_name,
                USER_AVATAR: response.data.avatar
              }))


             await loginWithFirebase(fromData.username, fromData.password, response.data);

              

              
            } else {
              setLoading(false);
              setMessage(response?.data?.message);
            }
          } catch (error) {
            setLoading(false);
            
            if(error.toString().includes("user-not-found")){
              createUser()
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
