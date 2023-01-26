import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BestPractice from './components/BestPractice';
import {
    fetchAllPillarEvents,
    resetPillarEvent,
} from './slice/pillarEventsSlice';
import {
    fetchAllPillarMemberContents,
    resetPillarMemberContent,
} from '../details/slice/pillarMembersContentsSlice';
import {fetchAllPillarPOEs, resetPillarPOE} from './slice/POE/pillarPOESlice';

import {
	connectMemberByID,
	resetConnectMember,
  } from './slice/memberConnectionSlice';

const BestPracticeScreen = props => {
    const dispatch = useDispatch();
    const {pillarEvents, pillarEventLoading, pillarEventError} = useSelector(
        state => state.pillarEvents,
    );
    const {
        pillarMemberContents,
        pillarMemberContentLoading,
        pillarMemberContentError,
    } = useSelector(state => state.pillarMemberContents);

    const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
        state => state.pillarPOEs,
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

    return (
        <BestPractice
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
        />
    );
};

export default BestPracticeScreen;
