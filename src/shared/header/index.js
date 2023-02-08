import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import {Typography} from '../../theme';
import {useIsFocused} from '@react-navigation/native';

const HeaderTitle = props => {
  const isFocused = useIsFocused();

  const {profile, profileLoading, title} = props;

  //   useEffect(() => {
  //     fetchProfileByIdentifier();
  //   }, [isFocused]);

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
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            // marginLeft: 10,
            fontFamily: 'SFProText-Medium',
            fontSize: 18,
            color: 'white',
            // width: '90%',
          }}>
          {title === undefined ? profile?.user_login : title}
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
  );
};

export default HeaderTitle;
