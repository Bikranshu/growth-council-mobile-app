import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EventForum from './component/eventForum';

import {pastEventInForum} from './slice/pastEventSlice';

const EventForumScreen = props => {
  const dispatch = useDispatch();

  const {pastEvent, pastEventLoading, pastEventError} = useSelector(
    state => state.pastEvent,
  );

  const pastEventForum = () => {
    dispatch(pastEventInForum());
  };

  return (
    <EventForum
      {...props}
      pastEvent={pastEvent}
      pastEventLoading={pastEventLoading}
      pastEventForum={pastEventForum}
    />
  );
};

export default EventForumScreen;
