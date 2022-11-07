import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import People from './components';
import {fetchUsersByKey, resetUser} from '../account/slice/userSlice';
import {
  connectMemberByID,
  resetConnectMember,
} from './slice/memberConnectionSlice';
import {fetchAllExpertise, resetExpertise} from './slice/expertiseSlice';
import {fetchAllRegion, resetRegion} from './slice/reginSlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';
import {
  deleteMemberByID,
  resetConnectdelete,
} from './slice/deleteConnectionSlice';

const PeopleScreen = props => {
  const dispatch = useDispatch();

  const {users, userLoading, userError} = useSelector(state => state.users);
  const {memberConnections, memberConnectionLoading, memberConnectionError} =
    useSelector(state => state.memberConnections);

  const {deleteConnections, deleteConnectionLoading, deleteConnectionError} =
    useSelector(state => state.deleteConnections);
  const {expertise, expertiseLoading, expertiseError} = useSelector(
    state => state.expertise,
  );
  const {region, regionLoading, regionError} = useSelector(
    state => state.region,
  );
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const fetchAllUsers = formData => {
    dispatch(fetchUsersByKey(formData));
  };

  /**
   * Connect member.
   * @param {object} formData
   *
   */
  const connectMemberByIdentifier = formData => {
    return dispatch(connectMemberByID(formData));
  };

  const deleteMemberByIdentifier = formData => {
    return dispatch(deleteMemberByID(formData));
  };

  const fetchAllExpertises = () => {
    dispatch(fetchAllExpertise());
  };

  const fetchAllRegions = () => {
    dispatch(fetchAllRegion());
  };

  const cleanUser = () => {
    dispatch(resetUser());
  };

  /**
   * Clear connect member data.
   *
   */
  const cleanConnectMember = () => {
    dispatch(resetConnectMember());
  };

  const cleanDeleteMember = () => {
    dispatch(resetConnectdelete());
  };
  const cleanExperties = () => {
    dispatch(resetExpertise());
  };
  
  const cleanRegion = () => {
    dispatch(resetRegion());
  };


  useEffect(() => {
    fetchProfileByID();
  }, []);

  const cleanProfile = () => {
    dispatch(resetProfile());
  };
  return (
    <People
      {...props}
      users={users}
      userLoading={userLoading}
      userError={userError}
      fetchAllUsers={fetchAllUsers}
      cleanUser={cleanUser}
      memberConnections={memberConnections}
      memberConnectionLoading={memberConnectionLoading}
      memberConnectionError={memberConnectionError}
      connectMemberByIdentifier={connectMemberByIdentifier}
      cleanConnectMember={cleanConnectMember}
      expertise={expertise}
      expertiseLoading={expertiseLoading}
      expertiseError={expertiseError}
      fetchAllExpertises={fetchAllExpertises}
      cleanExperties={cleanExperties}
	  region={region}
      regionLoading={regionLoading}
      regionError={regionError}
      fetchAllRegions={fetchAllRegions}
      cleanRegion={cleanRegion}
      profile={profile}
      profileLoading={profileLoading}
      profileError={profileError}
      deleteConnections={deleteConnections}
      deleteConnectionLoading={deleteConnectionLoading}
      deleteConnectionError={deleteConnectionError}
      deleteMemberByIdentifier={deleteMemberByIdentifier}
      cleanDeleteMember={cleanDeleteMember}
    />
  );
};

export default PeopleScreen;
