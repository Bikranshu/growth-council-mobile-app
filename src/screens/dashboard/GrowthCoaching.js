import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import GrowthCoaching from './components/GrowthCoaching';
import {
  fetchAllPillarEvents,
  resetPillarEvent,
} from './slice/pillarEventsSlice';
import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from '../details/slice/pillarMembersContentsSlice';
import {fetchAllPillarPOEs, resetPillarPOE} from './slice/POE/pillarPOESlice';
import {fetchEventByRegion, resetRegionEvent} from './slice/eventByRegionSlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';


const GrowthCoachingScreen = props => {
  const dispatch = useDispatch();
  const {pillarEvents, pillarEventLoading, pillarEventError} = useSelector(
    state => state.pillarEvents,
  );

  const {
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
  } = useSelector(state => state.pillarMemberContents);
  const {regionEvents, regionEventLoading, regionEventError} = useSelector(
    state => state.regionEvents,
  );

  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );


  const fetchAllPillarPOE = pillarId => {
    dispatch(fetchAllPillarPOEs(pillarId));
  };

  const cleanPillarPOE = () => {
    dispatch(resetPillarPOE());
  };

  const fetchAllPillarEvent = pillarId => {
    dispatch(fetchAllPillarEvents(pillarId));
  };

  const cleanPillarEvent = () => {
    dispatch(resetPillarEvent());
  };

  const fetchAllPillarMemberContent = pillarId => {
    dispatch(fetchAllPillarMemberContents(pillarId));
  };

  const cleanPillarMemberContent = () => {
    dispatch(resetPillarMemberContent());
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
    <GrowthCoaching
      {...props}
      pillarEvents={pillarEvents}
      pillarEventLoading={pillarEventLoading}
      pillarEventError={pillarEventError}
      fetchAllPillarEvent={fetchAllPillarEvent}
      cleanPillarEvent={cleanPillarEvent}
      pillarMemberContents={pillarMemberContents}
      pillarMemberContentLoading={pillarMemberContentLoading}
      pillarMemberContentError={pillarMemberContentError}
      fetchAllPillarMemberContent={fetchAllPillarMemberContent}
      cleanPillarMemberContent={cleanPillarMemberContent}
      pillarPOEs={pillarPOEs}
      pillarPOELoading={pillarPOELoading}
      pillarPOEError={pillarPOEError}
      fetchAllPillarPOE={fetchAllPillarPOE}
      cleanPillarPOE={cleanPillarPOE}
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

export default GrowthCoachingScreen;
