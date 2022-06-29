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
  registerEventByID,
  resetEventRegister,
} from '../event/slice/eventRegisterSlice';

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

  const {eventRegisters, eventRegisterLoading, eventRegisterError} =
    useSelector(state => state.eventRegisters);

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

  const registerEventByIdentifier = formData => {
    return dispatch(registerEventByID(formData));
  };

  const cleanEventRegister = () => {
    dispatch(resetEventRegister());
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
      eventRegisters={eventRegisters}
      eventRegisterLoading={eventRegisterLoading}
      eventRegisterError={eventRegisterError}
      registerEventByIdentifier={registerEventByIdentifier}
      cleanEventRegister={cleanEventRegister}
    />
  );
};

export default GrowthDetailScreen;
