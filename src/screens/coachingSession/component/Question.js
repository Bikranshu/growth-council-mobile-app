import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {Typography} from '../../../theme';
import YellowQuestion from './YellowQuestion';

const Question = props => {
  const {
    navigation,
    route,
    value,
    onChange,

    subTraits,
    traitIndex,
    // subTraitsLoading,
    // subTraitsError,
    fetchAllSubTrait,
    cleanSubTrait,
    count,
    answers,
    setAnswers,
    traitsAnswer,
    traitsAnswerLoading,
    traitsAnswerError,
    fetchTraitsAnswer,
    updateTraitsAnswer,
    cleanTraitsAnswer,
  } = props;

  useEffect(() => {
    const fetchAllSubTraitsAsync = async identifier => {
      await fetchAllSubTrait(identifier);
    };
    fetchAllSubTraitsAsync();
  }, []);

  const [radioState, setRadioState] = useState(value);
  if (subTraits?.length === 0 || subTraits === undefined) {
    return <></>;
  }

  useEffect(() => {}, [count, answers]);

  console.log({subTraits});

  return (
    <View>
      {subTraits?.sub_traits[count]?.yellow_benchmark_questions !== '' &&
        subTraits?.sub_traits[count]?.yellow_benchmark_questions !==
          undefined &&
        subTraits?.sub_traits[count]?.yellow_benchmark_questions !== false && (
          <View>
            {subTraits?.sub_traits[count]?.yellow_benchmark_questions?.map(
              (question, key) => (
                <YellowQuestion
                  {...props}
                  traitIndex={traitIndex}
                  answers={answers}
                  setAnswers={setAnswers}
                  question={question}
                  questionIndex={key}
                  count={count}
                  key={key}
                />
              ),
            )}{' '}
          </View>
        )}
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
    marginTop: 15,
    marginLeft: 20,
  },
});

export default Question;
