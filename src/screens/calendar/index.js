import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EventCalendar from './components';
import {fetchAllCalendarEvents, resetCalendarEvent} from './calendarEventSlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {fetchAllRegion, resetRegion} from '../people/slice/reginSlice';

const EventCalendarScreen = props => {
  const dispatch = useDispatch();

  const {calendarEvents, calendarEventLoading, calendarEventError} =
    useSelector(state => state.calendarEvents);

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const {region, regionLoading, regionError} = useSelector(
    state => state.region,
  );
  /**
   * Fetch all calendar events data.
   *
   */
  const fetchAllCalendarEvent = formData => {
    return dispatch(fetchAllCalendarEvents(formData));
  };

  const cleanCalendarEvent = () => {
    dispatch(resetCalendarEvent());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  const fetchAllRegions = () => {
    dispatch(fetchAllRegion());
  };
  const cleanRegion = () => {
    dispatch(resetRegion());
  };
  return (
    <EventCalendar
      {...props}
      calendarEvents={calendarEvents}
      calendarEventLoading={calendarEventLoading}
      calendarEventError={calendarEventError}
      fetchAllCalendarEvent={fetchAllCalendarEvent}
      cleanCalendarEvent={cleanCalendarEvent}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
      region={region}
      regionLoading={regionLoading}
      regionError={regionError}
      fetchAllRegions={fetchAllRegions}
      cleanRegion={cleanRegion}
    />
  );
};

export default EventCalendarScreen;
