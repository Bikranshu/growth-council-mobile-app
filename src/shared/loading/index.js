import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import {Colors} from '../../theme';
import {BubblesLoader} from 'react-native-indicator';

const Loading = props => {
  return (
    <View style={styles.loading1}>
      <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loading1: {
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});
