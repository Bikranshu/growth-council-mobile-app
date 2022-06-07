import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import {Button} from 'native-base';
import ButtonToggleGroup from 'react-native-button-toggle-group';

import {Colors} from '../../../theme';
import Trait from './Traits';
import Question from './Question';
import {fetchAllSubTraits, resetSubTraits} from '../slice/subTraitsSlice';
import {submitSessionScores} from '../slice/sessionScoreSlice';
import {
  fetchTraitsAnswerByUserId,
  updateTraitsAnswerByUserId,
  resetTraitsAnswer,
} from '../slice/traitAnswerbyUserId';
import {BubblesLoader} from 'react-native-indicator';
import ToastMessage from '../../../shared/toast';
import {store} from '../../../utils/httpUtil';
import SessionCompleted from './sessionCompleted';

const win = Dimensions.get('window');
const SelfAssessment = props => {
  const {
    navigation,
    route,
    score,
    traits,
    traitsLoading,
    traitsError,
    fetchAllTraitBySession,
    cleanTraits,

    answers,
    setAnswers,
    selectedId,
    setSelectedId,
    sessions,

    scrollRef,
  } = props;

  const dispatch = useDispatch();

  const {traitsAnswer, traitsAnswerLoading, traitsAnswerError} = useSelector(
    state => state.traitsAnswer,
  );

  const [value, setValue] = useState();
  const [sub, setSub] = useState('');

  const [index, setIndex] = useState({
    traitIndex: 0,
    subTraitIndex: 0,
  });
  const [traitLength, setTraitLength] = useState(0);
  const [subTraitLength, setSubTraitLength] = useState(0);

  const [subTraits, setSubTraits] = useState(traits[index.traitIndex]);

  useEffect(() => {
    setSubTraits(traits[index.traitIndex]);
  }, [traits]);

  const fetchAllSubTrait = identifier => {
    dispatch(fetchAllSubTraits(identifier));
  };

  const fetchTraitsAnswer = identifier => {
    dispatch(fetchTraitsAnswerByUserId(identifier));
  };

  const updateTraitsAnswer = identifier => {
    dispatch(updateTraitsAnswerByUserId(identifier));
  };

  const cleanSubTrait = () => {
    dispatch(resetSubTraits());
  };

  const cleanTraitsAnswer = () => {
    dispatch(resetTraitsAnswer());
  };

  useEffect(() => {
    if (traits?.length) {
      setSub(traits[index.traitIndex].sub_traits[index.subTraitIndex].title);
      setValue(traits[index.traitIndex].sub_traits[index.subTraitIndex].title);
      setTraitLength(traits.length);
    }
    if (subTraits?.sub_traits?.length) {
      setSubTraitLength(traits[index.traitIndex]?.sub_traits?.length);
    }
  }, [traits, index]);

  useEffect(() => {}, [traitLength, subTraitLength]);

  const handleNextButtonClick = async () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });

    if (
      index.traitIndex === traitLength - 1 &&
      index.subTraitIndex === subTraitLength - 1
    ) {
      store(`jwt-auth/v1/sessions/${route?.params?.id}/score`, {
        score,
        completedStatus: true,
      })
        .then(response => {
          if (response?.data?.code === 200) {
            ToastMessage.show('You score has been submitted.');
            setAnswers({
              questions: {
                growthIndex: [],
                innovativeIndex: [],
              },
              yellowQuestions: [],
            });
            navigation.goBack();

            if (sessions.title === 'Session 10') {
              //   ToastMessage.show('You score has submitted.');
              navigation.navigate('SessionCompleted');
            }
          } else {
            toast.closeAll();
            ToastMessage.show(response?.payload?.response);
          }
        })
        .catch(error => {
          toast.closeAll();
          ToastMessage.show('Something is wrong, please contact admin.');
        });
    } else if (index.subTraitIndex === subTraitLength - 1) {
      setIndex({...index, subTraitIndex: 0, traitIndex: index.traitIndex + 1});
      onFabPress();
      store(`jwt-auth/v1/sessions/${route?.params?.id}/score`, {
        score,
        completedStatus: false,
      })
        .then(response => {
          toast.closeAll();
          ToastMessage.show(response?.payload?.response);
        })
        .catch(error => {
          toast.closeAll();
          ToastMessage.show('Something is wrong, please contact admin.');
        });
    } else {
      setIndex({...index, subTraitIndex: index.subTraitIndex + 1});
      store(`jwt-auth/v1/sessions/${route?.params?.id}/score`, {
        score,
        completedStatus: false,
      })
        .then(response => {
          toast.closeAll();
          ToastMessage.show(response?.payload?.response);
        })
        .catch(error => {
          toast.closeAll();
          ToastMessage.show('Something is wrong, please contact admin.');
        });
    }
  };
  const handlePreviousButtonClick = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    if (index.subTraitIndex === 0 && index.traitIndex > 0) {
      setIndex({
        ...index,
        traitIndex: index.traitIndex - 1,
        subTraitIndex: traits[index.traitIndex - 1]?.sub_traits?.length - 1,
      });
    } else if (index.subTraitIndex > 0) {
      setIndex({...index, subTraitIndex: index.subTraitIndex - 1});
    }
  };

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <View style={{flex: 1, backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
        {traits?.length > 0 ? (
          <View style={{flex: 1}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                marginBottom: 20,
                color: '#0B0B45',
              }}>
              Traits : {traits[index.traitIndex].title}
            </Text>
            <View style={styles.Wrapper}>
              <ButtonToggleGroup
                highlightBackgroundColor={'white'}
                highlightTextColor={'#0B0B45'}
                inactiveBackgroundColor={'transparent'}
                inactiveTextColor={'grey'}
                values={[sub, 'Yellow Benchmark Questions']}
                value={value}
                onSelect={val => setValue(val)}
                style={{
                  flex: 0,
                  height: 30,
                  marginTop: 5,
                  width: '98%',
                  marginLeft: 4,
                  borderRadius: 15,
                }}
                textStyle={{
                  paddingHorizontal: 0,
                  paddingLeft: 5,
                  fontSize: 10,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              />
            </View>

            <View>
              {value === sub && (
                <Trait
                  {...props}
                  subTraits={traits[index.traitIndex]}
                  // subTraitsLoading={subTraitsLoading}
                  // subTraitsError={subTraitsError}
                  fetchAllSubTrait={fetchAllSubTrait}
                  cleanSubTrait={cleanSubTrait}
                  count={index.subTraitIndex}
                  traitIndex={index}
                  answers={answers}
                  setAnswers={setAnswers}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  traitsAnswer={traitsAnswer}
                  traitsAnswerLoading={traitsAnswerLoading}
                  traitsAnswerError={traitsAnswerError}
                  fetchTraitsAnswer={fetchTraitsAnswer}
                  updateTraitsAnswer={updateTraitsAnswer}
                  cleanTraitsAnswer={cleanTraitsAnswer}
                  scrollRef={scrollRef}
                />
              )}
              {value === 'Yellow Benchmark Questions' && (
                <Question
                  {...props}
                  subTraits={traits[index.traitIndex]}
                  traitIndex={index}
                  // subTraitsLoading={subTraitsLoading}
                  // fetchAllSubTrait={fetchAllSubTrait}

                  count={index.subTraitIndex}
                  answers={answers}
                  setAnswers={setAnswers}
                  traitsAnswer={traitsAnswer}
                  traitsAnswerLoading={traitsAnswerLoading}
                  traitsAnswerError={traitsAnswerError}
                  fetchTraitsAnswer={fetchTraitsAnswer}
                  updateTraitsAnswer={updateTraitsAnswer}
                  cleanTraitsAnswer={cleanTraitsAnswer}
                />
              )}
            </View>
          </View>
        ) : (
          <View style={styles.bubblesLoader}>
            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
          </View>
        )}
        <View
          style={{
            height: 90,
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 15,
            borderTopWidth: 0.4,
            marginTop: 20,
          }}>
          <Button
            style={styles.buttonWrapper}
            onPress={handlePreviousButtonClick}
            disabled={index.traitIndex === 0 && index.subTraitIndex === 0}>
            <Text style={{color: '#FFFFFF', marginTop: 2, fontSize: 14}}>
              Previous
            </Text>
          </Button>
          <Button style={styles.buttonWrapper} onPress={handleNextButtonClick}>
            <Text style={{color: '#FFFFFF', marginTop: 2, fontSize: 14}}>
              {index.traitIndex === traitLength - 1 &&
              index.subTraitIndex === subTraitLength - 1
                ? 'Complete'
                : 'Next'}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    height: 40,
    backgroundColor: '#ECECEC',
    borderRadius: 15,
  },
  buttonWrapper: {
    width: 147,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#9FBC6C',
    borderRadius: 10,
    fontSize: 14,
    alignContent: 'center',
  },
  scrollBox: {
    height: '65%',
    width: '100%',
  },
  bubblesLoader: {
    top: '50%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default SelfAssessment;
