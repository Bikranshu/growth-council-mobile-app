import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

import HeaderRight from './HeaderRight';
import {navigationRef, toggleDrawer} from '../../utils/navigationUtil';
import {fetchProfileByID} from '../../screens/account/slice/profileSlice';
import {useNavigation} from '@react-navigation/native';

const SubHeader = props => {
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  const {route,} = props;

  const fetchProfileByIdentifier = () => {
    dispatch(fetchProfileByID());
  };

  const navigation = useNavigation();

  //   const navigationRef = React.createRef();


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
            props?.title === 'Self Assessment' ? (
              <TouchableOpacity onPress={() => navigation.navigate('QR Code')}>
                <IonIcon name="arrow-back-sharp" color={'white'} size={30} />
              </TouchableOpacity>
            ) : props?.params !== undefined && props?.id === undefined ? (
              <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                <IonIcon name="arrow-back-sharp" color={'white'} size={30} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (props?.id == undefined && props.params === undefined) {
                    navigation.goBack();
                  } else if (props.subtitle == 'Growth Community') {
                    navigation.navigate(props.subtitle, {
                      pillarId: props.id,
                      title: 'Growth Community',
                      image: require('../../assets/img/Rectangle2.png'),
                    });
                  } else if (props.id == 'Growth Content') {
                    navigation.navigate('Dashboard');
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
            )
          ) : (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <IonIcon name="menu-outline" color={'white'} size={30} />
            </TouchableOpacity>
          )}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'SFProText-Medium',
                fontSize: 18,
                color: 'white',
                // width: '90%',
              }}>
              {props.title}
            </Text>
            {props.title === 'Growth Pipeline Dialog' && (
              <Text
                style={{
                  fontSize: 8,
                  lineHeight: 18,
                  textAlignVertical: 'top',
                  fontWeight: 'bold',
                  color: 'white',
                  //   backgroundColor: 'red',
                }}>
                TM
              </Text>
            )}
          </View>
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
