import {useRoute} from '@react-navigation/native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CriticalIssue from './component';
import {
  fetchAllCriticalIssue,
  resetCriticalIssue,
} from './slice/criticalIssueSlice';

import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

const CriticalIssueScreen = props => {
  const dispatch = useDispatch();
  const route = useRoute();
  const index = route.params.index ?? 0;

  const {criticalIssue, criticalIssueLoading, criticalIssueError} = useSelector(
    state => state.criticalIssue,
  );

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const fetchCritcalIssue = () => {
    dispatch(fetchAllCriticalIssue());
  };

  const cleanCriticalIssue = () => {
    dispatch(resetCriticalIssue());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  return (
    <CriticalIssue
      {...props}
      criticalIssue={criticalIssue}
      criticalIssueLoading={criticalIssueLoading}
      criticalIssueError={criticalIssueError}
      index={index}
      fetchCritcalIssue={fetchCritcalIssue}
      cleanCriticalIssue={cleanCriticalIssue}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
    />
  );
};

export default CriticalIssueScreen;
