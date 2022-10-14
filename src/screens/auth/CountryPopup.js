import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import CountryPopup from './components/CountryPopup';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {updateUserByID, resetUser} from '../account/slice/userSlice';

const CountryPopupScreen = props => {
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
    <CountryPopup
      {...props}

	  profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfile={fetchProfile}
      cleanProfile={cleanProfile}
	  userLoading={userLoading}
      updateUser={updateUser}

    />
  );
};

export default CountryPopupScreen;
