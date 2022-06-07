import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Email from './component/email';

import {sendMailByUser, resetSendMail} from './slice/emailSlice';

const EmailScreen = props => {
  const dispatch = useDispatch();
  ;

  const {sendMail, sendMailLoading, sendMailError} = useSelector(
    state => state.sendMail,
  );

 

  const sendMailUser = formData => {
    return dispatch(sendMailByUser(formData));
  };
  const cleanSendMail = () => {
    dispatch(resetSendMail());
  };

  return (
    <Email
      {...props}

      sendMail={sendMail}
      sendMailLoading={sendMailLoading}
      sendMailError={sendMailError}
      sendMailUser={sendMailUser}
      cleanSendMail={cleanSendMail}
    />
  );
};

export default EmailScreen;
