import React, {useEffect} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import HeaderTitle from '.';
import HeaderRight from './HeaderRight';
import {fetchProfileByID} from '../../screens/account/slice/profileSlice';

const MainHeader = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const isFocused = useIsFocused();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  useEffect(() => {
    dispatch(fetchProfileByID());
  }, []);

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: Platform.OS === 'ios' ? 40 : 20,
          paddingHorizontal: 15,
          backgroundColor: 'rgba(0,0,0,0)',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)',
          }}>
          {props.title === undefined ? (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <IonIcon name="menu-outline" color={'white'} size={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcon name="arrow-back-sharp" size={30} color="white" />
            </TouchableOpacity>
          )}
          <HeaderTitle
            {...props}
            title={props.title}
            profile={profile}
            profileLoading={profileLoading}
            // fetchProfileByIdentifier={fetchProfileByIdentifier}
          />
        </View>

        <HeaderRight
          {...props}
          navigation={navigation}
          profile={profile}
          //   fetchProfileByIdentifier={fetchProfileByIdentifier}
        />
      </View>
    </View>
  );
};

export default MainHeader;
