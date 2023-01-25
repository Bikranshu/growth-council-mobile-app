import {View, Text} from 'react-native';
import React from 'react';
import analytics from '@react-native-firebase/analytics';

export const pageDuration = (pageName, page_duration) => {
  let startTime = new Date().getTime();

  // Call this method when the user navigates away from the page
  let endTime = new Date().getTime();
  let duration = endTime - startTime;

  useEffect(() => {
    const GoogleA = async () => {
      await analytics().logEvent(page_duration, {
        page_name: pageName, // name of the page
        duration: duration, // duration in milliseconds
      });
    };
    GoogleA();
  }, []);
};
