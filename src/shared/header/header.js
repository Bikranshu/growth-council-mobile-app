import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {fetchProfileByID} from '../../screens/account/slice/profileSlice';
import {navigationRef, toggleDrawer} from '../../utils/navigationUtil';
import HeaderRight from './HeaderRight';
import HeaderTitle from './index';

const Header = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const {navigation} = props;

  const fetchProfileByIdentifier = () => {
    dispatch(fetchProfileByID());
  };

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
          paddingBottom: 10,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {props?.noDrawer ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcon name="arrow-back-sharp" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <IonIcon name="menu-outline" color={'white'} size={30} />
            </TouchableOpacity>
          )}

          {/* <Text
            style={{
              marginLeft: 10,
              fontFamily: 'SFProText-Medium',
              fontSize: 18,
              color: 'white',
              width: '80%',
            }}>
            {props.title}
          </Text> */}
          <HeaderTitle
            {...props}
            title={props.title}
            profile={profile}
            profileLoading={profileLoading}
            fetchProfileByIdentifier={fetchProfileByIdentifier}
          />
        </View>

        <HeaderRight
          {...props}
          navigation={props.navigation}
          profile={profile}
          fetchProfileByIdentifier={fetchProfileByIdentifier}
        />
      </View>
    </View>
  );
};

export default Header;
