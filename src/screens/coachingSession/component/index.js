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
  FlatList,
} from 'react-native';

import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import {BubblesLoader} from 'react-native-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';

import SessionAbout from './sessionAbout';
import SelfAssessment from './selfAssessment';
import ToastMessage from '../../../shared/toast';
import {CommonStyles, Colors, Typography} from '../../../theme';

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
    // sessionRegisters,
    // sessionRegisterLoading,
    // sessionRegisterError,
    // registerSessionByIdentifier,
    // cleanSessionRegister,

    profile,
    profileLoading,
    profileError,
    fetchProfile,
    cleanProfile,
  } = props;

  const scrollRef = useRef();

  const [value, setValue] = useState('About');
  const [count, setCount] = useState(route?.params?.count);

  const [modalVisible, setModalVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
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

  console.log({score});
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
    setCount(route?.params?.count);
  }, [count]);

  let Traits = traits[count];

  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfile();
    };
    fetchProfileAsync();
  }, []);

  let Growth =
    profile?.session_score !== false && profile?.session_score !== null
      ? profile?.session_score?.map(item => {
          let grow = item?.session === sessions.ID ? item?.growth_index : null;
          return grow;
        })
      : 0;

  let Innovation =
    profile?.session_score !== false && profile?.session_score !== null
      ? profile?.session_score?.map(item => {
          let inn =
            item?.session === sessions.ID ? item?.innovative_index : null;

          return inn;
        })
      : 0;

  useEffect(() => {
    let traitsLength = traits.length;
    let subtraitsLength = [];
    let growthIndexScore = 0;
    let innovativeIndexScore = 0;

    if (count === 0) {
      console.log('0');
      growthIndexScore = 0;
      innovativeIndexScore = Innovation * 3;
    } else {
      console.log('1');
      growthIndexScore = Growth * 3;
      innovativeIndexScore = 0;
    }

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

  let previousSession =
    profile?.session_score !== false && profile?.session_score !== null
      ? profile?.session_score?.map(item => item?.session)
      : [0];

  let growth = 0.0;
  let innovation = 0.0;
  if (previousSession?.indexOf(sessions.ID) > -1 === true) {
    growth = Growth;
    innovation = Innovation;
  } else {
    growth = score?.growthIndexScore?.toFixed(1);
    innovation = score?.innovativeIndexScore?.toFixed(1);
    if (isNaN(growth)) growth = 0.0;
    if (isNaN(innovation)) innovation = 0.0;
  }
  console.log(count === 0 ? growth > 0 : innovation > 0);
  const _renderItem = ({item, index}) => {
    // switch (item?.score_range) {
    //   case '1 - 2.5':
    //     backgroundColor = '#97CB0A';
    //     break;
    //   case '2.6 - 4':
    //     backgroundColor = '#FCCC4D';
    //     break;
    //   case '4.1 - 5':
    //     backgroundColor = '#FC8935';
    //     break;
    // }
    let backgroundColor =
      item?.score_color !== '' ? item?.score_color : '#63C5DA';
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          paddingBottom: 10,
        }}>
        <View
          style={{
            width: '35%',
            alignContent: 'center',
          }}>
          <View
            style={[
              {
                backgroundColor: backgroundColor,
                borderRadius: 20,
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5,
                padding: 10,
                width: '100%',
                alignItems: 'center',
              },
              styles.shadowProp,
            ]}>
            <Text style={{fontSize: 12, color: 'white'}}>
              {item?.score_category}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text>{item?.score_range}</Text>
          </View>
        </View>
        <HTMLView
          value={item?.score_description}
          textComponentProps={{
            style: {
              width: 190,
              marginLeft: 25,
              textAlign: 'justify',
              fontSize: 12,
              paddingRight: 15,
            },
          }}
        />
      </View>
    );
  };
  return traitsLoading && sessionLoading ? (
    <View style={styles.bubblesLoader}>
      <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
    </View>
  ) : (
    <ScrollView style={styles.scrollBox} ref={scrollRef}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
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
                alignItems: 'center',
                // backgroundColor: 'red',
                position: 'absolute',
                right: 15,
                top: 40,
                zIndex: 10,
              }}>
              {/* <View style={styles.buttonWrapper}>
                <ButtonToggleGroup
                  highlightBackgroundColor={'white'}
                  highlightTextColor={'#0B0B45'}
                  inactiveBackgroundColor={'transparent'}
                  inactiveTextColor={'grey'}
                  values={['About', 'Self-Assessment']}
                  value={value}
                  onSelect={val => {
                    // if (moment(sessions?.event_end).isBefore()) {
                    //   if (sessions?.completed_status) {
                    //     ToastMessage.show('You have completed this assessment');
                    //   } else if (
                    //     previousSession.indexOf(previousSessionID) > -1 !==
                    //     true
                    //   ) {
                    //     if (previousSessionID === undefined) {
                    //       return setValue(val);
                    //     } else {
                    //       ToastMessage.show(
                    //         'Please complete the previous session to access the next sessions',
                    //       );
                    //     }
                    //   } else {
                        return setValue(val);
                    //   }
                    // } else {
                      ToastMessage.show('Session has not ended');
                    // }
                  }}
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    height: 30,
                  }}
                  textStyle={{
                    paddingHorizontal: 0,
                    fontSize: 14,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                />
              </View> */}
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons
                  name={modalVisible ? 'close' : 'menu'}
                  size={35}
                  color={'black'}
                />
              </TouchableOpacity>

              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}>
                  {scoreVisible ? (
                    <ScrollView
                      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}
                      contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 10,
                      }}>
                      <View style={styles.modalView}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignContent: 'center',
                              justifyContent: 'center',
                              padding: 20,
                            }}>
                            <Text
                              style={{
                                width: '80%',
                                paddingTop: 20,
                                paddingLeft: 80,
                                fontSize: 18,
                                color: 'black',
                                fontWeight: '700',
                              }}>
                              Scores Chart
                            </Text>
                            <Pressable onPress={() => setScoreVisible(false)}>
                              <Ionicons
                                name={'close'}
                                size={35}
                                color={'#4936BE'}
                              />
                            </Pressable>
                          </View>

                          <View
                            style={{flexDirection: 'row', marginBottom: 10}}>
                            <View
                              style={[
                                {
                                  backgroundColor: '#ffff',
                                  borderRadius: 20,
                                  marginLeft: 10,
                                  marginBottom: 5,
                                  padding: 12,
                                  alignItems: 'center',
                                },
                                styles.shadowProp,
                              ]}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#8DC182',
                                  fontWeight: '700',
                                }}>
                                {Traits?.title}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <FlatList
                              vertical
                              showsHorizontalScrollIndicator={false}
                              data={Traits?.score_description}
                              renderItem={_renderItem}
                            />
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  ) : (
                    <ScrollView
                      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}
                      contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 10,
                      }}>
                      <View style={styles.modalView}>
                        {/* {traits?.map((trait, index1) => ( */}
                        <View>
                          <View style={styles.wrapper}>
                            <View style={styles.traitWrapper}>
                              {/* <View style={[styles.traitW, styles.shadowProp]}>
                                  <Image
                                    source={{uri: trait?.image}}
                                    style={{width: 20, height: 20}}
                                  />
                                </View> */}
                              <Text
                                style={{
                                  fontSize: 12,
                                  width: '70%',
                                  marginLeft: 10,
                                }}>
                                {Traits?.title}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text style={{fontSize: 12}}>Score</Text>
                              <Pressable
                                onPress={() => {
                                  setScoreVisible(true);
                                }}
                                //   onPressIn={() => {
                                //     setCount(index1 === 0 ? 0 : 1);
                                //   }}
                              >
                                <View
                                  style={{
                                    width: 40,
                                    height: 30,
                                    marginLeft: 5,
                                    backgroundColor: 'orange',
                                    borderRadius: 50,
                                    padding: 5,
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 13,
                                      letterSpacing: 1.5,
                                    }}>
                                    {count === 0 ? growth : innovation}
                                    {/* {innovation} */}
                                  </Text>
                                </View>
                              </Pressable>
                            </View>
                          </View>
                          <View style={{marginTop: 10, marginLeft: 50}}>
                            {Traits?.sub_traits?.map((subTrait, index2) => (
                              <View
                                style={[styles.textStyle, styles.shadowProp]}
                                key={index2}>
                                <Text style={{fontSize: 12, width: '80%'}}>
                                  {subTrait?.title}
                                </Text>
                                {(checkMark(count, index2) || count === 0
                                  ? growth > 0
                                  : innovation > 0) && (
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
                        {/* ))} */}
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(false)}>
                          <Text style={styles.textS}>Close</Text>
                        </Pressable>
                      </View>
                    </ScrollView>
                  )}
                </Modal>
              </View>

              <View style={styles.centeredView}></View>
            </View>

            <View style={{marginTop: 32}}>
              {/* {value === 'About' && (
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
              {value === 'Self-Assessment' && ( */}
              <SelfAssessment
                {...props}
                score={score}
                sessions={sessions}
                traits={traits}
                count={count}
                Traits={Traits}
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
              {/* // <SessionCompleted />
              )} */}
            </View>
          </View>
        </View>
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
    width: Dimensions.get('window').width - 70,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#ECECEC',
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    paddingLeft: 5,
    borderBottomColor: '#EBECFO',
    alignItems: 'center',
  },
  traitWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    marginTop: 100,
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
