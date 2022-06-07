import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Platform} from 'react-native';

import HomeScreen from '../screens/home';
import CouncilDetailScreen from '../screens/home/CouncilDetail';
import HomeDetailScreen from '../screens/home/Detail';
import SignInScreen from '../screens/auth/SignIn';
import ForgotScreen from '../screens/auth/Forgot';
import SignUpScreen from '../screens/auth/SignUp';
import TermScreen from '../screens/terms';
import PrivacyScreen from '../screens/privacy';
import EmailScreen from '../screens/email/email';

import OptionHeader from '../shared/header/optionHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {Navigator, Screen} = createStackNavigator();

const AuthStack = () => {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <Screen
        name="HomeDetail"
        component={HomeDetailScreen}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerStyle: {height: 80},
          headerTransparent: true,
          headerLeft: props => (
            <Ionicons
              name={'arrow-back'}
              size={70}
              style={{
                position: Platform.OS === 'ios' ? 'absolute' : 'relative',
              }}
              color={'white'}
              onPress={() => navigation.goBack()}
            />
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
          gestureDirection: 'horizontal-inverted',
        })}
      />
      <Screen
        name="CouncilDetail"
        component={CouncilDetailScreen}
        options={{headerShown: false}}
      />
      <Screen
        name="SignIn"
        component={SignInScreen}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerStyle: {height: 80},
          headerTransparent: true,
          headerLeft: props => (
            <Ionicons
              name={'arrow-back'}
              size={70}
              color={'white'}
              style={{
                position: Platform.OS === 'ios' ? 'absolute' : 'relative',
              }}
              onPress={() => navigation.navigate('Home')}
            />
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
          gestureDirection: 'horizontal-inverted',
        })}
      />
      <Screen
        name="SignUp"
        component={SignUpScreen}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerStyle: {height: 80},
          headerTransparent: true,
          headerLeft: props => (
            <Ionicons
              name={'arrow-back'}
              size={70}
              color={'white'}
              style={{
                position: Platform.OS === 'ios' ? 'absolute' : 'relative',
              }}
              onPress={() => navigation.goBack()}
            />
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
          gestureDirection: 'horizontal-inverted',
        })}
      />
      <Screen
        name="Forgot"
        component={ForgotScreen}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerStyle: {height: 80},
          headerTransparent: true,
          headerLeft: props => (
            <Ionicons
              name={'arrow-back'}
              size={50}
              style={{
                position: Platform.OS === 'ios' ? 'absolute' : 'relative',
                marginLeft: 10,
              }}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
          gestureDirection: 'horizontal-inverted',
        })}
      />

      <Screen
        name="Terms"
        component={TermScreen}
        options={({navigation}) => ({
          header: () => (
            <OptionHeader
              title="Terms Of Use"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
              noDrawer
            />
          ),
        })}
      />

      <Screen
        name="Privacys"
        component={PrivacyScreen}
        options={({navigation}) => ({
          header: () => (
            <OptionHeader
              title="Privacy Policy"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
              noDrawer
            />
          ),
        })}
      />
      <Screen
        name="Email"
        component={EmailScreen}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default AuthStack;
