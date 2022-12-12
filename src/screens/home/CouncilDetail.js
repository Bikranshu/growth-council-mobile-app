import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CouncilDetail from './components/CouncilDetail';

import {fetchPillarByID, resetPillar} from './slice/pillarSlice';
import {
  fetchUpcomingEventsByID,
  resetUpcomingEvent,
} from './slice/upcomingEventSlice';

import {
  fetchAllPillarPOEs,
  resetPillarPOE,
} from '../dashboard/slice/POE/pillarPOESlice';

const CouncilDetailScreen = props => {
  const dispatch = useDispatch();

  const {pillars, pillarLoading, pillarError} = useSelector(
    state => state.pillars,
  );
  const {upcomingEvents, upcomingEventLoading, upcomingEventError} =
    useSelector(state => state.upcomingEvents);
  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );
  /**
   * Fetch pillar data.
   * @param {string} identifier
   *
   */
  const fetchPillarByIdentifier = identifier => {
    dispatch(fetchPillarByID(identifier));
  };

  /**
   * Fetch upcoming events data.
   * @param {string} identifier
   *
   */
  const fetchUpcomingEventsByIdentifier = identifier => {
    dispatch(fetchUpcomingEventsByID(identifier));
  };

  /**
   * Clear pillar data.
   *
   */
  const cleanPillar = () => {
    dispatch(resetPillar());
  };

  /**
   * Clear upcoming event data.
   *
   */
  const cleanUpcomingEvent = () => {
    dispatch(resetUpcomingEvent());
  };

  const fetchAllPillarPOE = pillarId => {
    dispatch(fetchAllPillarPOEs(pillarId));
  };

  const cleanPillarPOE = () => {
    dispatch(resetPillarPOE());
  };

  return (
    <CouncilDetail
      {...props}
      pillars={pillars}
      pillarLoading={pillarLoading}
      pillarError={pillarError}
      fetchPillarByIdentifier={fetchPillarByIdentifier}
      cleanPillar={cleanPillar}
      upcomingEvents={upcomingEvents}
      upcomingEventLoading={upcomingEventLoading}
      upcomingEventError={upcomingEventError}
      fetchUpcomingEventsByIdentifier={fetchUpcomingEventsByIdentifier}
      cleanUpcomingEvent={cleanUpcomingEvent}
      pillarPOEs={pillarPOEs}
      pillarPOELoading={pillarPOELoading}
      pillarPOEError={pillarPOEError}
      fetchAllPillarPOE={fetchAllPillarPOE}
      cleanPillarPOE={cleanPillarPOE}
    />
  );
};

export default CouncilDetailScreen;
