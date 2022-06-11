import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Email from './component/index';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {sendMailByUser, resetSendMail} from './slice/emailSlice';

const EmailScreen = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const {sendMail, sendMailLoading, sendMailError} = useSelector(
    state => state.sendMail,
  );

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };
  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  const sendMailUser = formData => {
    return dispatch(sendMailByUser(formData));
  };
  const cleanSendMail = () => {
    dispatch(resetSendMail());
  };

  return (
    <Email
      {...props}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
      sendMail={sendMail}
      sendMailLoading={sendMailLoading}
      sendMailError={sendMailError}
      sendMailUser={sendMailUser}
      cleanSendMail={cleanSendMail}
    />
  );
};

export default EmailScreen;
