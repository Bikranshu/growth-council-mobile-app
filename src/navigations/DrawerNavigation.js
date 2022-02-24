import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Feature from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';

import DashboardScreen from '../screens/dashboard';
import {useAuthentication} from '../context/auth';

import CalendarScreen from '../screens/calendar';

import AboutScreen from '../screens/about';
import FeedbackScreen from '../screens/feedback';
import ContributeIdeasScreen from '../screens/ideas';
import HomeCommunityScreen from '../screens/dashboard/HomeCommunity';
import BestPracticeScreen from '../screens/dashboard/BestPractice';
import GrowthCoachingScreen from '../screens/dashboard/GrowthCoaching';
import SettingScreen from '../screens/setting/index';

import BottomTabNavigation from './BottomTabNavigation';
import {Colors} from '../theme';
import HeaderTitle from '../shared/header';
import HeaderRight from '../shared/header/HeaderRight';
import {clearAsyncStorage} from '../utils/storageUtil';
import ToastMessage from '../shared/toast';
import {
  fetchProfileByID,
  resetProfile,
} from '../screens/account/slice/profileSlice';
import MainHeader from '../shared/header/MainHeader';
import SubHeader from '../shared/header/SubHeader';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const {loading, setLoading, message, setMessage, signOut} =
    useAuthentication();
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Ionicons name="close-outline" color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <DrawerItem
          label="Logout"
          onPress={logout}
          icon={() => <Material name={'logout'} size={24} color={'#00008B'} />}
        />

        <View style={styles.footer}>
          <Image
            source={require('../../src/assets/img/footer_logo.png')}
            style={{width: 195, height: 30}}
          />
          <Text style={styles.footerText}>Powered By</Text>
          <View style={{width: 175}}>
            <Image
              source={require('../../src/assets/img/fristDigi.png')}
              style={{width: '100%'}}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const DrawerNavigation = props => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={({navigation}) => ({
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={BottomTabNavigation}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Material name="inbox" color={'#00008B'} size={24} />
          ),
          header: ({navigation}) => <MainHeader navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="Community"
        component={HomeCommunityScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Material name="group-work" color={'#14A2E2'} size={24} />
          ),
          header: ({navigation}) => (
            <SubHeader
              title="Community"
              image={require('../assets/img/Rectangle2.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Best Practices"
        component={BestPracticeScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Feature name="thumbs-up" color={'#3693AC'} size={24} />
          ),
          header: ({navigation}) => (
            <SubHeader
              title="Best Practices"
              image={require('../assets/img/Rectangle1.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Growth Coaching"
        component={GrowthCoachingScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Feature name="git-pull-request" color={'#80BA74'} size={24} />
          ),
          header: ({navigation}) => (
            <SubHeader
              title="Growth Coaching"
              image={require('../assets/img/Rectangle.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="calendar-outline" color={'#00008B'} size={size} />
          ),
          header: ({navigation}) => (
            <SubHeader
              title="Calendar"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="information-circle-outline"
              color={'#00008B'}
              size={24}
            />
          ),
          header: ({navigation}) => (
            <SubHeader
              title="About"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="settings-outline" color={'#00008B'} size={24} />
          ),
          header: ({navigation}) => (
            <SubHeader
              title="Settings"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Font name="edit" color={'#00008B'} size={20} />
          ),
          header: ({navigation}) => (
            <SubHeader
              title="Feedback"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Contribute Ideas"
        component={ContributeIdeasScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="bulb-outline" color={'#00008B'} size={24} />
          ),
          header: ({navigation}) => (
            <SubHeader
              title="Contribute Ideas"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
  },
  footerText: {
    margin: 3,
    fontSize: 8,
  },
});

export default DrawerNavigation;
