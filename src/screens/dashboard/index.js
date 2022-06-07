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

import {
  fetchAllLatestContent,
  resetLatestContent,
} from './slice/latestContentSlice';
import {
  fetchAllCriticalIssue,
  resetCriticalIssue,
} from '../criticalIssue/slice/criticalIssueSlice';



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

  const {latestContent, latestContentLoading, latestContentError} = useSelector(
    state => state.latestContent,
  );
  const {criticalIssue, criticalIssueLoading, criticalIssueError} = useSelector(
    state => state.criticalIssue,
  );

 

  useEffect(() => {
    let content = pillarSliders?.flatMap((value, key) => {
      console.log(value);
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
  const fetchLatestContent = () => {
    dispatch(fetchAllLatestContent());
  };

  const cleanLatestContent = () => {
    dispatch(resetLatestContent());
  };

  const fetchCritcalIssue = () => {
    dispatch(fetchAllCriticalIssue());
  };

  const cleanCriticalIssue = () => {
    dispatch(resetCriticalIssue());
  };

  const fetchNewMember = () => {
    dispatch(fetchAllNewMember());
  };

  const cleanNewMember = () =>{
	  dispatch(resetNewMember())
  }

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
      latestContent={latestContent}
      latestContentLoading={latestContentLoading}
      latestContentError={latestContentError}
      fetchLatestContent={fetchLatestContent}
      cleanLatestContent={cleanLatestContent}
      criticalIssue={criticalIssue}
      criticalIssueLoading={criticalIssueLoading}
      criticalIssueError={criticalIssueError}
      fetchCritcalIssue={fetchCritcalIssue}
      cleanCriticalIssue={cleanCriticalIssue}


    />
  );
};

export default DashboardScreen;
