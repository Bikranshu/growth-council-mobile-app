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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import YoutubePlayer from '../../../shared/youtube';
import Footer from '../../../shared/footer';
import Player from '../../dashboard/components/Player';
import {useIsFocused} from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {WebView} from 'react-native-webview';
import {Button} from 'native-base';
import Loading from '../../../shared/loading';

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
    poeSelfLearns,
    poeSelfLearnLoading,
    poeSelfLearnError,
    fetchPoeSelfLearn,
    cleanPoeSelfLearn,
  } = props;

  const isFocused = useIsFocused();
  const [memberConnection, setMemberConnection] = useState([]);
  const [showChartButton, setShowChartButton] = useState(true);

  useEffect(() => {
    const fetchAllPOEDetailAsync = async () => {
      await fetchAllPOEDetail(route.params.poeId);
    };
    fetchAllPOEDetailAsync();
  }, []);

  useEffect(() => {
    const fetchAllPOEEventAsync = async () => {
      await fetchAllPOEEvent(route.params.poeId);
    };
    fetchAllPOEEventAsync();
  }, []);

  useEffect(() => {
    const fetchAllPillarMemberContentAsync = async () => {
      await fetchAllPillarMemberContent(route.params.pillarId);
    };
    fetchAllPillarMemberContentAsync();
  }, [isFocused]);

  useEffect(() => {
    const fetchCoachingSessionAsync = async () => {
      await fetchCoachingSessions(route.params.poeId);
    };
    fetchCoachingSessionAsync();
  }, []);

  useEffect(() => {
    const fetchPoeSelfLearnAsync = async () => {
      await fetchPoeSelfLearn(route.params.poeId);
    };
    fetchPoeSelfLearnAsync();
  }, []);

  useEffect(() => {
    setMemberConnection(pillarMemberContents);
  }, [pillarMemberContents]);

  // useEffect(()=>{
  //   for(let value of coachingSession){
  //     if(!value?.completed_status){
  //       setShowChartButton(false);
  //       break;
  //     }
  //   };
  // },[coachingSession]);

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
          onPress={
            (() =>
              navigation.navigate('coachingSession', {
                id: item.ID,
                sessionId: item?.ID,
                title: item?.title,
				previousSessionID:coachingSession[index-1]?.ID
              })
            // abcd())
			)
          }>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              borderWidth: 1.3,
              borderColor: '#9EBD6D',
              marginLeft: 15,
              borderRadius: 14,
              marginTop: 10,
              padding: 10,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
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

  const _renderContentItem = ({item, index}) => {
    const file = item?.file;
    const link = file.split('=', 2);
    let videoLink = link[1].split('&', 2);
    return <Player {...props} item={item} file={file} videoLink={videoLink} />;
  };

  const _renderLearnItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.learnWrapper}>
          <Image
            source={{uri: item?.image}}
            style={{
              width: 150,
              height: 180,
              margin: 10,
              borderRadius: 10,
            }}
            resizeMode="contain"
          />

          <View>
            {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate('selflearn', {
                  id: item.ID,
                  selfLearnId: item?.ID,
                })
              }> */}
            <View>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  marginTop: 10,
                  color: 'black',
                  width: '80%',
                }}>
                {item?.title}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 5,
                  width: 180,
                }}>
                {item.subtitle}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  width: 180,
                }}>
                {item.author}
              </Text>
            </View>
            {/* </TouchableOpacity> */}
            <View
              style={{
                justifyContent: 'center',
                position: 'absolute',
                right: 25,
                bottom: 10,
              }}>
              <Ionicons name={'book-outline'} size={20} color="#cccccc" />
            </View>
          </View>
        </View>
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
            style={{height: 240, width: '100%'}}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.arrow}>
                <Ionicons name={'arrow-back'} size={50} color="white" />
              </View>
            </TouchableOpacity> */}
          </ImageBackground>

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
              {coachingSessionLoading && <Loading />}
              {coachingSession?.length !== 0 &&
                coachingSession !== null &&
                coachingSession !== false && (
                  <View style={styles.middle}>
                    <Text style={styles.title}>Growth Coaching Sessions</Text>
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
              {poeSelfLearns?.length !== 0 &&
                poeSelfLearns !== false &&
                poeSelfLearns !== null && (
                  <View style={styles.learn}>
                    <Text style={styles.title}>Be a Growth Leader</Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={poeSelfLearns}
                        renderItem={_renderLearnItem}
                      />
                    </View>
                  </View>
                )}

              {pillarMemberContents.members?.length !== 0 &&
                pillarMemberContents.members !== false &&
                pillarMemberContents.members !== null && (
                  <View style={styles.bottom}>
                    <Text style={styles.title}>Coaches</Text>
                    <View>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={pillarMemberContents.members}
                        renderItem={item => _renderItem(item, navigation)}
                      />
                    </View>
                  </View>
                )}

              {showChartButton && (
                <View style={styles.bottom}>
                  <Text style={styles.title}>Radar</Text>
                  <View style={styles.buttonWrapper}>
                    <Button
                      style={[styles.button, {marginLeft: 15}]}
                      onPress={() => {
                        navigation.navigate('Radar');
                      }}>
                      <Text style={styles.buttonText}>
                        Click Here
                      </Text>
                    </Button>
                  </View>
                </View>
              )}
              {pillarMemberContents?.pillar_contents?.length !== 0 &&
                pillarMemberContents?.pillar_contents !== false &&
                pillarMemberContents?.pillar_contents !== null && (
                  <View style={styles.growthContent}>
                    <Text style={styles.title}>
                      Growth Leadership Coaching Content Library
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={pillarMemberContents?.pillar_contents}
                        renderItem={_renderContentItem}
                      />
                    </View>
                  </View>
                )}
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
    marginTop: 25,
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
    ...CommonStyles.buttonWrapper,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
    marginBottom: 15,
    borderRadius: 10,
  },
  buttonText: {
    ...CommonStyles.buttonText,
    marginHorizontal: 10,
  },
});
