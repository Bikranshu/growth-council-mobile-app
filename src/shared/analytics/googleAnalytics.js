import {Text, View} from 'react-native';
import React from 'react';

export function googleAnalytics(user_id) {
  {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-BJ7ZHW9DQT', {user_id: user_id}, 'GrowthCouncilApp');
}
