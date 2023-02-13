import React from 'react';
import {Toast} from 'native-base';

const ToastMessage = {
  show: (message, duration = 4000) => {
    Toast.show({
      title: message,
      duration,
      placement: 'bottom',
      textStyle: {textAlign: 'center'},
    });
  },
};

export default ToastMessage;
