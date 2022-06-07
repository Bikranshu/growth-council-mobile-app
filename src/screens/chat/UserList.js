import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import UserList from './components/UserList';
import firestore from '@react-native-firebase/firestore'
import {fetchAllConnections, resetConnection} from './slice/connetionSlice';
import {fetchUsersByKey, resetUser} from '../account/slice/userSlice';
import {
  connectMemberByID,
  resetConnectMember,
} from '../people/slice/memberConnectionSlice';

const UserListScreen = props => {
  const dispatch = useDispatch();

  const {users, userLoading, userError} = useSelector(state => state.users);


  const {connection, connectionLoading, connectionError} = useSelector(
    state => state.connection,
  );
  const {memberConnections, memberConnectionLoading, memberConnectionError} =
    useSelector(state => state.memberConnections);

  const fetchAllConnection = () => {
    dispatch(fetchAllConnections());
  };

  const cleanConnection = () => {
    dispatch(resetConnection());
  };

  const fetchAllUsers = formData => {
    dispatch(fetchUsersByKey(formData));
  };

  const cleanUser = () => {
    dispatch(resetUser());
  };

  const connectMemberByIdentifier = formData => {
    return dispatch(connectMemberByID(formData));
  };
  const cleanConnectMember = () => {
    dispatch(resetConnectMember());
  };

  return  (
    <UserList
      {...props}
      connection={connection}
      connectionLoading={connectionLoading}
      connectionError={connectionError}
      fetchAllConnection={fetchAllConnection}
      cleanConnection={cleanConnection}
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
    />
  );
};

export default UserListScreen;
