import React from 'react';
import Radar from './components/Radar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRadarMemberDetails, resetRadarMemberDetails} from './slice/radarSlice';
import {fetchProfileByID, resetProfile} from '../account/slice/profileSlice';

const RadarScreen = props => {

  const {radarMemberDetails, radarMemberDetailsLoading, radarMemberDetailsError} = useSelector(
    state => state.radarMemberDetails,
  );
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const dispatch = useDispatch();

  const fetchRadarMemberDetail = () => {
    dispatch(fetchRadarMemberDetails());
  };

  const cleanPOEDetail = () => {
    dispatch(resetRadarMemberDetails());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileByID());
  };

  const cleanProfile = () => {
    dispatch(resetProfile());
  };

  return (
    <Radar
      {...props}   
      radarMemberDetails={radarMemberDetails}
      radarMemberDetailsLoading={radarMemberDetailsLoading}
      radarMemberDetailsError={radarMemberDetailsError}
      fetchRadarMemberDetail={fetchRadarMemberDetail}
      cleanPOEDetail={cleanPOEDetail}  

	  profile={profile}
	  profileLoading={profileLoading}
	  profileError={profileError}
	  fetchProfile={fetchProfile}
	  cleanProfile={cleanProfile}
    />
  );
};

export default RadarScreen;
