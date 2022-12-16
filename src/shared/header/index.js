import React, {useEffect} from 'react';

import {Text, View} from 'react-native';

import {Typography} from '../../theme';
import {useIsFocused} from '@react-navigation/native';

const HeaderTitle = props => {
  const isFocused = useIsFocused();

  const {profile, fetchProfileByIdentifier, profileLoading, title} = props;

  useEffect(() => {
    fetchProfileByIdentifier();
  }, [isFocused]);

  return (
    <View style={{marginLeft: 10, width: '80%'}}>
      {title === undefined ? (
        <Text
          style={{
            color: 'white',
            fontSize: Platform.OS === 'ios' ? 10 : 12,
            fontFamily: Typography.FONT_SF_MEDIUM,
          }}>
          Hello,
        </Text>
      ) : (
        <></>
      )}
      <Text
        style={{
          fontFamily: Typography.FONT_SF_MEDIUM,
          color: 'white',
          fontSize: Platform.OS === 'ios' ? 16 : 18,
        }}>
        {title === undefined ? profile?.user_login : title}
      </Text>
    </View>
  );
};

export default HeaderTitle;
