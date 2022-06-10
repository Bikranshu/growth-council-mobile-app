import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ManageAccount from './components/ManageAccount';
import {fetchProfileByID, resetProfile} from './slice/profileSlice';
import {updateUserByID, resetUser} from './slice/userSlice';
import {
  fetchAllExpertise,
  resetExpertise,
} from '../people/slice/expertiseSlice';

import {
  uploadProfileImage,
  resetUploadProfileImage,
} from './slice/uploadProfileImageSlice';
import {
  updateProfileImage,
  resetUpdateProfileImage,
} from './slice/updateProfileImageSlice';

const ManageAccountScreen = props => {
  const dispatch = useDispatch();

  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const {users, userLoading, userError} = useSelector(state => state.users);
  const {expertise, expertiseLoading, expertiseError} = useSelector(
    state => state.expertise,
  );

  const {
    uploadProfileImages,
    uploadProfileImageLoading,
    uploadProfileImageError,
  } = useSelector(state => state.uploadProfileImages);
  const {updateEntities, updateLoading, updateError} = useSelector(
    state => state.updateEntities,
  );

  const fetchProfileByIdentifier = () => {
    dispatch(fetchProfileByID());
  };

  const updateUser = formData => {
    return dispatch(updateUserByID(formData));
  };

  const uploadImage = formData => {
    return dispatch(uploadProfileImage(formData));
  };

  const updateImage = formData => {
    return dispatch(updateProfileImage(formData));
  };

  const fetchAllExpertises = () => {
    dispatch(fetchAllExpertise());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  const cleanUploadImage = () => {
    dispatch(resetUploadProfileImage());
  };

  const cleanUpdateImage = () => {
    dispatch(resetUpdateProfileImage());
  };

  const cleanExpertise = () => {
    dispatch(resetExpertise());
  };

  return (
    <ManageAccount
      {...props}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      fetchProfileByIdentifier={fetchProfileByIdentifier}
      updateUser={updateUser}
	  userLoading={userLoading}
      cleanProfile={cleanProfile}
      uploadProfileImages={uploadProfileImages}
      uploadProfileImageLoading={uploadProfileImageLoading}
      uploadProfileImageError={uploadProfileImageError}
      uploadImage={uploadImage}
      cleanUploadImage={cleanUploadImage}
      updateEntities={updateEntities}
      updateLoading={updateLoading}
      updateError={updateError}
      updateImage={updateImage}
      cleanUpdateImage={cleanUpdateImage}
      expertise={expertise}
      expertiseLoading={expertiseLoading}
      expertiseError={expertiseError}
      fetchAllExpertises={fetchAllExpertises}
      cleanExpertise={cleanExpertise}
    />
  );
};

export default ManageAccountScreen;
