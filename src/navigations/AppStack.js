import React from 'react';
import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import JourneyScreen from '../screens/auth/Journey';
import SignUpNextScreen from '../screens/auth/SignUpNext';

import ContentScreen from '../screens/contentLibrary';
import ContactUsScreen from '../screens/static/ContactUs';
import CriticalIssueScreen from '../screens/criticalIssue/index';
import ChangePasswordScreen from '../screens/account/ChangePassword';
import ContentTagsScreen from '../screens/contentLibrary/contentTags';
import LibraryDetailScreen from '../screens/contentLibrary/libraryDetails';
import ContentLibraryScreen from '../screens/contentLibrary/contentLibrary';
import ContentLibraryDetailScreen from '../screens/details/ContentLibraryDetail';

import SearchScreen from '../screens/search';
import GmailScreen from '../screens/email/index';
import EventDetailScreen from '../screens/event';
import SessionDetailScreen from '../screens/sessions';

import PrivacyScreen from '../screens/privacy';
import FrostRadarScreen from '../screens/radar';
import OtherAccountScreen from '../screens/account/OthersAccount';
import ManageAccountScreen from '../screens/account/ManageAccount';

import ChatScreen from '../screens/chat';
import PeopleScreen from '../screens/people';
import Header from '../shared/header/header';
import RadarScreen from '../screens/details/Radar';
import SubHeader from '../shared/header/SubHeader';
import DashboardScreen from '../screens/dashboard';
import MainHeader from '../shared/header/MainHeader';
import UserListScreen from '../screens/chat/UserList';
import PDFDetailScreen from '../screens/selfLearn/pdf';
import SelfLearnDetailScreen from '../screens/selfLearn';
import OptionHeader from '../shared/header/optionHeader';
import DiscussionScreen from '../screens/discussionForum';
// import NotificationScreen from '../screens/Notification';
import UpcomingScreen from '../screens/dashboard/UpcomingView';
import DrawerNavigation from '../navigations/DrawerNavigation';
import GrowthDetailScreen from '../screens/details/GrowthDetail';
import SubPOEDetailScreen from '../screens/details/subPoeDetails';
import ToolKitDetailScreen from '../screens/details/toolkitsDetail';
import CoachingSessionDetailScreen from '../screens/coachingSession';
import CommunityDetailScreen from '../screens/details/CommunityDetail';
// import EventForumScreen from '../screens/discussionForum/eventForum';
import SubPOEListDetailScreen from '../screens/details/subPoeListDetails';
import NotificationListScreen from '../screens/Notification/notificationList';
import SelfAssessment from '../screens/coachingSession/component/selfAssessment';
import SessionCompleted from '../screens/coachingSession/component/sessionCompleted';

import {GROWTH_COMMUNITY_ID} from '../constants';

const {Navigator, Screen} = createStackNavigator();

const AppStack = ({initialRouteName, setInitialRoute}) => (
  console.log('initialRouteName', initialRouteName),
  (
    <Navigator
      initialRouteName={initialRouteName?.name}
      initialParams={initialRouteName?.params}>
      {/*    */}
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
              // title={route?.params?.title}
              title="Self Assessment"
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
              title="Self Assessment"
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
              title="PDF Viewer"
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
              title=""
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
              noDrawer={true}
            />
          ),
        })}
      />

      {/* <Screen
      name="Notification"
      component={NotificationScreen}
      options={() => ({
        header: ({navigation}) => (
          <Header
            title="Notification"
            image={require('../assets/img/appBG.png')}
            navigation={navigation}
            noDrawer={true}
          />
        ),
      })}
    /> */}

      <Screen
        name="NotificationList"
        component={NotificationListScreen}
        options={() => ({
          header: ({navigation}) => (
            <SubHeader
              title="Notification"
              image={require('../assets/img/appBG.png')}
              navigation={navigation}
              noDrawer={true}
            />
          ),
        })}
      />

      <Screen
        name="Discussion"
        component={DiscussionScreen}
        options={route => ({
          eventID: route?.params?.eventID,
          header: ({navigation, route}) => (
            <SubHeader
              title="Discussion"
              image={route?.params?.image}
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
              title="Growth Content"
              image={require('../assets/img/best-practice-bg.png')}
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
              title="Growth Content"
              id="Growth Content"
              image={require('../assets/img/best-practice-bg.png')}
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
              title="Growth Content"
              id="Growth Content"
              image={require('../assets/img/best-practice-bg.png')}
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
              title="Growth Content"
              image={require('../assets/img/best-practice-bg.png')}
              navigation={navigation}
              noDrawer
            />
          ),
        })}
      />
      <Screen
        name="ContentLibraryDetail"
        component={ContentLibraryDetailScreen}
        initialParams={initialRouteName?.params}
        options={({route}) => ({
          id: route?.params?.id,
          animationEnabled: false,
          header: ({navigation}) => (
            <SubHeader
              title="Growth Content"
              image={require('../assets/img/best-practice-bg.png')}
              navigation={navigation}
              noDrawer
              setInitialRoute={setInitialRoute}
              params={initialRouteName?.params}
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
        initialParams={initialRouteName?.params}
        options={({navigation, route}) => ({
          id: route?.params?.id,
          header: () => (
            <SubHeader
              title={route?.params?.title}
              image={route?.params?.image}
              navigation={navigation}
              noDrawer
              setInitialRoute={setInitialRoute}
              params={initialRouteName?.params}
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
        options={({route, navigation}) => ({
          headerTitle: '',
          headerStyle: {height: 70},
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
        // options={{headerShown: false}}
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
              subtitle={route?.params?.title}
              id={GROWTH_COMMUNITY_ID}
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
  )
);

export default AppStack;
