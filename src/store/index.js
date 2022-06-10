import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../screens/auth/authSlice';

import userReducer from '../screens/account/slice/userSlice';
import passwordReducer from '../screens/account/slice/passwordSlice';

import pointOfEngagementReducer from '../screens/dashboard/slice/pointOfEngagementSlice';
import pillarPOEReducer from '../screens/dashboard/slice/pillarPOESlice';

import communityMemberReducer from '../screens/dashboard/slice/communityMemberSlice';

import aboutReducer from '../screens/about/slice/aboutSlice';
import feedbackReducer from '../screens/feedback/slice/feedbackSlice';
import ideaReducer from '../screens/ideas/slice/ideaSlice';
import privacyReducer from '../screens/privacy/slice/privacySlice';

import eventReducer from '../screens/event/slice/eventSlice';
import eventRegisterReducer from '../screens/event/slice/eventRegisterSlice';

import connectionReducer from '../screens/chat/slice/connetionSlice';
import notificationReducer from '../screens/chat/slice/notificationSlice';

import memberConnectionReducer from '../screens/people/slice/memberConnectionSlice';

import profileReducer from '../screens/account/slice/profileSlice';
import otherProfileReducer from '../screens/account/slice/otherProfileSlice';
import profileEventReducer from '../screens/account/slice/profileEventSlice';
import profileSessionReducer from '../screens/account/slice/profileSessionSlice';

import communityReducer from '../screens/dashboard/slice/communitySlice';
import pillarEventsReducer from '../screens/dashboard/slice/pillarEventsSlice';
import communityMemberContentReducer from '../screens/dashboard/slice/communityMemberContentSlice';
import growthCoachingMemberContentReducer from '../screens/dashboard/slice/growthCoachingMemberContentSlice';
import bestPracticesReducer from '../screens/dashboard/slice/bestPracticesSlice';
import bestPracticesMemberContentReducer from '../screens/dashboard/slice/bestPracticesMemberContentSlice';
import growthCoachingsReducer from '../screens/dashboard/slice/growthCoachingSlice';
import poeDetailReducer from '../screens/details/slice/poeDetailSlice';
import poeEventListReducer from '../screens/details/slice/poeEventListSlice';
import pillarMembersContentsReducer from '../screens/details/slice/pillarMembersContentsSlice';

import sessionDetailReducer from '../screens/details/slice/sesssionDetailSlice';

import upcomingEventReducer from '../screens/home/slice/upcomingEventSlice';
import detailReducer from '../screens/home/slice/detailSlice';
import pillarReducer from '../screens/home/slice/pillarSlice';
import pillarSliderReducer from '../screens/home/slice/pillarSliderSlice';

import sessionReducer from '../screens/sessions/slice/sessionSlice';
import sessionRegisterReducer from '../screens/sessions/slice/sessionRegister';

import calendarEventReducer from '../screens/calendar/calendarEventSlice';

import searchReducer from '../screens/search/searchSlice';
import uploadProfileImageReducer from '../screens/account/slice/uploadProfileImageSlice';
import updateReducer from '../screens/account/slice/updateProfileImageSlice';
import expertiseReducer from '../screens/people/slice/expertiseSlice';
import coachingSessionReducer from '../screens/details/slice/sessionlistSlice';
import traitsReducer from '../screens/coachingSession/slice/sessionTraitsSlice';
import subTraitReducer from '../screens/coachingSession/slice/subTraitsSlice';
import traitAnswerReducer from '../screens/coachingSession/slice/traitAnswerbyUserId';

import poeSelfLearnReducer from '../screens/selfLearn/slice/poeSelfLearnSlice';
import selfLearnTraitReducer from '../screens/selfLearn/slice/selfLearnTraitsSlice';
import selfLearnReducer from '../screens/selfLearn/slice/selfLearnByIdSlice';

import contentReducer from '../screens/contentLibrary/slice/contentSlice';
import contentLibraryReducer from '../screens/contentLibrary/slice/contentLibrarySlice';
import libraryDetailReducer from '../screens/contentLibrary/slice/libraryDetailSlice';
import contentLibraryDetailsReducer from '../screens/details/slice/contentLibraryDetailSlice';
import latestContentReducer from '../screens/dashboard/slice/latestContentSlice';
import searchContentReducer from '../screens/contentLibrary/slice/searchContentSlice';

import criticalIssueReducer from '../screens/criticalIssue/slice/criticalIssueSlice';
import contentTagsReducer from '../screens/contentLibrary/slice/contentTagsSlice';
import sendMailReducer from '../screens/email/slice/emailSlice';
import radarReducer from '../screens/details/slice/radarSlice';
import termsReducer from '../screens/terms/component/termsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
  password: passwordReducer,
  upcomingEvents: upcomingEventReducer,
  poes: pointOfEngagementReducer,
  pillarPOEs: pillarPOEReducer,
  communityMembers: communityMemberReducer,
  events: eventReducer,
  about: aboutReducer,
  details: detailReducer,
  feedback: feedbackReducer,
  privacy: privacyReducer,
  idea: ideaReducer,
  pillars: pillarReducer,
  pillarSliders: pillarSliderReducer,
  pillarEvents: pillarEventsReducer,
  poeDetails: poeDetailReducer,
  poeEvents: poeEventListReducer,
  pillarMemberContents: pillarMembersContentsReducer,

  connection: connectionReducer,
  notifications: notificationReducer,

  communities: communityReducer,
  communityMemberContents: communityMemberContentReducer,
  sessionDetails: sessionDetailReducer,
  profile: profileReducer,
  otherProfiles: otherProfileReducer,
  profileEvent: profileEventReducer,
  bestPractices: bestPracticesReducer,
  growthCoachings: growthCoachingsReducer,
  bestPracticesMemberContents: bestPracticesMemberContentReducer,
  growthCoachingMemberContents: growthCoachingMemberContentReducer,
  profileSession: profileSessionReducer,
  memberConnections: memberConnectionReducer,
  eventRegisters: eventRegisterReducer,
  sessions: sessionReducer,
  sessionRegisters: sessionRegisterReducer,

  calendarEvents: calendarEventReducer,
  searches: searchReducer,
  expertise: expertiseReducer,
  uploadProfileImages: uploadProfileImageReducer,
  updateEntities: updateReducer,
  coachingSession: coachingSessionReducer,
  traits: traitsReducer,
  subTraits: subTraitReducer,
  traitsAnswer: traitAnswerReducer,

  poeSelfLearns: poeSelfLearnReducer,
  selfLearnTraits: selfLearnTraitReducer,
  selfLearns: selfLearnReducer,
  content: contentReducer,
  contentLibrary: contentLibraryReducer,
  libraryDetails: libraryDetailReducer,
  criticalIssue: criticalIssueReducer,
  contentLibraryDetails: contentLibraryDetailsReducer,
  latestContent: latestContentReducer,
  searchContent: searchContentReducer,
  contentTags: contentTagsReducer,
  radarMemberDetails: radarReducer,
  sendMail: sendMailReducer,
  terms: termsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    let middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    });

    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

export {store, persistor};
