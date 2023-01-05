import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {Colors} from '../../theme';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ArticleFeedbackCard = props => {
  const {isTrue, handleValue} = props;
  return (
    <View style={styles.feedbackContainer}>
      <Text style={styles.feedbackTitle}>Was this article helpful?</Text>
      <View style={styles.feedbackContainerDivider} />
      <View style={styles.feedbackButtonsContainer}>
        <View style={styles.singleButtonContainer}>
          <Pressable
            style={styles.checkButton}
            onPress={() => handleValue(true)}>
            {isTrue && <FeatherIcon name="check" color="#62C1EB" />}
          </Pressable>
          <Text style={styles.checkButtonText}>Yes</Text>
        </View>
        <View style={styles.singleButtonContainer}>
          <Pressable
            style={styles.checkButton}
            onPress={() => handleValue(false)}>
            {!isTrue && <FeatherIcon name="check" color="#62C1EB" />}
          </Pressable>
          <Text style={styles.checkButtonText}>No</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackContainer: {
    height: 110,
    marginBottom: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#62C1EB',
  },
  feedbackTitle: {
    marginLeft: 15,
    fontFamily: 'SFProText-SemiBold',
    color: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  feedbackContainerDivider: {
    width: '100%',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#DBD7D7',
  },
  feedbackButtonsContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkButton: {
    width: 20,
    height: 20,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  checkButtonText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    color: Colors.PRIMARY_BACKGROUND_COLOR,
  },
});

export default ArticleFeedbackCard;
