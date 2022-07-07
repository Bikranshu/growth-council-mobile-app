import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Button, useToast} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {useIsFocused} from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {WebView} from 'react-native-webview';
import ToastMessage from '../../../shared/toast';
import Loading from '../../../shared/loading';
import {HOME_URL} from '../../../constants';

const screenHeight = Math.round(Dimensions.get('window').height);
const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

const GrowthDetail = props => {
  const {
    route,
    navigation,
    poeDetails,
    poeDetailLoading,
    poeDetailError,
    fetchAllPOEDetail,
    cleanPOEDetail,
    poeEvents,
    poeEventLoading,
    poeEventError,
    fetchAllPOEEvent,
    cleanPOEEvent,
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
    fetchAllPillarMemberContent,
    cleanPillarMemberContent,
    coachingSession,
    coachingSessionLoading,
    coachingSessionError,
    fetchCoachingSessions,
    cleanCoachingSession,

    radarMemberDetails,
    radarMemberDetailsLoading,
    radarMemberDetailsError,
    fetchRadarMemberDetail,

    coachingSignup,
    coachingSignupLoading,
    coachingSignupError,
    signupCoachingSession,
    cleanSignUpCoaching,

    profile,
    profileLoading,
    profileError,
    fetchProfile,
    cleanProfile,
  } = props;

  const toast = useToast();
  const isFocused = useIsFocused();
  const [status, setStatus] = useState(false);
  const [showChartButton, setShowChartButton] = useState(true);
  const webviewRef = React.useRef(null);
  const [userId, setUserId] = useState(0);

  //   useEffect(async () => {
  //     let token = await getAsyncStorage(JWT_TOKEN);
  //     let ID = decodeUserID(token);
  //     if (ID) {
  //       setUserId(ID);
  //     }
  //   }, []);

  const eventID = route.params.poeId;

  useEffect(() => {
    const fetchAllPOEDetailAsync = async () => {
      await fetchAllPOEDetail(eventID);
    };
    fetchAllPOEDetailAsync();
  }, [eventID]);

  useEffect(() => {
    const fetchAllPOEEventAsync = async () => {
      await fetchAllPOEEvent(route.params.poeId);
    };
    fetchAllPOEEventAsync();
  }, []);

  useEffect(() => {
    const fetchCoachingSessionAsync = async () => {
      await fetchCoachingSessions(route.params.poeId);
    };
    fetchCoachingSessionAsync();
  }, []);

  useEffect(() => {
    fetchRadarMemberDetail();
  }, []);

  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfile();
    };
    fetchProfileAsync();
  }, []);

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  const GrowthCoachingSignup = async () => {
    const response = await signupCoachingSession({});
    if (response?.payload?.code === 200) {
      // setStatus(true);
      ToastMessage.show(response.payload.message);
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.message);
    }
  };

  let previousSession =
    profile?.session_score !== false && profile?.session_score !== null
      ? profile?.session_score?.map(item => item?.session)
      : [0];

  let SessionID =
    coachingSession !== false && coachingSession !== null
      ? coachingSession.map(item => item?.ID)
      : [0];

  const _renderItem = ({item, index}, navigation) => {
    return (
      <View style={[styles.bottomWrapper, styles.shadowProp]} key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
          <Image
            source={{uri: item.avatar}}
            style={{
              width: '100%',
              height: 83,
              borderRadius: 10,
            }}
          />
          <View style={{padding: 10, paddingBottom: 20}}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: Typography.FONT_SF_SEMIBOLD,
                color: Colors.TERTIARY_TEXT_COLOR,
              }}>
              {item?.user_meta?.first_name} {item?.user_meta?.last_name}
            </Text>
            <Text style={{fontSize: 6}}>Frost and Sullivan</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderMiddleItem = ({item, index}) => {
    const actualDate = moment(item?.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('coachingSession', {
              id: item.ID,
              sessionId: item?.ID,
              title: item?.title,
              previousSessionID: coachingSession[index - 1]?.ID,
            })
          }>
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1.3,
              borderColor: '#9EBD6D',
              marginLeft: 10,
              borderRadius: 14,
              marginTop: 10,
              padding: 10,
              width: 180,
              height: 60,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                color: 'black',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              {item?.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  let poeDescription = poeDetails?.description;
  if (poeDescription !== undefined) {
    poeDescription = poeDetails?.description;
  } else {
    poeDescription = '';
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
        <View style={styles.container}>
          <ImageBackground
            source={{uri: poeDetails?.pillar_detail_image}}
            style={{height: 240, width: '100%'}}></ImageBackground>

          <View style={[styles.icon, styles.shadowProp]}>
            <Image
              source={{uri: poeDetails?.image}}
              style={{
                width: 35,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.contentWrapper}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#1E2022',
                  textAlign: 'center',
                  marginTop: 50,
                }}>
                {poeDetails.name}
              </Text>
              <HTMLView
                value={poeDescription}
                textComponentProps={{
                  style: {
                    fontFamily: Typography.FONT_SF_REGULAR,
                    fontSize: 14,
                    lineHeight: 24,
                    padding: 15,
                    textAlign: 'left',
                    color: '#77838F',
                    textAlign: 'justify',
                  },
                }}
              />

      
	  
              <View>
                <TouchableOpacity onPress={() => GrowthCoachingSignup()}>
                  <View style={styles.buttonWrapper}>
                    <View
                      style={[
                        styles.button,
                        {
                          marginLeft: 15,
                          backgroundColor: Colors.PRACTICE_COLOR,
                        },
                      ]}>
                      <Text style={styles.buttonText}>
                        Click here to enroll and begin your own transformational journey today!
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

           
		   
              {coachingSessionLoading && <Loading />}

              {/* {previousSession.indexOf(SessionID) > -1 !== true && (
                <View> */}
                  {coachingSession?.length !== 0 &&
                    coachingSession !== null &&
                    coachingSession !== false && (
                      <View style={styles.middle}>
                        <Text style={styles.title}>Sessions</Text>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={coachingSession}
                            renderItem={_renderMiddleItem}
                          />
                        </View>
                      </View>
                    )}
                {/* </View>
              )} */}

{/* 
              <View style={{marginTop: 20, paddingBottom: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Typography.FONT_SF_REGULAR,
                    color: Colors.PRIMARY_TEXT_COLOR,
                    fontWeight: '700',
                    marginLeft: 15,
                  }}>
                  Frost Radar for Leadership
                </Text>
                {radarMemberDetails?.radar_text !== undefined && (
                  <HTMLView
                    value={radarMemberDetails?.radar_text}
                    textComponentProps={{
                      style: {
                        fontFamily: Typography.FONT_SF_REGULAR,
                        fontSize: 14,
                        lineHeight: 24,
                        padding: 15,
                        textAlign: 'left',
                        color: '#77838F',
                        textAlign: 'justify',
                      },
                    }}
                  />
                )}

                <View style={{height: 400, backgroundColor: 'white'}}>
                  <WebView
                    source={{
                      uri: `https://staging.gilcouncil.com/frost-radar/`,
                    }}
                    renderLoading={LoadingIndicatorView}
                    startInLoadingState={true}
                    ref={webviewRef}
                    androidHardwareAccelerationDisabled={true}
                    style={{overflow: 'hidden', opacity: 0.99}}
                  />
                </View>
              </View> */}

              {/* {showChartButton && (
                <View style={styles.bottom}>
                  <Text style={styles.title}>Frost Radar for Leadership</Text>
                  {radarMemberDetails?.radar_text !== undefined && (
                    <HTMLView
                      value={radarMemberDetails?.radar_text}
                      textComponentProps={{
                        style: {
                          fontFamily: Typography.FONT_SF_REGULAR,
                          fontSize: 14,
                          lineHeight: 24,
                          padding: 15,
                          textAlign: 'left',
                          color: '#77838F',
                          textAlign: 'justify',
                        },
                      }}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Radar');
                    }}>
                    <View style={styles.buttonWrapper}>
                      <View style={[styles.button, {marginLeft: 15}]}>
                        <Text style={styles.buttonText}>
                          View Frost Radar for Leadership
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )} */}
            </View>
          </ScrollView>
        </View>
        {/* <Footer /> */}
      </ScrollView>
    </>
  );
};

