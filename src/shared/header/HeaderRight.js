import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderRight = props => {
  const {navigation, profile} = props;
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        style={{marginRight: 8}}
        onPress={() => navigation.navigate('NotificationList')}>
        <Ionicons name="notifications" color="white" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginRight: 8}}
        onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search-outline" color={'white'} size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{height: 40, width: 40, borderRadius: 20}}
        onPress={() => navigation.navigate('Account')}>
        <View>
          <Image
            source={{
              uri: profile?.profile_image,
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
