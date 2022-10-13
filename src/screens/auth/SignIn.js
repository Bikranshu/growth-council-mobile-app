import React from 'react';

import SignInForm from './components/SignIn';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {updateUserByID, resetUser} from '../account/slice/userSlice';

const SignInScreen = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const {users, userLoading, userError} = useSelector(state => state.users);

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };
  const updateUser = formData => {
    return dispatch(updateUserByID(formData));
  };

  return (
    <SignInForm
      {...props}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
      updateUser={updateUser}
    />
  );
};

export default SignInScreen;
