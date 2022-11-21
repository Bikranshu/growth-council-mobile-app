import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CommunityDetail from './components/CommunityDetail';

import {
  fetchSessionDetailByID,
  resetSessionDetail,
} from './slice/sesssionDetailSlice';

import {fetchAllPOEEvents, resetPOEEvent} from './slice/poeEventListSlice';

import {fetchAllPOEDetails, resetPOEDetail} from './slice/poeDetailSlice';

import {
  fetchAllPillarMemberContents,
  resetPillarMemberContent,
} from './slice/pillarMembersContentsSlice';

import {
  fetchAllPillarPOEs,
  resetPillarPOE,
} from '../dashboard/slice/POE/pillarPOESlice';

import {getIdBySlug, resetGetSlug} from './slice/getIdBySlug';

import {
  sendEmailThroughButton,
  resetsendEmail,
} from '../event/slice/emailButtonSlice';

const CommunityDetailScreen = props => {
  const dispatch = useDispatch();

  const {sessionDetails, sessionDetailLoading, sessionDetailError} =
    useSelector(state => state.sessionDetails);

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

  const {pillarPOEs, pillarPOELoading, pillarPOEError} = useSelector(
    state => state.pillarPOEs,
  );

  const {getSlug, getSlugLoading, getSlugError} = useSelector(
    state => state.getSlug,
  );

  const {sendEmail, sendEmailLoading, sendEmailError} = useSelector(
    state => state.sendEmail,
  );

  /**
   * Fetch event data.
   * @param {string} identifier
   *
   */
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
  const fetchSessionDetailByIdentifier = identifier => {
    dispatch(fetchSessionDetailByID(identifier));
  };

  const fetchAllPOEDetail = poeId => {
    dispatch(fetchAllPOEDetails(poeId));
  };

  const fetchAllPOEEvent = poeId => {
    dispatch(fetchAllPOEEvents(poeId));
  };

  const fetchAllPillarMemberContent = pillarId => {
    dispatch(fetchAllPillarMemberContents(pillarId));
  };

  /**
   * Clear event data.
   *
   */
  const cleanSessionDetail = () => {
    dispatch(resetSessionDetail());
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

  const fetchAllPillarPOE = pillarId => {
    dispatch(fetchAllPillarPOEs(pillarId));
  };

  const cleanPillarPOE = () => {
    dispatch(resetPillarPOE());
  };

  const GetIdBySlug = () => {
    dispatch(getIdBySlug());
  };

  const cleanSlug = () => {
    dispatch(resetGetSlug());
  };

  /**
   * Send email through button.
   * @param {object} formData
   *
   */
  const sendEmailThroughButtons = formData => {
    return dispatch(sendEmailThroughButton(formData));
  };

  const cleanSendEmail = () => {
    dispatch(resetsendEmail());
  };
  return (
    <CommunityDetail
      {...props}
      sessionDetails={sessionDetails}
      sessionDetailLoading={sessionDetailLoading}
      sessionDetailError={sessionDetailError}
      fetchSessionDetailByIdentifier={fetchSessionDetailByIdentifier}
      cleanSessionDetail={cleanSessionDetail}
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
      pillarPOEs={pillarPOEs}
      pillarPOELoading={pillarPOELoading}
      pillarPOEError={pillarPOEError}
      fetchAllPillarPOE={fetchAllPillarPOE}
      cleanPillarPOE={cleanPillarPOE}
      getSlug={getSlug}
      getSlugLoading={getSlugLoading}
      getSlugError={getSlugError}
      GetIdBySlug={GetIdBySlug}
      cleanSlug={cleanSlug}
      // Send Email
      sendEmail={sendEmail}
      sendEmailLoading={sendEmailLoading}
      sendEmailError={sendEmailError}
      sendEmailThroughButtons={sendEmailThroughButtons}
      cleanSendEmail={cleanSendEmail}
    />
  );
};

export default CommunityDetailScreen;
