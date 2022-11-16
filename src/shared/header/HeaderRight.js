import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

const HeaderRight = props => {
  const {navigation, profile, fetchProfileByIdentifier} = props;

  useEffect(() => {
    fetchProfileByIdentifier();
  }, []);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        style={{marginRight: 8}}
        onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search-outline" color={'white'} size={25} />
      </TouchableOpacity>

      {profile?.um_member_directory_data?.profile_photo === true ? (
        <TouchableOpacity
          style={{height: 40, width: 40, borderRadius: 20}}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={{
              uri:
                profile?.um_profile_image +
                profile?.user_meta?.profile_photo[0],
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{height: 40, width: 40, borderRadius: 20}}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={{
              uri: 'https://staging.gilcouncil.com/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg',
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderRight;
