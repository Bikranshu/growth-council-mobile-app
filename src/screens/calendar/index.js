import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EventCalendar from './components';
import {fetchAllCalendarEvents, resetCalendarEvent} from './calendarEventSlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

const EventCalendarScreen = props => {
  const dispatch = useDispatch();

  const {calendarEvents, calendarEventLoading, calendarEventError} =
    useSelector(state => state.calendarEvents);

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  /**
   * Fetch all calendar events data.
   *
   */
  const fetchAllCalendarEvent = formData => {
    return dispatch(fetchAllCalendarEvents(formData));
  };

  /**
   * Clear calendar event data.
   *
   */
  const cleanCalendarEvent = () => {
    dispatch(resetCalendarEvent());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
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
    />
  );
};

export default EventCalendarScreen;
