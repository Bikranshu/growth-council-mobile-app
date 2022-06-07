import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';

import {Typography} from '../../../theme';
import {
  COACHING_COLOR,
  COMMUNITY_COLOR,
  PRACTICE_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  QUATERNARY_TEXT_COLOR,
} from '../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const PillarList = props => {
  const {navigation, pillarSliders} = props;

  return pillarSliders?.length > 0 ? (
    pillarSliders?.map((item, index) => {
      let navigationPath = '';
      let borderColor = PRIMARY_BACKGROUND_COLOR;
      switch (item?.slug) {
        case 'community':
          navigationPath = 'Growth Community';
          borderColor = COMMUNITY_COLOR;
          break;
        case 'best-practices':
          navigationPath = 'Growth Content';
          borderColor = PRACTICE_COLOR;
          break;
        case 'growth-coaching':
          navigationPath = 'Growth Coaching';
          borderColor = COACHING_COLOR;
      }

      return (
        <View
          style={[styles.ImageWrapper, {borderColor: borderColor}]}
          key={index}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationPath, {pillarId: item?.term_id})
            }>
            <ImageBackground
              source={{uri: item?.image}}
              style={styles.ImageStyle}>
              <LinearGradient
                colors={['#00000000', '#000000']}
                style={{height: '100%', width: '100%'}}
              />
            </ImageBackground>
            <Text style={styles.sliderText}>{item?.name}</Text>
          </TouchableOpacity>
        </View>
      );
    })
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  ImageWrapper: {
    width: (Dimensions.get('window').width - 30) / 3,
    height: Platform.OS === 'ios' ? 150 : 172,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: PRIMARY_BACKGROUND_COLOR,
    overflow: 'hidden',
  },
  ImageStyle: {
    width: '100%',
    height: '100%',
  },
  sliderText: {
    position: 'absolute',
    top: '80%',
    left: 4,
    color: 'white',
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontSize: Platform.OS === 'ios' ? 10 : 12,
  },
});
export default PillarList;
