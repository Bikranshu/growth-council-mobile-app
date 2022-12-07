import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Event from './components';

import {fetchEventByID, resetEvent} from './slice/eventSlice';
import {
  registerEventByID,
  resetEventRegister,
} from './slice/eventRegisterSlice';

const EventDetailScreen = props => {
  const dispatch = useDispatch();

  const {events, eventLoading, eventError} = useSelector(state => state.events);
  const {eventRegisters, eventRegisterLoading, eventRegisterError} =
    useSelector(state => state.eventRegisters);

  /**
   * Fetch event data.
   * @param {string} identifier
   *
   */
  const fetchEventByIdentifier = identifier => {
    dispatch(fetchEventByID(identifier));
  };

  /**
   * Register event.
   * @param {object} formData
   *
   */
  const registerEventByIdentifier = formData => {
    return dispatch(registerEventByID(formData));
  };

  /**
   * Clear event data.
   *
   */
  const cleanEvent = () => {
    dispatch(resetEvent());
  };

  /**
   * Clear register event data.
   *
   */
  const cleanEventRegister = () => {
    dispatch(resetEventRegister());
  };

  return (
    <Event
      {...props}
      events={events}
      eventLoading={eventLoading}
      eventError={eventError}
      fetchEventByIdentifier={fetchEventByIdentifier}
      cleanEvent={cleanEvent}
      // event Register
      eventRegisters={eventRegisters}
      eventRegisterLoading={eventRegisterLoading}
      eventRegisterError={eventRegisterError}
      registerEventByIdentifier={registerEventByIdentifier}
      cleanEventRegister={cleanEventRegister}
      // Send Email
    />
  );
};

export default EventDetailScreen;
