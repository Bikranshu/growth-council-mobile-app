import React,{useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {Typography} from '../../../theme';

import TraitsQuestion from './traitsQuestion';

const Traits = props => {
  const {
    navigation,
    route,
    subTraits,
    // subTraitsLoading,
    // subTraitsError,
    fetchAllSubTrait,
    cleanSubTrait,

    count,
    traitIndex,
    answers,
    setAnswers,
    selectedId,
    setSelectedId,

    traitsAnswer,
    traitsAnswerLoading,
    traitsAnswerError,
    fetchTraitsAnswer,
    UpdateTraitsAnswer,

	scrollRef
	
  } = props;

  useEffect(() => {}, [count, answers]);
 
  return (
	<ScrollView style={styles.scrollBox}>
    <View >
      {subTraits?.sub_traits[count]?.questions?.map((question, index) => (
        <TraitsQuestion
          {...props}
          answers={answers}
          setAnswers={setAnswers}
          traitIndex={traitIndex}
          question={question}
          questionIndex={index}
          key={index}
		  
		  scrollRef={scrollRef}
        />
      ))}

      
        <View style={{marginTop: 25}}>
          <HTMLView value={subTraits?.sub_traits[count]?.content} />
        </View>
     
    </View>
	 </ScrollView>
  );
};

const styles = StyleSheet.create({
  questionWrapper: {
    height: 196,
    borderRadius: 22,
    margin: 5,
    marginTop: 25,
    padding: 18,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  paragraph: {
    fontSize: 14,
    fontFamily: Typography.FONT_SF_REGULAR,
    color: '#77838F',
    marginTop: 10,
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

export default Traits;
