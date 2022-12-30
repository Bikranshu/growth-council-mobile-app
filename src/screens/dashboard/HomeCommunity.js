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
} from './slice/Community/communityMemberSlice';
import {
  connectMemberByID,
  resetConnectMember,
} from '../people/slice/memberConnectionSlice';
import {
  deleteMemberByID,
  resetConnectdelete,
} from '../people/slice/deleteConnectionSlice';

import {fetchUsersByKey, resetUser} from '../account/slice/userSlice';

import {fetchAllPillarPOEs, resetPillarPOE} from './slice/POE/pillarPOESlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

import {fetchEventByRegion, resetRegionEvent} from './slice/eventByRegionSlice';

const HomeCommunityScreen = props => {
  const dispatch = useDispatch();
  

  const {communityMembers, communityMemberLoading, communityMemberError} =
    useSelector(state => state.communityMembers);

  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );

  const {memberConnections, memberConnectionLoading, memberConnectionError} =
    useSelector(state => state.memberConnections);


  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const {regionEvents, regionEventLoading, regionEventError} = useSelector(
    state => state.regionEvents,
  );


  const fetchAllPillarPOE = pillarId => {
    dispatch(fetchAllPillarPOEs(pillarId));
  };

  const cleanPillarPOE = () => {
    dispatch(resetPillarPOE());
  };



  const fetchAllCommunityMember = formData => {
    dispatch(fetchAllCommunityMembers(formData));
  };

  const cleanCommunityMember = () => {
    dispatch(resetCommunityMember());
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



  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  useEffect(() => {
    fetchProfileByID();
  }, []);
  return (
    <HomeCommunity
      {...props}

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

      memberConnections={memberConnections}
      memberConnectionLoading={memberConnectionLoading}
      memberConnectionError={memberConnectionError}
      connectMemberByIdentifier={connectMemberByIdentifier}
      cleanConnectMember={cleanConnectMember}

      regionEvents={regionEvents}
      regionEventLoading={regionEventLoading}
      regionEventError={regionEventError}
      fetchEventRegion={fetchEventRegion}
      cleanEventRegion={cleanEventRegion}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}

      cleanProfile={cleanProfile}
 
    />
  );
};

export default HomeCommunityScreen;
