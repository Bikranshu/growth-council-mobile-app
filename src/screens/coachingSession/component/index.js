import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';

import SelfAssessment from './selfAssessment';
import SessionAbout from './sessionAbout';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {BubblesLoader} from 'react-native-indicator';
import moment from 'moment';
import ToastMessage from '../../../shared/toast';

const CoachingSession = props => {
  const {
    navigation,
    route,
    traits,
    traitsLoading,
    traitsError,
    fetchAllTraits,
    fetchAllTraitBySession,
    cleanTraits,
    sessions,
    sessionLoading,
    sessionError,
    fetchSessionByIdentifier,
    cleanSession,
    sessionRegisters,
    sessionRegisterLoading,
    sessionRegisterError,
    registerSessionByIdentifier,
    cleanSessionRegister,
  } = props;

  const scrollRef = useRef();
  const [value, setValue] = useState('About');

  const [modalVisible, setModalVisible] = useState(false);
  const [answers, setAnswers] = useState({
    questions: {
      growthIndex: [],
      innovativeIndex: [],
    },
    yellowQuestions: [],
  });
  const [score, setScore] = useState({
    growthIndexScore: 0,
    innovativeIndexScore: 0,
  });

  const [display, setDisplay] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const checkMark = (traitIndex, subTraitIndex) => {
    if (traitIndex === 0) {
      return answers.questions.growthIndex[subTraitIndex];
    } else {
      return answers.questions.innovativeIndex[subTraitIndex];
    }
  };

  useEffect(() => {
    let traitsLength = traits.length;
    let subtraitsLength = [];
    let growthIndexScore = 0;
    let innovativeIndexScore = 0;
    traits?.map((trait, index) => {
      subtraitsLength[index] = trait?.sub_traits.length;
    });
    answers?.questions?.growthIndex?.map(value => {
      if (value) {
        growthIndexScore += parseInt(value);
      }
    });
    answers?.questions?.innovativeIndex?.map(value => {
      if (value) {
        innovativeIndexScore += parseInt(value);
      }
    });
    setScore({
      growthIndexScore: growthIndexScore / subtraitsLength[0],
      innovativeIndexScore: innovativeIndexScore / subtraitsLength[1],
    });
  }, [answers]);

  // score
  let num = 0.0;
  if (sessions?.session_score) {
    num = sessions.session_score.toFixed(2);
  } else {
    num = ((score.growthIndexScore + score.innovativeIndexScore) / 2).toFixed(
      2,
    );
    if (isNaN(num)) num = 0.0;
  }

  return traitsLoading && sessionLoading ? (
    <View style={styles.bubblesLoader}>
      <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
    </View>
  ) : (
    <ScrollView style={styles.scrollBox} ref={scrollRef}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
        />
        <View>
          <View style={[styles.content, {height: 'auto'}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.buttonWrapper}>
                <ButtonToggleGroup
                  highlightBackgroundColor={'white'}
                  highlightTextColor={'#0B0B45'}
                  inactiveBackgroundColor={'transparent'}
                  inactiveTextColor={'grey'}
                  values={['About', 'Self-Assessment']}
                  value={value}
                  onSelect={val => {
                    if (moment(sessions?.event_end).isBefore()) {
                      if (sessions?.completed_status) {
                        ToastMessage.show('You have completed this assessment');
                      } else {
                        return setValue(val);
                      }
                    } else {
                      ToastMessage.show('Session has not ended');
                    }
                  }}
                  style={{
                    marginHorizontal: 10,
                    height: 30,
                    fontSize: 12,
                    borderRadius: 15,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => setModalVisible(!modalVisible)}
                onPressIn={() => {
                  setDisplay(!display);
                }}>
                <Ionicons
                  name={modalVisible ? 'close' : 'menu'}
                  size={35}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 32}}>
              {value === 'About' && (
                <SessionAbout
                  {...props}
                  traits={traits}
                  score={score}
                  traitsLoading={traitsLoading}
                  traitsError={traitsError}
                  fetchAllTraitBySession={fetchAllTraitBySession}
                  cleanTraits={cleanTraits}
                  sessions={sessions}
                  sessionLoading={sessionLoading}
                  sessionError={sessionError}
                  fetchSessionByIdentifier={fetchSessionByIdentifier}
                  cleanSession={cleanSession}
                  sessionRegisters={sessionRegisters}
                  sessionRegisterLoading={sessionRegisterLoading}
                  sessionRegisterError={sessionRegisterError}
                  registerSessionByIdentifier={registerSessionByIdentifier}
                  cleanSessionRegister={cleanSessionRegister}
                />
              )}
              {value === 'Self-Assessment' && (
                <SelfAssessment
                  {...props}
                  score={score}
                  traits={traits}
                  traitsLoading={traitsLoading}
                  traitsError={traitsError}
                  fetchAllTraitBySession={fetchAllTraitBySession}
                  cleanTraits={cleanTraits}
                  answers={answers}
                  setAnswers={setAnswers}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  scrollRef={scrollRef}
                />
              )}
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.modalView}>
              {traits?.map((trait, index1) => (
                <View key={index1}>
                  <View style={styles.wrapper}>
                    <View style={styles.traitWrapper}>
                      <View style={[styles.traitW, styles.shadowProp]}>
                        <Image
                          source={{uri: trait?.image}}
                          style={{width: 20, height: 20}}
                        />
                      </View>

                      <Text
                        style={{
                          paddingLeft: 10,
                          fontSize: 12,
                          width: '53%',
                        }}>
                        {trait?.title}
                      </Text>
                    </View>
                    {index1 === 0 && (
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{marginTop: 15, fontSize: 12}}>Score</Text>
                        <View
                          style={{
                            width: 40,
                            height: 30,
                            marginLeft: 5,
                            backgroundColor: 'orange',
                            borderRadius: 50,
                            padding: 5,
                            marginTop: 10,
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 12}}>{num}</Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={{marginTop: 10, marginLeft: 50}}>
                    {trait?.sub_traits?.map((subTrait, index2) => (
                      <View
                        style={[styles.textStyle, styles.shadowProp]}
                        key={index2}>
                        <Text style={{fontSize: 12}}>{subTrait?.title}</Text>
                        {(checkMark(index1, index2) ||
                          sessions?.completed_status) && (
                          <Ionicons
                            name={'checkmark-outline'}
                            size={20}
                            color={'#A1BA68'}
                          />
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              ))}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textS}>Close</Text>
              </Pressable>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
  },
  content: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    borderTopStartRadius: 20,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffff',
  },
  contentHeading: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 17,
  },
  contentText: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 25,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  topbanner: {
    backgroundColor: '#A1BA68',
    height: 60,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140,
    borderRadius: 12,
    padding: 20,
    zIndex: 10,
    position: 'absolute',
  },
  topbanner1: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  topbanner2: {
    backgroundColor: 'rgba(128,186,116,1)',
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  scrollBox: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  hostdetail: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  hostimage: {
    flex: 1,
    backgroundColor: '#A1BA68',
    height: 64,
    width: 62,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#F26722',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 25,
    borderColor: '#F26722',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  registeredButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#F26722',
    paddingLeft: 110,
  },
  buttonWrapper: {
    width: '90%',
    height: 40,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    borderRadius: 15,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    paddingBottom: 5,
    paddingLeft: 10,
    borderBottomColor: '#EBECFO',
    marginTop: 10,
  },
  traitWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  traitW: {
    height: 50,
    width: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  modalView: {
    width: Dimensions.get('window').width - 10,
    marginTop: 100,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 30,
    backgroundColor: '#2196F3',
  },
  textS: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    padding: 10,
    paddingLeft: 20,
    flexDirection: 'row',
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
  bubblesLoader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});
export default CoachingSession;
