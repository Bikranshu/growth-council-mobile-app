import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getAsyncStorage} from '../../utils/storageUtil';
import {USER_NAME} from '../../constants';
import {Typography} from '../../theme';
import {useIsFocused} from '@react-navigation/native';

const HeaderTitle = props => {
  const [username, setUsername] = useState(null);
  const isFocused = useIsFocused();

  const {profile, fetchProfileByIdentifier, profileLoading, title} = props;

  useEffect(() => {
    fetchProfileByIdentifier();
  }, [isFocused]);

  return (
    <View style={{marginLeft: 10, width: '80%'}}>
     
        <Text
          style={{
            color: 'white',
            fontSize: Platform.OS === 'ios' ? 14 : 16,
            fontFamily: Typography.FONT_SF_MEDIUM,
          }}>
          Hello, {title === undefined ? profile?.user_login : title}
        </Text>
      
    </View>
  );
};

export default HeaderTitle;
