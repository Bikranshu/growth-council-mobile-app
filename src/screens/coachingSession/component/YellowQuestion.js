import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Typography} from '../../../theme';
import {RadioButton} from 'react-native-paper';

const YellowQuestion = props => {
  const {question, answers, setAnswers, questionIndex, count, traitIndex} =
    props;

  const [status, setStatus] = useState([]);

  useEffect(() => {
    if (
      answers.yellowQuestions.length &&
      answers.yellowQuestions[traitIndex.traitIndex] !== undefined &&
      answers.yellowQuestions[traitIndex.traitIndex][count]
    ) {
      answers.yellowQuestions[traitIndex.traitIndex][count] !== undefined
        ? setStatus(answers.yellowQuestions[traitIndex.traitIndex][count])
        : setStatus([]);
    } else {
      setStatus([]);
    }
  }, [count, answers]);

  return (
    <View style={[styles.questionWrapper, styles.shadowProp]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 0.1,
        }}>
        <Text style={styles.title}>{question?.post_title}</Text>
      </View>
      {[
        {name: 'Yes', value: true},
        {name: 'No', value: false},
      ].map(option => (
        <View style={styles.wrapper} key={option.name}>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              value={option?.value}
              status={
                status[questionIndex] === option.value ? 'checked' : 'unchecked'
              }
              onPress={() => {
                let newAnswers = answers;
                let newYellowAnswers = answers.yellowQuestions;
                let newTraitAnswers = newYellowAnswers[traitIndex.traitIndex]
                  ? newYellowAnswers[traitIndex.traitIndex]
                  : [];
                let newSubtraitAnswers = newTraitAnswers[count]
                  ? newTraitAnswers[count]
                  : [];
                newSubtraitAnswers[questionIndex] = option.value;
                newTraitAnswers[count] = newSubtraitAnswers;
                newYellowAnswers[traitIndex.traitIndex] = newTraitAnswers;
                setAnswers({
                  ...newAnswers,
                  yellowQuestions: newYellowAnswers,
                });
              }}
            />
            <Text style={{marginTop: 5}} key={option.name}>
              {option.name}
            </Text>
          </View>
        </View>
      ))}

      <View></View>
    </View>
  );
};
const styles = StyleSheet.create({
  questionWrapper: {
    height: 154,
    borderRadius: 22,
    margin: 5,
    marginTop: 25,
    padding: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  title: {
    fontSize: 14,
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    color: '#1E2022',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
  },
});

export default YellowQuestion;
