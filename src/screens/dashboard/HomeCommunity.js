import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HomeCommunity from './components/HomeCommunity';

import {
  fetchAllPillarEvents,
  resetPillarEvent,
} from './slice/pillarEventsSlice';

import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from '../details/slice/pillarMembersContentsSlice';

import {
  fetchAllCommunityMembers,
  resetCommunityMember,
} from './slice/communityMemberSlice';
import {
  connectMemberByID,
  resetConnectMember,
} from '../people/slice/memberConnectionSlice';

import {fetchUsersByKey, resetUser} from '../account/slice/userSlice';

import {fetchAllPillarPOEs, resetPillarPOE} from './slice/pillarPOESlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

import {fetchEventByRegion, resetRegionEvent} from './slice/eventByRegionSlice';

const HomeCommunityScreen = props => {
  const dispatch = useDispatch();
  const {pillarEvents, pillarEventLoading, pillarEventError} = useSelector(
    state => state.pillarEvents,
  );

  const {communityMembers, communityMemberLoading, communityMemberError} =
    useSelector(state => state.communityMembers);

  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );

  const {memberConnections, memberConnectionLoading, memberConnectionError} =
    useSelector(state => state.memberConnections);

  const {users, userLoading, userError} = useSelector(state => state.users);

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const {regionEvents, regionEventLoading, regionEventError} = useSelector(
    state => state.regionEvents,
  );

  const {
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
  } = useSelector(state => state.pillarMemberContents);

  const fetchAllPillarEvent = pillarId => {
    dispatch(fetchAllPillarEvents(pillarId));
  };

  const fetchAllPillarPOE = pillarId => {
    dispatch(fetchAllPillarPOEs(pillarId));
  };

  const cleanPillarPOE = () => {
    dispatch(resetPillarPOE());
  };

  const cleanPillarEvent = () => {
    dispatch(resetPillarEvent());
  };

  const fetchAllCommunityMember = formData => {
    dispatch(fetchAllCommunityMembers(formData));
  };

  const cleanCommunityMember = () => {
    dispatch(resetCommunityMember());
  };

  const fetchAllUsers = formData => {
    dispatch(fetchUsersByKey(formData));
  };

  const cleanUser = () => {
    dispatch(resetUser());
  };

  const fetchAllPillarMemberContent = pillarId => {
    dispatch(fetchAllPillarMemberContents(pillarId));
  };

  const cleanPillarMemberContent = () => {
    dispatch(resetPillarMemberContent());
  };

  const connectMemberByIdentifier = formData => {
    return dispatch(connectMemberByID(formData));
  };

  const cleanConnectMember = () => {
    dispatch(resetConnectMember());
  };

  const fetchEventRegion = formData => {
    dispatch(fetchEventByRegion(formData));
  };

  const cleanEventRegion = () => {
    dispatch(resetRegionEvent());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };
  return (
    <HomeCommunity
      {...props}
      pillarEvents={pillarEvents}
      pillarEventLoading={pillarEventLoading}
      pillarEventError={pillarEventError}
      fetchAllPillarEvent={fetchAllPillarEvent}
      cleanPillarEvent={cleanPillarEvent}
      communityMembers={communityMembers}
      communityMemberLoading={communityMemberLoading}
      communityMemberError={communityMemberError}
      fetchAllCommunityMember={fetchAllCommunityMember}
      cleanCommunityMember={cleanCommunityMember}
      pillarPOEs={pillarPOEs}
      pillarPOELoading={pillarPOELoading}
      pillarPOEError={pillarPOEError}
      fetchAllPillarPOE={fetchAllPillarPOE}
      cleanPillarPOE={cleanPillarPOE}
      users={users}
      userLoading={userLoading}
      userError={userError}
      fetchAllUsers={fetchAllUsers}
      cleanUser={cleanUser}
      memberConnections={memberConnections}
      memberConnectionLoading={memberConnectionLoading}
      memberConnectionError={memberConnectionError}
      connectMemberByIdentifier={connectMemberByIdentifier}
      cleanConnectMember={cleanConnectMember}
      pillarMemberContents={pillarMemberContents}
      pillarMemberContentLoading={pillarMemberContentLoading}
      pillarMemberContentError={pillarMemberContentError}
      fetchAllPillarMemberContent={fetchAllPillarMemberContent}
      cleanPillarMemberContent={cleanPillarMemberContent}
      regionEvents={regionEvents}
      regionEventLoading={regionEventLoading}
      regionEventError={regionEventError}
      fetchEventRegion={fetchEventRegion}
      cleanEventRegion={cleanEventRegion}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
    />
  );
};

export default HomeCommunityScreen;
