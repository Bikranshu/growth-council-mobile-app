import React from 'react';

import SignInForm from './components/SignIn';
import {useDispatch, useSelector} from 'react-redux';

const SignInScreen = props => {
  const dispatch = useDispatch();

  return <SignInForm {...props} />;
};

export default SignInScreen;
