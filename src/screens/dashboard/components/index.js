import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  Platform,
  StatusBar,
  Dimensions,
  StyleSheet,
  BackHandler,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';

import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Material from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import Quote from './quote';
import PillarList from './PillarList';
import Loading from '../../../shared/loading';
import ToastMessage from '../../../shared/toast';
import BottomNav from '../../../layout/BottomLayout';
import FloatingButton from '../../../shared/floatingButton';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {GROWTH_COMMUNITY_ID, GROWTH_CONTENT_ID} from '../../../constants';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';
import {emptyContainerRenderData} from '../../../utils/flatlistRenderData';

const win = Dimensions.get('window').width;
const contentContainerWidth = win / 2;

const Dashboard = props => {
  const {
    // upcomingEvents,
    // upcomingEventLoading,
    // upcomingEventError,
    // fetchAllUpcomingEvent,
    // cleanUpcomingEvent,
    // poes,
    // poeLoading,
    // poeError,
    // fetchAllPOE,
    // cleanPOE,

    // pillarEventLists,
    // pillarEventLoading,
    // pillarEventError,
    // fetchAllPillarEvent,
    // cleanPillarEvent,
    // contentSlider,

    communityMembers,
    communityMemberLoading,
    communityMemberError,
    fetchAllCommunityMember,
    cleanCommunityMember,
    pillarSliders,
    pillarSliderLoading,
    pillarSliderError,
    fetchAllPillarSlider,
    cleanPillarSlider,

    latestContent,
    latestContentLoading,
    latestContentError,
    fetchLatestContent,
    cleanLatestContent,
    criticalIssue,
    criticalIssueLoading,
    criticalIssueError,
    fetchCritcalIssue,
    cleanCriticalIssue,

    memberConnections,
    memberConnectionLoading,
    memberConnectionError,
    connectMemberByIdentifier,
    cleanConnectMember,

    profile,
    profileLoading,
    profileError,
    // fetchProfile,
    // cleanProfile,

    regionEvents,
    regionEventLoading,
    regionEventError,
    fetchEventRegion,
    cleanEventRegion,

    dailyQuote,
    dailyQuoteLoading,
    // dailyQuoteError,
    fetchDailyQuote,
    cleanDailyQuote,
  } = props;

  let region = profile?.user_meta?.region;
  if (typeof region === 'undefined' || region === null) {
    region = '';
  } else {
    region = profile?.user_meta?.region[0];
  }

  const [memberConnection, setMemberConnection] = useState([]);

  const [hideCritical, setHideCritical] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const [data, setdata] = useState('');

  const [dataSourceCords, setDataSourceCords] = useState(criticalIssue);
  // const [ref, setRef] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  let string = region;
  if (string) string = string.toLowerCase();

  //   let regionUser = profile?.user_meta?.region;
  //   if (typeof regionUser === 'undefined' || regionUser === null) {
  //     regionUser = '';
  //   } else {
  //     regionUser = profile?.user_meta?.region[0];
  //   }

  const [userRegion, setUserRegion] = useState(region);

  // Start tracking the duration of the user's stay on the page
  let startTime = new Date().getTime();

  // Call this method when the user navigates away from the page
  let endTime = new Date().getTime();
  let duration = endTime - startTime;

  useEffect(() => {
    const GoogleA = async () => {
      await analytics().logEvent('dashboard_duration', {
        page_name: 'dashboard', // name of the page
        duration: duration, // duration in milliseconds
      });
    };
    GoogleA();
  }, []);

  useEffect(() => {
    setUserRegion(region);
  }, [profile]);

  useEffect(() => {
    messaging()
      .getToken()

      .then(token => {
        async () => {
          console.log('FCM ---> ' + token);
        };
      });
  }, []);

  const wait = ms =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });

  useEffect(() => {
    fetchEventRegion({
      region: userRegion,
    });
  }, [profile]);

  useFocusEffect(
    useCallback(() => {
      const fetchAllCommunityMemberAsync = async () => {
        await fetchAllCommunityMember({
          s: '',
          sort: 'Desc',
          region: '',
        });
      };
      fetchAllCommunityMemberAsync();

      return () => {
        cleanCommunityMember();
      };
    }, []),
  );

  useEffect(() => {
    fetchAllPillarSlider();
  }, []);

  useEffect(() => {
    fetchDailyQuote();
  }, [isFocused]);

  useEffect(() => {
    const fetchLatestContentAsync = async () => {
      await fetchLatestContent();
    };
    fetchLatestContentAsync();
  }, []);

  useEffect(() => {
    wait(5000).then(() => fetchCritcalIssue());
  }, []);

  useEffect(() => {
    setDataSourceCords(criticalIssue);
  }, [criticalIssue]);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler?.remove();
  }, []);

  useEffect(() => {
    setMemberConnection(communityMembers);
  }, [communityMembers]);

  const connectMemberByMemberID = async (memberID, index) => {
    const response = await connectMemberByIdentifier({member_id: memberID});
    if (response?.payload?.code === 200) {
      let items = [...memberConnection];
      let item = {...items[index]};
      item.connection = true;
      items[index] = item;
      setMemberConnection(items);
      ToastMessage.show('You have successfully connected.');
    } else {
      //   toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  const _renderItem = ({item, index}) => {
    let user = item?.user_meta?.region;
    if (typeof user === 'undefined' || user === 'null') {
      user = ' ';
    } else {
      user = item?.user_meta?.region[0];
    }

    return (
      <>
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
                  color: '#030303',
                }}>
                {item?.display_name}
              </Text>
              <Text style={{fontSize: 8, color: '#030303', marginTop: 3}}>
                {item?.registered_date}
                {'\n'}
                {'\n'}
                {/* {item?.user_meta?.Title === undefined
                  ? item?.user_meta?.title
                  : item?.user_meta?.Title} */}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.chatIcon}>
            {!memberConnection[index]?.connection && (
              <TouchableOpacity
                onPress={async () => {
                  connectMemberByMemberID(item.ID, index);

                  await analytics().logEvent('dashboard_New_Member', {
                    add_member: item?.user_meta?.first_name,
                    user: profile?.user_login,
                  });
                }}>
                <Ionicons name="add-circle" size={20} color="#B2B3B9" />
              </TouchableOpacity>
            )}
            {memberConnection[index]?.connection && (
              <View style={{flexDirection: 'row'}}>
                <Material name="check-circle" size={20} color="#14A2E2" />
              </View>
            )}
          </View>
        </View>
      </>
    );
  };

  const _renderContent = ({item, index}) => {
    const date = moment(item?.post_modified).format('MM/D/yyyy');
    return (
      <View key={index} style={[styles.middleWrapper, styles.shadowContent]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '70%', margin: 10}}>
            <Text style={{fontSize: 12, color: '#041C3E', fontWeight: '600'}}>
              {item.post_title}
            </Text>
            <HTMLView
              value={'<p>' + item?.post_excerpt + '</p>'}
              stylesheet={webViewStyle}
            />
          </View>
          <View style={styles.middleW}>
            {item?.video_url !== null && item?.video_url !== '' && (
              <Image
                source={require('../../../assets/img/file-play.png')}
                style={{width: 20, height: 20, color: '#9B9CA0'}}
                resizeMode="contain"
              />
            )}
            {item?.video_url === '' && (
              <FontAwesome5 name="file-pdf" size={20} color="#9B9CA0" />
            )}
            {item?.video_url === null && (
              <FontAwesome5 name="file-pdf" size={20} color="#9B9CA0" />
            )}
            <Text style={{fontSize: 8, marginTop: 2}}>View</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('ContentLibraryDetail', {
              id: item?.ID,
              title: item?.post_title,
            });
            await analytics().logEvent('LatestContent', {
              content_post_title: item.post_title,
            });
          }}>
          <View style={styles.middleWrap}>
            <Text style={{color: 'white', fontSize: 10}}>View</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.contentTime}>
          <Text style={{fontSize: 7}}>Published on: {date}</Text>
        </View>
      </View>
    );
  };

  const _renderTopItem = ({item, index}, navigation) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

    let backgroundImage = '';
    let pillarname = '';
    switch (
      item?.pillar_categories[0]?.parent ||
      item?.pillar_categories[1]?.parent
    ) {
      case GROWTH_COMMUNITY_ID:
      case 0:
        backgroundImage = require('../../../assets/img/Rectangle2.png');
        pillarname = 'Growth Community';
        break;
      case GROWTH_CONTENT_ID:
      case 0:
        backgroundImage = require('../../../assets/img/best-practice-bg.png');
        pillarname = 'Growth Content';
        break;

      default:
        backgroundImage = require('../../../assets/img/Rectangle.png');
        pillarname = 'Growth Coaching';
    }

    let organizer = item?.organizer?.term_name;
    let description = item?.organizer?.description;
    if (organizer === undefined) {
      organizer = ' ';
    } else {
      organizer = <Text>Hosted By {item?.organizer?.term_name}</Text>;
    }

    if (description === undefined) {
      description = ' ';
    } else {
      description = item?.organizer?.description;
    }

    return (
      <View key={index} style={styles.topWrapper}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('EventDetail', {
              id: item.ID,
              title: pillarname,
              image: backgroundImage,
            });

            await analytics().logEvent('upcoming_event', {
              event_title: item?.title,
              event_id: item?.id,
            });
          }}>
          <ImageBackground
            style={{width: '100%', height: 190, borderRadius: 20}}
            source={backgroundImage}>
            <View
              style={{
                width: 50,
                height: 50,
                marginTop: 10,
                marginLeft: 200,
                backgroundColor: '#EBECF0',
                borderRadius: 10,
                padding: 5,
                alignItems: 'center',
              }}>
              <Text style={{color: '#030303'}}>{date[0]}</Text>
              <Text style={{color: '#030303'}}>{date[1]}</Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.headingText1}>{item.title}</Text>
              <Text style={styles.headingText2}>
                {organizer} {description}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderCritical = ({item, index}) => {
    return (
      <RenderCriticalComponent
        item={item}
        dataSourceCords={dataSourceCords}
        setDataSourceCords={setDataSourceCords}
        index={index}
        userRegion={userRegion}
        setHideCritical={setHideCritical}
      />
    );
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 3);
  }, []);

  const date = new Date();
  let localTime = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;

  let target_offset = -8; //PST from UTC 7 hours behind right now, will need to fix for daylight
  let los_angles = utc + 3600000 * target_offset;

  const nd = new Date(los_angles);
  const ActualPSTTime = moment(nd).format('MM/DD/yyyy');

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />

      {/*
       * NOTE: Workaround fix for console warning: 'VirtualizedLists should never be nested inside plain ScrollViews ...'
       */}
      <FlatList
        data={emptyContainerRenderData}
        scrollEventThrottle={16}
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.y;
          if (offset >= 70) {
            navigation.setOptions({
              headerShown: false,
            });
          } else {
            navigation.setOptions({
              headerShown: true,
            });
          }
        }}
        contentContainerStyle={{
          //   flexGrow: 1,
          backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        }}
        ListHeaderComponent={() => {
          return (
            <View>
              {/* View Component 1 */}
              <View>
                <ImageBackground
                  style={{
                    // width: '100%',
                    height: (Dimensions.get('screen').height - 180) / 2,
                    paddingTop:
                      Platform.OS === 'ios'
                        ? Dimensions.get('screen').height / 8
                        : Dimensions.get('screen').height / 10,
                  }}
                  source={require('../../../assets/img/appBG.png')}>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    {/* Daily Quote View Component */}

                    <View>
                      {dailyQuote?.map((item, index) => {
                        return (
                          <View>
                            {item?.quote_date === ActualPSTTime ? (
                              <>
                                {!modalVisible && (
                                  <LinearGradient
                                    start={{
                                      x: 0.697,
                                      y: -0.943,
                                    }}
                                    end={{x: 0.413, y: 2.24}}
                                    colors={['#58AFF6', '#002651']}
                                    style={styles.quote}>
                                    <View>
                                      <Text
                                        onTextLayout={onTextLayout}
                                        numberOfLines={3}
                                        style={{
                                          fontSize: 14,
                                          color: 'white',
                                          textAlign: 'center',
                                          marginBottom: 10,
                                          // alignItems: 'center',
                                        }}>
                                        {item?.daily_quote}
                                      </Text>
                                      <View
                                        style={{
                                          alignItems: 'flex-end',
                                          position: 'absolute',
                                          right: 5,
                                          bottom: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            position: 'absolute',
                                            right: 5,
                                            fontWeight: 'bold',
                                            color: 'white',
                                          }}>
                                          - {item?.quote_author}
                                        </Text>
                                      </View>
                                      {lengthMore && (
                                        <Pressable
                                          onPress={() => {
                                            setModalVisible(true),
                                              setdata(item);
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: 'white',
                                              textAlign: 'center',
                                            }}>
                                            'See More...'
                                          </Text>
                                        </Pressable>
                                      )}
                                    </View>
                                  </LinearGradient>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={styles.pillar}>
                    <PillarList
                      pillarSliders={pillarSliders}
                      navigation={navigation}
                    />
                  </View>
                </ImageBackground>
              </View>

              <View style={{height: 60}} />

              {/* Region event */}
              {regionEvents?.length !== 0 &&
                regionEvents !== null &&
                regionEvents !== undefined && (
                  <View style={styles.top}>
                    <View style={styles.eventWrapper}>
                      <Text style={styles.title}>Upcoming Events</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 20,
                      }}>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={regionEvents}
                        listKey={'regionEvents'}
                        renderItem={item => _renderTopItem(item, navigation)}
                      />
                    </View>
                  </View>
                )}

              {regionEventLoading && <Loading />}

              {memberConnectionLoading && (
                <View style={{marginTop: 40}}>
                  <Loading />
                </View>
              )}

              {latestContent?.length !== 0 &&
                latestContent !== null &&
                latestContent !== undefined && (
                  <View style={styles.middle}>
                    <Text style={[styles.title, {marginLeft: 15}]}>
                      Latest Growth Content
                    </Text>

                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={latestContent}
                      listKey={'latestContent'}
                      renderItem={_renderContent}
                    />
                  </View>
                )}

              {communityMembers?.length !== 0 &&
                communityMembers !== null &&
                communityMembers !== undefined && (
                  <View style={styles.bottom}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: 15,
                        marginRight: 15,
                      }}>
                      <Text style={styles.title}>Welcome New Members</Text>
                    </View>
                    <View>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={communityMembers}
                        listKey={'communityMembers'}
                        renderItem={_renderItem}
                      />
                    </View>
                  </View>
                )}

              {/* View component 2 */}
              <View style={styles.content}>
                {hideCritical && (
                  <Text style={styles.title}>
                    {criticalIssue?.critical_issue_mobile_title}
                  </Text>
                )}
                <View>
                  <FlatList
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    data={criticalIssue?.critical_issue_mobile_lists}
                    listKey={'criticalIssue'}
                    renderItem={_renderCritical}
                  />
                </View>
              </View>

              {modalVisible && (
                <BlurView
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                  blurType="light"
                  blurAmount={10}
                  reducedTransparencyFallbackColor="white"
                />
              )}

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LinearGradient
                    start={{x: 0.697, y: -0.943}}
                    end={{x: 0.413, y: 2.24}}
                    colors={['#58AFF6', '#002651']}
                    style={{
                      width: Dimensions.get('screen').width - 50,
                      margin: 20,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      padding: 35,
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setModalVisible(false)}
                      style={{
                        alignItems: 'flex-end',
                        position: 'absolute',
                        right: 0,
                        margin: 5,
                      }}>
                      <Text
                        style={{
                          padding: 10,
                          fontSize: 18,
                          color: 'white',
                          textAlign: 'right',
                        }}>
                        X
                      </Text>
                    </TouchableOpacity>
                    <Text style={{marginTop: 10, color: 'white'}}>
                      {data?.daily_quote}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        position: 'relative',
                        left: 90,
                        textAlign: 'right',
                        bottom: -10,
                        alignItems: 'flex-end',
                        fontWeight: 'bold',
                        color: 'white',
                        padding: 10,
                      }}>
                      -{data?.quote_author}
                    </Text>
                    {/* {lengthMore ? (
                      // <Text
                      //   onPress={toggleNumberOfLines}
                      //   style={{lineHeight: 21, marginTop: 10}}>
                      //   {textShown ? 'Read less...' : 'Read more...'}
                      // </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}>
                        <Text>'Read less...' </Text>
                      </TouchableOpacity>
                    ) : null} */}
                  </LinearGradient>
                </View>
              </Modal>
            </View>
          );
        }}
        renderItem={() => {
          return null;
        }}
        keyExtractor={index => index.toString()}
      />

      <FloatingButton {...props} navigation={navigation} />
      <BottomNav {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    // width: '100%',
    marginBottom: 40,
  },

  quote: {
    // backgroundColor: 'white',
    height: 100,
    width: Dimensions.get('screen').width - 10,
    justifyContent: 'center',

    marginBottom: 20,
    borderRadius: 14,
    padding: 10,
    zIndex: 9,
    position: 'relative',
  },
  pillar: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    // marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  viewAll: {
    fontSize: 10,
    color: SECONDARY_TEXT_COLOR,
  },
  eventWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  top: {
    height: 210,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    marginLeft: 5,
  },

  topWrapper: {
    height: 180,
    width: 256,
    marginLeft: 15,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 5,
  },
  header: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: Typography.FONT_SF_REGULAR,
    color: PRIMARY_TEXT_COLOR,
    fontWeight: '700',
  },
  headingText1: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    marginTop: 10,
    fontWeight: '600',
    width: '98%',
    color: 'white',
    fontSize: 11,
  },
  headingText2: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    // fontWeight: '700',
    color: 'white',
    fontSize: 8,
    lineHeight: 8,
  },
  middle: {
    marginTop: 10,
    marginLeft: 5,
  },
  middleWrapper: {
    height: 180,
    width: 256,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 16,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    backgroundColor: 'white',
    marginRight: 5,
    // borderWidth: 0.3,
  },
  middleW: {
    width: 40,
    height: 50,
    marginTop: 10,
    backgroundColor: '#EBECF0',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  middleWrap: {
    width: 70,
    padding: 5,
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 20,
    backgroundColor: '#183863',
  },
  contentTime: {
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
  headingText3: {
    ...CommonStyles.headingText3,
    fontFamily: Typography.FONT_NORMAL,
    padding: 4,
  },
  bottom: {
    margin: 5,
    marginTop: 15,
  },
  bottomWrapper: {
    position: 'relative',
    width: Dimensions.get('window').width / 4,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 10,
    marginRight: 2,
    backgroundColor: 'white',
  },
  chatIcon: {
    borderRadius: 50,
    padding: 2,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
  content: {
    marginLeft: 20,
    marginTop: 15,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 80,
    paddingBottom: 5,
  },
  ContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: (Dimensions.get('window').width - 50) / 2,
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 5,
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
  shadowCritical: {
    shadowColor: '#183863',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowContent: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loading1: {
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
  criticalW: {
    backgroundColor: 'white',
    width: 64,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
const webViewStyle = StyleSheet.create({
  p: {fontSize: 8, color: 'black', marginTop: 5},
});
export default Dashboard;

/*
 * NOTE: _renderCritical component
 */
const RenderCriticalComponent = ({
  item,
  index,
  userRegion,
  dataSourceCords,
  setHideCritical,
  setDataSourceCords,
}) => {
  useEffect(() => {
    if (item?.region?.includes(lowercaseRegion)) {
      setHideCritical(item?.region?.includes(lowercaseRegion));
    }
  }, []);

  const navigation = useNavigation();

  let lowercaseRegion = '';
  if (userRegion) lowercaseRegion = userRegion.toLowerCase();

  return (
    <>
      {item?.region?.includes(lowercaseRegion) === true ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CriticalIssue', {
              index,
              Userregion: lowercaseRegion,
            });
          }}>
          <View
            style={styles.ContentWrapper}
            key={index}
            onLayout={items => {
              const layout = items.nativeEvent.layout;

              dataSourceCords[index] = layout.y;
              setDataSourceCords(dataSourceCords);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={[styles.criticalW, styles.shadowCritical]}>
                <Image
                  source={{uri: item?.icon}}
                  style={{width: 36, height: 36}}
                />
              </View>
              <Text
                style={{
                  fontSize: 10,
                  width: '60%',
                  paddingLeft: 5,
                  // paddingRight: 10,
                }}>
                {item?.heading}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : lowercaseRegion === null ||
        lowercaseRegion === undefined ||
        lowercaseRegion === '' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CriticalIssue', {
              index,
              Userregion: lowercaseRegion,
            });
          }}>
          <View
            style={styles.ContentWrapper}
            key={index}
            onLayout={items => {
              const layout = items.nativeEvent.layout;
              dataSourceCords[index] = layout.y;
              setDataSourceCords(dataSourceCords);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={[styles.criticalW, styles.shadowCritical]}>
                <Image
                  source={{uri: item?.icon}}
                  style={{width: 36, height: 36}}
                />
              </View>
              <Text
                style={{
                  fontSize: 10,
                  width: '60%',
                  paddingLeft: 5,
                  // paddingRight: 10,
                }}>
                {item?.heading}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};
