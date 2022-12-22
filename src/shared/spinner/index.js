import React, {useState, useEffect} from 'react';
import {Modal, ActivityIndicator, StyleSheet, View} from 'react-native';

import {Colors} from '../../theme';

const Spinner = () => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal transparent={true} animationType={'none'} visible={animating}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={animating}
            size="large"
            color={Colors.PRIMARY_TEXT_COLOR}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Spinner;
