import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';

import {Typography} from '../../../theme';
import {ScrollView} from 'native-base';

const TraitsQuestion = props => {
  const {question, answers, count, setAnswers, questionIndex, traitIndex} =
    props;
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (traitIndex.traitIndex === 0) {
      setStatus(answers?.questions?.growthIndex[count]);
    } else {
      setStatus(answers?.questions?.innovativeIndex[count]);
    }
  }, [count, answers]);


  return (
    <View style={[styles.questionWrapper, styles.shadowProp]}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{question?.question}</Text>
      </View>
      {question?.options?.map((option1, index) => (
        <View style={styles.wrapper} key={index}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <RadioButton
              value={option1?.score}
              status={status === option1.score ? 'checked' : 'unchecked'}
              onPress={() => {
                let newAnswers = answers;
                if (traitIndex.traitIndex === 0) {
                  let newGrowthIndex = answers.questions.growthIndex;
                  newGrowthIndex[count] = option1.score;
                  setAnswers({
                    ...newAnswers,
                    questions: {
                      ...newAnswers.questions,
                      growthIndex: newGrowthIndex,
                    },
                  });
                } else {
                  let newInnovativeIndex = answers.questions.innovativeIndex;
                  newInnovativeIndex[count] = option1.score;
                  setAnswers({
                    ...newAnswers,
                    questions: {
                      ...newAnswers.questions,
                      innovativeIndex: newInnovativeIndex,
                    },
                  });
                }
              }}
            />
            <Text style={{fontSize: 11, marginTop: 10}}>
              {' '}
              {option1?.option}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  questionWrapper: {
    borderRadius: 22,
    margin: 5,
    marginTop: 25,
    padding: 18,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  title: {
    fontSize: 13,
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
  scrollBox: {
    overflowY: 'scroll',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default TraitsQuestion;
