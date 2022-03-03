import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from './components';

import {
  fetchAllUpcomingEvents,
  resetUpcomingEvent,
} from '../home/slice/upcomingEventSlice';
import {
  fetchAllPillarSliders,
  resetPillarSlider,
} from '../home/slice/pillarSliderSlice';

import {fetchAllPOEs, resetPOE} from './slice/pointOfEngagementSlice';

import {
  fetchAllCommunityMembers,
  resetCommunityMember,
} from './slice/communityMemberSlice';

const DashboardScreen = props => {
  const dispatch = useDispatch();
  const [contentSlider, setContentSlider] = useState([]);
  const {pillarSliders, pillarSliderLoading, pillarSliderError} = useSelector(
    state => state.pillarSliders,
  );

  const {upcomingEvents, upcomingEventLoading, upcomingEventError} =
    useSelector(state => state.upcomingEvents);

  const {poes, poeLoading, poeError} = useSelector(state => state.poes);

  const {communityMembers, communityMemberLoading, communityMemberError} =
    useSelector(state => state.communityMembers);

  useEffect(() => {
    let content = pillarSliders?.flatMap((value, key) => {
      return value?.pillar_contents;
    });
    setContentSlider(content);
  }, [pillarSliders]);



  const fetchAllUpcomingEvent = () => {
    dispatch(fetchAllUpcomingEvents());
  };

  const fetchAllPOE = () => {
    dispatch(fetchAllPOEs());
  };

  const fetchAllCommunityMember = () => {
    dispatch(fetchAllCommunityMembers());
  };

  const fetchAllPillarSlider = () => {
    dispatch(fetchAllPillarSliders());
  };


  const cleanUpcomingEvent = () => {
    dispatch(resetUpcomingEvent());
  };

  const cleanPOE = () => {
    dispatch(resetPOE());
  };

  const cleanCommunityMember = () => {
    dispatch(resetCommunityMember());
  };
  const cleanPillarSlider = () => {
    dispatch(resetPillarSlider());
  };

  return (
    <Dashboard
      {...props}
      upcomingEvents={upcomingEvents}
      upcomingEventLoading={upcomingEventLoading}
      upcomingEventError={upcomingEventError}
      fetchAllUpcomingEvent={fetchAllUpcomingEvent}
      cleanUpcomingEvent={cleanUpcomingEvent}
      poes={poes}
      poeLoading={poeLoading}
      poeError={poeError}
      fetchAllPOE={fetchAllPOE}
      cleanPOE={cleanPOE}
      communityMembers={communityMembers}
      communityMemberLoading={communityMemberLoading}
      communityMemberError={communityMemberError}
      fetchAllCommunityMember={fetchAllCommunityMember}
      cleanCommunityMember={cleanCommunityMember}
      pillarSliders={pillarSliders}
      pillarSliderLoading={pillarSliderLoading}
      pillarSliderError={pillarSliderError}
      fetchAllPillarSlider={fetchAllPillarSlider}
      cleanPillarSlider={cleanPillarSlider}
      contentSlider={contentSlider}
    />
  );
};

export default DashboardScreen;
