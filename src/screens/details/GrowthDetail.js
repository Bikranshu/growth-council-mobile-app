import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import GrowthDetail from './components/GrowthDetail';

import {fetchAllPOEEvents, resetPOEEvent} from './slice/poeEventListSlice';

import {fetchAllPOEDetails, resetPOEDetail} from './slice/poeDetailSlice';

import {
  fetchcoachingSession,
  resetcoachingSession,
} from './slice/sessionlistSlice';

import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from './slice/pillarMembersContentsSlice';

import {
  fetchRadarMemberDetails,
  resetRadarMemberDetails,
} from './slice/radarSlice';

import {
  GrowthCoachingSignup,
  resetCoachingSignup,
} from './slice/coachingSignupSlice';

import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {
  sendEmailThroughButton,
  resetsendEmail,
} from '../event/slice/emailButtonSlice';

const GrowthDetailScreen = props => {
  const dispatch = useDispatch();

  const {poeDetails, poeDetailLoading, poeDetailError} = useSelector(
    state => state.poeDetails,
  );

  const {poeEvents, poeEventLoading, poeEventError} = useSelector(
    state => state.poeEvents,
  );

  const {
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
  } = useSelector(state => state.pillarMemberContents);

  const {coachingSession, coachingSessionLoading, coachingSessionError} =
    useSelector(state => state.coachingSession);

  const {
    radarMemberDetails,
    radarMemberDetailsLoading,
    radarMemberDetailsError,
  } = useSelector(state => state.radarMemberDetails);

  const {coachingSignup, coachingSignupLoading, coachingSignupError} =
    useSelector(state => state.coachingSignup);

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const {sendEmail, sendEmailLoading, sendEmailError} = useSelector(
    state => state.sendEmail,
  );

  /**
   * Fetch event data.
   * @param {string} poeId
   *
   */
  /**
   * Fetch event data.
   * @param {string} pillarId
   *
   */

  const fetchAllPOEDetail = poeId => {
    dispatch(fetchAllPOEDetails(poeId));
  };

  const fetchAllPOEEvent = poeId => {
    dispatch(fetchAllPOEEvents(poeId));
  };

  const fetchAllPillarMemberContent = pillarId => {
    dispatch(fetchAllPillarMemberContents(pillarId));
  };

  const fetchCoachingSessions = poeId => {
    dispatch(fetchcoachingSession(poeId));
  };

  const cleanPOEDetail = () => {
    dispatch(resetPOEDetail());
  };

  const cleanPOEEvent = () => {
    dispatch(resetPOEEvent());
  };

  const cleanPillarMemberContent = () => {
    dispatch(resetPillarMemberContent());
  };

  const cleanCoachingSession = () => {
    dispatch(resetcoachingSession());
  };

  const fetchRadarMemberDetail = () => {
    dispatch(fetchRadarMemberDetails());
  };

  const signupCoachingSession = formData => {
    return dispatch(GrowthCoachingSignup(formData));
  };

  const cleanSignUpCoaching = () => {
    dispatch(resetCoachingSignup());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  /**
   * Send email through button.
   * @param {object} formData
   *
   */
  const sendEmailThroughButtons = formData => {
    return dispatch(sendEmailThroughButton(formData));
  };

  const cleanSendEmail = () => {
    dispatch(resetsendEmail());
  };

  return (
    <GrowthDetail
      {...props}
      poeDetails={poeDetails}
      poeDetailLoading={poeDetailLoading}
      poeDetailError={poeDetailError}
      fetchAllPOEDetail={fetchAllPOEDetail}
      cleanPOEDetail={cleanPOEDetail}
      poeEvents={poeEvents}
      poeEventLoading={poeEventLoading}
      poeEventError={poeEventError}
      fetchAllPOEEvent={fetchAllPOEEvent}
      cleanPOEEvent={cleanPOEEvent}
      pillarMemberContents={pillarMemberContents}
      pillarMemberContentLoading={pillarMemberContentLoading}
      pillarMemberContentError={pillarMemberContentError}
      fetchAllPillarMemberContent={fetchAllPillarMemberContent}
      cleanPillarMemberContent={cleanPillarMemberContent}
      coachingSession={coachingSession}
      coachingSessionLoading={coachingSessionLoading}
      coachingSessionError={coachingSessionError}
      fetchCoachingSessions={fetchCoachingSessions}
      cleanCoachingSession={cleanCoachingSession}
      radarMemberDetails={radarMemberDetails}
      radarMemberDetailsLoading={radarMemberDetailsLoading}
      radarMemberDetailsError={radarMemberDetailsError}
      fetchRadarMemberDetail={fetchRadarMemberDetail}
      coachingSignup={coachingSignup}
      coachingSignupLoading={coachingSignupLoading}
      coachingSignupError={coachingSignupError}
      signupCoachingSession={signupCoachingSession}
      cleanSignUpCoaching={cleanSignUpCoaching}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
      // Send Email
      sendEmail={sendEmail}
      sendEmailLoading={sendEmailLoading}
      sendEmailError={sendEmailError}
      sendEmailThroughButtons={sendEmailThroughButtons}
      cleanSendEmail={cleanSendEmail}
    />
  );
};

export default GrowthDetailScreen;
