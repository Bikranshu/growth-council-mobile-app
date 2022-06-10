import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {Navigator, Screen} = createStackNavigator();

import SignUpNextScreen from '../screens/auth/SignUpNext';
import JourneyScreen from '../screens/auth/Journey';

import ContactUsScreen from '../screens/static/ContactUs';
import ContentLibraryScreen from '../screens/contentLibrary/contentLibrary';
import LibraryDetailScreen from '../screens/contentLibrary/libraryDetails';
import ContentTagsScreen from '../screens/contentLibrary/contentTags';
import CriticalIssueScreen from '../screens/criticalIssue/index';
import ContentLibraryDetailScreen from '../screens/details/ContentLibraryDetail';
import ContentScreen from '../screens/contentLibrary';
import ChangePasswordScreen from '../screens/account/ChangePassword';

import EventDetailScreen from '../screens/event';
import SessionDetailScreen from '../screens/sessions';
import SearchScreen from '../screens/search';
import GmailScreen from '../screens/email/index';

import FrostRadarScreen from '../screens/radar';
import ManageAccountScreen from '../screens/account/ManageAccount';
import OtherAccountScreen from '../screens/account/OthersAccount';
import PrivacyScreen from '../screens/privacy';

import CommunityDetailScreen from '../screens/details/CommunityDetail';
import GrowthDetailScreen from '../screens/details/GrowthDetail';
import SubPOEDetailScreen from '../screens/details/subPoeDetails';
import SubPOEListDetailScreen from '../screens/details/subPoeListDetails';
import ToolKitDetailScreen from '../screens/details/toolkitsDetail';
import RadarScreen from '../screens/details/Radar';
import UpcomingScreen from '../screens/dashboard/UpcomingView';
import ChatScreen from '../screens/chat';
import CoachingSessionDetailScreen from '../screens/coachingSession';
import SelfLearnDetailScreen from '../screens/selfLearn';
import PDFDetailScreen from '../screens/selfLearn/pdf';
import SelfAssessment from '../screens/coachingSession/component/selfAssessment';

import MainHeader from '../shared/header/MainHeader';
import UserListScreen from '../screens/chat/UserList';
import PeopleScreen from '../screens/people';
import SubHeader from '../shared/header/SubHeader';
import OptionHeader from '../shared/header/optionHeader';
import DashboardScreen from '../screens/dashboard';
import SessionCompleted from '../screens/coachingSession/component/sessionCompleted';
import DrawerNavigation from '../navigations/DrawerNavigation';
import Header from '../shared/header/header';

