import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';

import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const Journey = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headingText1}>What are you interested in?</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            style={[styles.button, styles.plainButton]}
            onPress={() => navigation.navigate('Dashboard')}>
            <Text style={[styles.buttonText, styles.plainButtonText]}>
              Start your journey
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  meta: {
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 50 : 10,
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f3354',
  },
  paragraph: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 5,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  moreButton: {
    width: '40%',
    borderRadius: 10,
    height: 40,
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
    marginLeft: 5,
  },
  moreButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default Journey;
