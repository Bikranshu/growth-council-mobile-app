import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import CoachingSession from './component';
import {fetchAllTraits, resetTraits} from './slice/sessionTraitsSlice';
import {fetchSessionByID, resetSession} from '../sessions/slice/sessionSlice';
import {
  registerSessionByID,
  resetSessionRegister,
} from '../sessions/slice/sessionRegister';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

const CoachingSessionDetailScreen = props => {
  const dispatch = useDispatch();
  const {route} = props;
  const isFocused = useIsFocused();
  const {traits, traitsLoading, traitsError} = useSelector(
    state => state.traits,
  );
  const {sessions, sessionLoading, sessionError} = useSelector(
    state => state.sessions,
  );
  const {sessionRegisters, sessionRegisterLoading, sessionRegisterError} =
    useSelector(state => state.sessionRegisters);
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  useFocusEffect(
    useCallback(() => {
      fetchSessionByIdentifier(route.params.id);
      return () => {
        cleanSession();
      };
    }, [isFocused]),
  );

  useFocusEffect(
    useCallback(() => {
      fetchAllTraitBySessionId(sessions.ID);
      return () => {
        cleanTraits();
      };
    }, [sessions]),
  );

  const fetchAllTraitBySessionId = sessionId => {
    dispatch(fetchAllTraits(sessionId));
  };

  const cleanTraits = () => {
    dispatch(resetTraits());
  };

  const fetchSessionByIdentifier = identifier => {
    dispatch(fetchSessionByID(identifier));
  };

  const registerSessionByIdentifier = formData => {
    return dispatch(registerSessionByID(formData));
  };

  const cleanSession = () => {
    dispatch(resetSession());
  };

  const cleanSessionRegister = () => {
    dispatch(resetSessionRegister());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  return (
    <CoachingSession
      {...props}
      traits={traits}
      traitsLoading={traitsLoading}
      traitsError={traitsError}
      fetchAllTraits={fetchAllTraits}
      cleanTraits={cleanTraits}
      sessions={sessions}
      sessionLoading={sessionLoading}
      sessionError={sessionError}
      fetchSessionByIdentifier={fetchSessionByIdentifier}
      cleanSession={cleanSession}
      sessionRegisters={sessionRegisters}
      sessionRegisterLoading={sessionRegisterLoading}
      sessionRegisterError={sessionRegisterError}
      registerSessionByIdentifier={registerSessionByIdentifier}
      cleanSessionRegister={cleanSessionRegister}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
    />
  );
};

export default CoachingSessionDetailScreen;
