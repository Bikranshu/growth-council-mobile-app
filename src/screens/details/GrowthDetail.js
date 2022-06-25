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
  fetchPoeSelfLearns,
  resetPoeSelfLearn,
} from '../selfLearn/slice/poeSelfLearnSlice';

import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from './slice/pillarMembersContentsSlice';


import {
  fetchRadarMemberDetails,
  resetRadarMemberDetails,
} from './slice/radarSlice';

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
  const {poeSelfLearns, poeSelfLearnLoading, poeSelfLearnError} = useSelector(
    state => state.poeSelfLearns,
  );

  const {
    radarMemberDetails,
    radarMemberDetailsLoading,
    radarMemberDetailsError,
  } = useSelector(state => state.radarMemberDetails);

  

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

  const fetchPoeSelfLearn = poeId => {
    dispatch(fetchPoeSelfLearns(poeId));
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
  const cleanPoeSelfLearn = () => {
    dispatch(resetPoeSelfLearn());
  };

  const fetchRadarMemberDetail = () => {
    dispatch(fetchRadarMemberDetails());
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
      poeSelfLearns={poeSelfLearns}
      poeSelfLearnLoading={poeSelfLearnLoading}
      poeSelfLearnError={poeSelfLearnError}
      fetchPoeSelfLearn={fetchPoeSelfLearn}
      cleanPoeSelfLearn={cleanPoeSelfLearn}
      radarMemberDetails={radarMemberDetails}
      radarMemberDetailsLoading={radarMemberDetailsLoading}
      radarMemberDetailsError={radarMemberDetailsError}
      fetchRadarMemberDetail={fetchRadarMemberDetail}

	
    />
  );
};

export default GrowthDetailScreen;