const AppStack = () => (
  <Navigator>
    <Screen
      name="Drawer"
      component={DrawerNavigation}
      options={({navigation}) => ({
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: 'horizontal-inverted',
        headerLeft: () => null,
      })}
    />

    <Screen
      name="Journey"
      component={JourneyScreen}
      options={{
        headerTitle: '',
        headerTransparent: true,
        ...TransitionPresets.RevealFromBottomAndroid,
      }}
    />
    <Screen
      name="FrostRadar"
      component={FrostRadarScreen}
      options={{
        headerLeft: () => null,
        headerTitle: '',
        headerTransparent: true,
        ...TransitionPresets.RevealFromBottomAndroid,
      }}
    />
    <Screen
      name="coachingSession"
      component={CoachingSessionDetailScreen}
      options={({route, navigation}) => ({
        header: () => (
          <SubHeader
            title={route?.params?.title}
            image={require('../assets/img/Rectangle.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />

    <Screen
      name="SessionCompleted"
      component={SessionCompleted}
      options={({route, navigation}) => ({
        header: () => (
          <SubHeader
            title="Session 10"
            image={require('../assets/img/Rectangle.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />
    <Screen
      name="selfAssessment"
      component={SelfAssessment}
      options={() => ({
        header: ({navigation}) => (
          <SubHeader
            title="Session"
            image={require('../assets/img/Rectangle.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />
    <Screen
      name="selflearn"
      component={SelfLearnDetailScreen}
      options={() => ({
        header: ({navigation}) => (
          <SubHeader
            title="Self Learn"
            image={require('../assets/img/Rectangle.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />

    <Screen
      name="pdf"
      component={PDFDetailScreen}
      options={() => ({
        header: ({navigation, route}) => (
          <SubHeader
            title={route?.params?.title}
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />

    <Screen
      name="SubPoe"
      component={SubPOEDetailScreen}
      options={() => ({
        header: ({navigation}) => (
          <SubHeader
            title="Growth Content"
            image={require('../assets/img/best-practice-bg.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />
    <Screen
      name="SubPoeList"
      component={SubPOEListDetailScreen}
      options={() => ({
        header: ({navigation}) => (
          <SubHeader
            title="Growth Content"
            image={require('../assets/img/best-practice-bg.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />
	 <Screen
      name="ToolKit"
      component={ToolKitDetailScreen}
      options={() => ({
        header: ({navigation}) => (
          <SubHeader
            title="Growth Content"
            image={require('../assets/img/best-practice-bg.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />
	

    <Screen
      name="ManageAccount"
      component={ManageAccountScreen}
      options={() => ({
        header: ({navigation}) => (
          <Header
            title="Account"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />
    <Screen
      name="OthersAccount"
      component={OtherAccountScreen}
      options={({route, navigation}) => ({
        id: route?.params?.id,
        header: () => (
          <Header
            title="Others Account"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    />

    <Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={({navigation}) => ({
        header: () => (
          <SubHeader
            title="Account"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />
    <Screen
      name="CriticalIssue"
      component={CriticalIssueScreen}
      options={() => ({
        header: ({navigation}) => (
          <SubHeader
            title="Critical Issues"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />
    <Screen
      name="ContentLibrary"
      component={ContentScreen}
      options={() => ({
        header: ({navigation}) => (
          <SubHeader
            title="Content Library"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />
    <Screen
      name="ContentDetail"
      component={ContentLibraryScreen}
      options={({route, navigation}) => ({
        resourceId: route?.params?.resourceId,
        header: () => (
          <SubHeader
            title="Content Library"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />
    <Screen
      name="LibraryDetail"
      component={LibraryDetailScreen}
      options={({route, navigation}) => ({
        resourceId: route?.params?.resourceId,
        header: () => (
          <SubHeader
            title="Content Library"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />
    <Screen
      name="ContentTags"
      component={ContentTagsScreen}
      options={({route, navigation}) => ({
        id: route?.params?.id,
        animationEnabled: false,
        header: () => (
          <SubHeader
            title="Content Library"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />
    <Screen
      name="ContentLibraryDetail"
      component={ContentLibraryDetailScreen}
      options={({route}) => ({
        id: route?.params?.id,
        animationEnabled: false,
        header: ({navigation}) => (
          <SubHeader
            title="Content Library"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />
    <Screen
      name="ContactUs"
      component={ContactUsScreen}
      options={{
        headerTitle: 'Contact Us',
      }}
    />
    <Screen
      name="UpcomingView"
      component={UpcomingScreen}
      options={{
        headerTitle: '',
      }}
    />
    <Screen
      name="EventDetail"
      component={EventDetailScreen}
      options={({navigation, route}) => ({
        id: route?.params?.id,
		header: () => (
			<SubHeader
			  title={route?.params?.title}
			  image={route?.params?.image}
			  navigation={navigation}
			  noDrawer
			/>
		  ),
      })}
    />
    <Screen
      name="SessionDetail"
      component={SessionDetailScreen}
      options={({route}) => ({
        id: route?.params?.id,
        headerShown: false,
      })}
    />
    <Screen
      name="Search"
      component={SearchScreen}
      options={{headerShown: false}}
    />

    <Screen
      name="Gmail"
      component={GmailScreen}
      options={{headerShown: false}}
    />

    <Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        userID: route?.params?.userID,
        friendID: route?.params?.friendID,
        friendName: route?.params?.friendName,
        headerShown: false,
      })}
    />
    <Screen
      name="Privacy"
      component={PrivacyScreen}
      options={({navigation}) => ({
        header: () => (
          <SubHeader
            title="Privacy Policy"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />

    <Screen
      name="CommunityDetail"
      component={CommunityDetailScreen}
      options={({route, navigation}) => ({
        poeId: route?.params?.poeId,
        pillarId: route?.params?.pillarId,
        header: () => (
          <SubHeader
            title={route?.params?.title}
            image={route?.params?.image}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />

    <Screen
      name="GrowthDetail"
      component={GrowthDetailScreen}
      options={({navigation, route}) => ({
        header: () => (
          <SubHeader
            title={route?.params?.title}
            image={route?.params?.image}
            navigation={navigation}
            noDrawer
          />
        ),
      })}
    />

    <Screen
      name="Radar"
      component={RadarScreen}
      options={{headerShown: false}}
    />
  </Navigator>
);

export default AppStack;
