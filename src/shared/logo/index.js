import React from 'react';
import {Image, Text, View} from 'react-native';

import {Typography} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LogoTitle = props => {
  const color = props?.color ? props.color : 'black';
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props?.left && props?.title && (
          <Text
            style={{
              color: color,
              fontFamily: Typography.FONT_BOLD,
              fontSize: Typography.FONT_SIZE_EXTRA_LARGE_PLUS,
            }}>
            {' '}
            {props?.title}{' '}
          </Text>
        )}

        <Image
          style={{width: 25, height: 25}}
          source={require('../../assets/img/dashboard_logo.png')}
        />

        <Ionicons
          name={'search-outline'}
          size={80}
          color={'white'}
          onPress={() => props.navigation.navigate('Search')}
        />

        <Image
          style={{width: 25, height: 25}}
          source={require('../../assets/img/dash_member_image.png')}
        />

        {props?.right && props?.title && (
          <Text
            style={{
              color: color,
              fontFamily: Typography.FONT_BOLD,
              fontSize: Typography.FONT_SIZE_EXTRA_LARGE_PLUS,
            }}>
            {' '}
            {props?.title}{' '}
          </Text>
        )}
      </View>
    </>
  );
};

export default LogoTitle;