export default GrowthDetail;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center',
  },
  arrow: {
    marginTop: 30,
  },
  icon: {
    width: Platform.OS === 'ios' ? 80 : 80,
    height: Platform.OS === 'ios' ? 80 : 80,
    backgroundColor: 'white',
    borderRadius: 19,
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: Typography.FONT_SF_REGULAR,
    color: Colors.PRIMARY_TEXT_COLOR,
    fontWeight: '700',
    marginLeft: 15,
  },

  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderTopWidth: 10,
    borderColor: Colors.COACHING_COLOR,
  },
  contentWrapper: {
    borderRadius: 18,
    backgroundColor: 'white',
    overflow: 'scroll',
    marginTop: 10,
  },
  paragraph: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    lineHeight: 24,
    padding: 15,
    textAlign: 'left',
    color: '#77838F',
  },
  top: {
    height: 200,
    marginTop: 10,
    justifyContent: 'center',
  },
  topWrapper: {
    height: 144,
    width: 256,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 20,
  },
  middle: {
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
  middleWrapper: {
    height: 68,
    width: 180,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 14,
    borderWidth: 1.3,
    borderColor: '#9EBD6D',
  },
  learn: {
    marginTop: 30,
    justifyContent: 'center',
  },
  learnWrapper: {
    width: contentContainerWidth,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 10,
    borderWidth: 1.3,
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#9EBD6D',
  },
  radar: {
    height: 350,
    margin: 10,
    marginTop: 30,
  },
  bottom: {
    marginTop: 10,
    marginBottom: 20,
  },
  bottomWrapper: {
    width: Dimensions.get('window').width / 4,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  chatIcon: {
    borderRadius: 50,
    backgroundColor: '#F1F1F1',
    padding: 2,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  header: {
    margin: 10,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_REGULAR,
    marginTop: 10,
    fontWeight: '800',
    color: 'white',
    fontSize: 12,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_REGULAR,
    fontWeight: '400',
    color: 'white',
    fontSize: 8,
  },
  growthContent: {
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  ContentWrapper: {
    height: 206,
    width: 364,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 20,
    overflow: 'hidden',
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
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  button: {
    width: '93%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    marginHorizontal: 5,
    fontSize: 14,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
