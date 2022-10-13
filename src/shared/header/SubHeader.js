import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {fetchProfileByID} from '../../screens/account/slice/profileSlice';
import {navigationRef, toggleDrawer} from '../../utils/navigationUtil';
import HeaderRight from './HeaderRight';

const SubHeader = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const {navigation, route} = props;

  const fetchProfileByIdentifier = () => {
    dispatch(fetchProfileByID());
  };

  return (
    <ImageBackground source={props.image} style={{width: '100%'}}>
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
          {props?.noDrawer || props?.name ? (
            <TouchableOpacity
              onPress={() => {
                if (props?.id == undefined) {
                  navigation.goBack();
                } else if (props.subtitle == 'Growth Community') {
                  navigation.navigate(props.subtitle, {
                    pillarId: props.id,
                    title: 'Growth Community',
                    image: require('../../assets/img/Rectangle2.png'),
                  });
                } else {
                  navigation.navigate(props.subtitle, {
                    poeId: props.id,
                    title: 'Growth Community',
                    image: require('../../assets/img/Rectangle2.png'),
                  });
                }
              }}>
              <IonIcon name="arrow-back-sharp" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <IonIcon name="menu-outline" color={'white'} size={30} />
            </TouchableOpacity>
          )}

          <Text
            style={{
              marginLeft: 10,
              fontFamily: 'SFProText-Medium',
              fontSize: 18,
              color: 'white',
              width: '90%',
            }}>
            {props.title}
          </Text>
        </View>

        <HeaderRight
          {...props}
          navigation={props.navigation}
          profile={profile}
          fetchProfileByIdentifier={fetchProfileByIdentifier}
        />
      </View>
    </ImageBackground>
  );
};

export default SubHeader;
