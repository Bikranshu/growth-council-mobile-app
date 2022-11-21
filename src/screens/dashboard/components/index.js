import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import moment from 'moment';
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native';

import analytics from '@react-native-firebase/analytics';
import Material from 'react-native-vector-icons/MaterialIcons';
import PillarList from './PillarList';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';
import Footer from '../../../shared/footer';
import ToastMessage from '../../../shared/toast';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import Loading from '../../../shared/loading';
import {useFocusEffect} from '@react-navigation/native';

import {isTokenExpired} from '../../../utils/jwtUtil';

import messaging from '@react-native-firebase/messaging';

import {
  GROWTH_COMMUNITY_ID,
  GROWTH_CONTENT_ID,
  USER_REGION,
} from '../../../constants';

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

    deleteConnections,
    deleteConnectionLoading,
    deleteConnectionError,
    deleteMemberByIdentifier,
    cleanDeleteMember,

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
    dailyQuoteError,
    fetchOneDailyQuote,
    cleanDailyQuote,
  } = props;

  let region = profile?.user_meta?.region;
  if (typeof region === 'undefined' || region === null) {
    region = '';
  } else {
    region = profile?.user_meta?.region[0];
  }

  const [memberConnection, setMemberConnection] = useState([]);
  const [deleteConnect, setDeleteConnect] = useState([]);
  const [hideCritical, setHideCritical] = useState(false);

  const [dataSourceCords, setDataSourceCords] = useState(criticalIssue);
  const [ref, setRef] = useState(null);
  const navigation = useNavigation();

  let string = region;
  if (string) string = string.toLowerCase();

  let regionUser = profile?.user_meta?.region;
  if (typeof regionUser === 'undefined' || regionUser === null) {
    regionUser = '';
  } else {
    regionUser = profile?.user_meta?.region[0];
  }

  const [userRegion, setUserRegion] = useState(region);

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
  //   useEffect(() => {
  //     fetchAllUpcomingEvent();
  //   }, []);

  useEffect(() => {
    fetchAllPillarSlider();
  }, []);

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

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setMemberConnection(communityMembers);
    setDeleteConnect(communityMembers);
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

  const deleteMemberByMemberID = async (memberID, index) => {
    const response = await deleteMemberByIdentifier({member_id: memberID});
    if (response?.payload?.code === 200) {
      let items = [...deleteConnect];
      let item = {...items[index]};
      item.connection = true;
      items[index] = item;
      setDeleteConnect(items);
      fetchAllCommunityMember({
        s: '',
        sort: 'Desc',
        region: regionUser,
      });
      ToastMessage.show('You have successfully deleted.');
    } else {
      toast.closeAll();
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

                  await analytics().logEvent('dashboard', {
                    item: item?.user_meta?.first_name,
                    description: 'Dashboard Member Connection',
                  });
                }}>
                <Ionicons name="add-circle" size={20} color="#B2B3B9" />
              </TouchableOpacity>
            )}
            {memberConnection[index]?.connection && (
              <View style={{flexDirection: 'row'}}>
                <Material name="check-circle" size={20} color="#14A2E2" />
                {/* <TouchableOpacity
                  onPress={async () => {
                    deleteMemberByMemberID(item.ID, index);
                  }}>
                  <AntDesign
                    name="deleteuser"
                    size={20}
                    color="#14A2E2"
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity> */}
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
      <View style={[styles.middleWrapper, styles.shadowContent]}>
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
          onPress={() =>
            navigation.navigate('ContentLibraryDetail', {
              id: item?.ID,
              title: item?.post_title,
            })
          }>
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

            await analytics().logEvent(item?.title, {
              id: item.ID,
              item: item.title,
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
    let lowercaseRegion = '';
    if (userRegion) lowercaseRegion = userRegion.toLowerCase();

    // if (userRegion === 'MEASA') lowercaseRegion = 'apac';
    // if (
    //   userRegion === '' ||
    //   userRegion === 'AMERICAS' ||

    //   typeof userRegion === 'undefined' ||
    //   userRegion === null
    // )
    //   lowercaseRegion = 'north-america';

    return (
      <>
        {lowercaseRegion === item?.region ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CriticalIssue', {
                index,
                Userregion: lowercaseRegion,
              });
            }}>
            {setHideCritical(lowercaseRegion === item?.region ? true : false)}
            {/* {console.log("hello", index)} */}

            <View
              style={styles.ContentWrapper}
              key={index}
              onLayout={items => {
                const layout = items.nativeEvent.layout;

                dataSourceCords[index] = layout.y;
                setDataSourceCords(dataSourceCords);

                console.log('height:', layout.height);
                console.log('width:', (dataSourceCords[index] = layout.y));

                console.log('y:', layout.y);
              }}
              onScroll={e => setPos(e.nativeEvent.contentOffset.y)}>
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
              }}
              onScroll={e => setPos(e.nativeEvent.contentOffset.y)}>
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
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView
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
          flexGrow: 1,
          backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        }}>
        <View>
          <ImageBackground
            style={{
              width: '100%',
              height: (Dimensions.get('screen').height - 80) / 3,
              paddingTop: Dimensions.get('screen').height / 10,
            }}
            source={require('../../../assets/img/appBG.png')}>
            <View style={styles.pillar}>
              <PillarList
                pillarSliders={pillarSliders}
                navigation={navigation}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={{height: 60}} />
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
        {deleteConnectionLoading && (
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
                  renderItem={_renderItem}
                />
              </View>
            </View>
          )}
        <View style={styles.content}>
          {hideCritical && (
            <Text style={styles.title}>
              {criticalIssue?.critical_issue_mobile_title}
            </Text>
          )}
          <View
            ref={ref => {
              setRef(ref);
            }}>
            <FlatList
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              data={criticalIssue?.critical_issue_mobile_lists}
              renderItem={_renderCritical}
            />
          </View>
        </View>
      </ScrollView>
      <BottomNav {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    width: '100%',
    marginBottom: 40,
  },
  pillar: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 65 : 50,
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
