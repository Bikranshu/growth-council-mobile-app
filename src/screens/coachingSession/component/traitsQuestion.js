import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Typography} from '../../../theme';
import {ScrollView} from 'native-base';

const TraitsQuestion = props => {
  const {
    question,
    answers,
    count,
    setAnswers,
    questionIndex,
    traitIndex,
    scrollRef,
  } = props;
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
            <View style={styles.rbWrapper}>
              <TouchableOpacity
                style={styles.rbStyle}
                onPress={() => {
                  let newAnswers = answers;
                  if (traitIndex.traitIndex === 0) {
                    scrollRef.current?.scrollToEnd({animated: true});
					
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
                    scrollRef.current?.scrollToEnd({animated: true});

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
                }}>
                {status === option1.score && <View style={styles.selected} />}
              </TouchableOpacity>
              <Text style={{fontSize: 12, marginTop: 10}}>
                {' '}
                {option1?.option}
              </Text>
            </View>
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
    backgroundColor: '#f9fff0',
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
  rbWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    marginRight: 36,
    fontSize: 22,
    color: '#444',
    fontWeight: '700',
  },
  rbStyle: {
    height: 20,
    width: 20,
    borderRadius: 110,
    borderWidth: 2,
    marginTop: 10,
    borderColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    width: 16,
    height: 16,
    borderRadius: 55,
    backgroundColor: '#9FBC6C',
  },
  result: {
    marginTop: 22,
    color: 'white',
    fontWeight: '600',
    backgroundColor: 'blue',
  },
});

export default TraitsQuestion;
