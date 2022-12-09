import React, {useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Feature from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect, useIsFocused, useRoute} from '@react-navigation/native';
import {Linking} from 'react-native';
import {useAuthentication} from '../context/auth';
import ContentScreen from '../screens/contentLibrary';
import CriticalIssueScreen from '../screens/criticalIssue';
import CalendarScreen from '../screens/calendar';
import AboutScreen from '../screens/about';
import FeedbackScreen from '../screens/feedback';
import ContributeIdeasScreen from '../screens/ideas';
import HomeCommunityScreen from '../screens/dashboard/HomeCommunity';
import BestPracticeScreen from '../screens/dashboard/BestPractice';
import GrowthCoachingScreen from '../screens/dashboard/GrowthCoaching';
import SettingScreen from '../screens/setting/index';
import SubHeader from '../shared/header/SubHeader';
import ContentLibraryScreen from '../screens/contentLibrary/contentLibrary';
import EventForumScreen from '../screens/discussionForum/eventForum';
import GPDScreen from '../screens/GPD';

import {fetchProfileByID} from '../screens/account/slice/profileSlice';
import DashboardScreen from '../screens/dashboard';
import UserListScreen from '../screens/chat/UserList';
import PeopleScreen from '../screens/people';
import MainHeader from '../shared/header/MainHeader';
import Header from '../shared/header/header';
import {
  getPathFromState,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import AccountScreen from '../screens/account';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {loading, setLoading, message, setMessage, signOut} =
    useAuthentication();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const fetchProfileByIdentifier = () => {
    dispatch(fetchProfileByID());
  };
  useEffect(() => {
    fetchProfileByIdentifier();
  }, [isFocused]);
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };
  const logout = async () => {
    await signOut();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Ionicons name="close-outline" color={'#000'} size={35} />
        </TouchableOpacity>
        <Image
          source={require('../../src/assets/img/GILCouncil.jpg')}
          style={{
            width: '70%',
            marginLeft: 20,
          }}
          resizeMode="contain"
        />
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={logout}
          icon={() => <Material name={'logout'} size={20} color={'#00008B'} />}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.frost.com/')}>
            <Image
              source={require('../../src/assets/img/frost-sullivan.png')}
              style={{
                width: 180,
                height: 45,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.footerText}>Powered By</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://frostdigi.ai/')}>
            <Image
              source={require('../../src/assets/img/splashFooter.png')}
              style={{width: 80, height: 40, opacity: 0.75}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const DashboardStack = createStackNavigator();

export const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={({navigation}) => ({
        gestureEnabled: false,
        header: () => <MainHeader navigation={navigation} />,
      })}>
      <DashboardStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({route, navigation}) => ({
          animationEnabled: false,
          gestureEnabled: false,
        })}
      />
    </DashboardStack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={() => ({
        // activeTintColor: '#e91e63',
        drawerActiveBackgroundColor: 'rgba(0,0,0,0)',
        drawerActiveTintColor: '#888',
        drawerInactiveTintColor: '#888',
      })}
      drawerContent={props => {
        // const filteredProps = {...props,  state: {...props.state, routeNames: props.state.routeNames.filter(routeName => routeName !== 'Account' && routeName !== "People" && routeName !== "UserList"), routes: props.state.routes.filter(route => route.name !== "Account" && route.name !== "People" && route.name !== "UserList")}};
        return <CustomDrawerContent {...props} />;
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={() => ({
          drawerIcon: ({focused, size}) => (
            <Material name="inbox" color={'#00008B'} size={20} />
          ),
          headerShown: false,
        })}
      />
      <Drawer.Screen
        name="Growth Community"
        component={HomeCommunityScreen}
        options={({navigation, route}) => ({
          pillarId: route?.params?.pillarId,
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../src/assets/img/CommunityIcon_Blue.png')}
              style={{width: 20, height: 20}}
              resizeMode="cover"
            />
          ),
          header: () => (
            <SubHeader
              title="Growth Community"
              image={require('../assets/img/Rectangle2.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Growth Content"
        component={ContentScreen}
        options={({navigation, route}) => ({
          pillarId: route?.params?.pillarId,
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../src/assets/img/ContentIcon_Orange.png')}
              style={{width: 20, height: 20}}
              resizeMode="cover"
            />
          ),
          header: () => (
            <SubHeader
              title="Growth Content"
              image={require('../assets/img/best-practice-bg.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Growth Coaching"
        component={GrowthCoachingScreen}
        options={({navigation, route}) => ({
          pillarId: route?.params?.pillarId,
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../src/assets/img/CoachingIcon_Green.png')}
              style={{width: 20, height: 20}}
              resizeMode="cover"
            />
          ),
          header: () => (
            <SubHeader
              title="Growth Coaching"
              image={require('../assets/img/Rectangle.png')}
              navigation={navigation}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="Growth Pipeline Dailogue"
        component={GPDScreen}
        options={({navigation, route}) => ({
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../src/assets/img/gpd.png')}
              style={{width: 20, height: 25}}
              resizeMode="contain"
            />
          ),
          header: () => (
            <SubHeader
              title="Growth Pipeline Dailogue"
              image={require('../assets/img/Rectangle2.png')}
              navigation={navigation}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="Discussion Board"
        component={EventForumScreen}
        options={({navigation}) => ({
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../src/assets/img/pastevent.png')}
              style={{width: 20, height: 20}}
              resizeMode="cover"
            />
          ),
          header: () => (
            <SubHeader
              title="Discussion"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({navigation}) => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="calendar-outline" color={'#00008B'} size={20} />
          ),
          header: () => (
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
        options={({navigation}) => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="information-circle-outline"
              color={'#00008B'}
              size={20}
            />
          ),
          header: () => (
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
        options={({navigation}) => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="settings-outline" color={'#00008B'} size={20} />
          ),
          header: () => <Header title="Settings" navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="Contribute Ideas"
        component={ContributeIdeasScreen}
        options={({navigation}) => ({
          drawerIcon: ({focused, size}) => (
            <Ionicons name="bulb-outline" color={'#00008B'} size={20} />
          ),
          header: () => (
            <SubHeader
              title="Contribute Ideas"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />

      <Drawer.Screen
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          drawerItemStyle: {height: 0},
          header: ({navigation, route}) => (
            <SubHeader
              title="Chat"
              name={route?.params?.name}
              id={route?.params?.id}
              subtitle="CommunityDetail"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        }}
        name="UserList"
        component={UserListScreen}
      />
      <Drawer.Screen
        name="People"
        component={PeopleScreen}
        options={() => ({
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          drawerItemStyle: {height: 0},
          header: ({navigation, route}) => (
            <SubHeader
              title="Growth Council Members"
              name={route?.params?.name}
              id={route?.params?.id}
              subtitle="CommunityDetail"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={() => ({
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          drawerItemStyle: {height: 0},
          header: ({navigation}) => (
            <Header title="Profile" navigation={navigation} />
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
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
  },
});
export default DrawerNavigation;
