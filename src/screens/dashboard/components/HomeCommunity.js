import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import moment from 'moment';
import {Linking} from 'react-native';
import {Toast, useToast} from 'native-base';
import RNFetchBlob from 'react-native-blob-util';
import analytics from '@react-native-firebase/analytics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import Player from './Player';
import Loading from '../../../shared/loading';
import ToastMessage from '../../../shared/toast';
import {decodeUserID} from '../../../utils/jwtUtil';
import BottomNav from '../../../layout/BottomLayout';
import FloatingButton from '../../../shared/floatingButton';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {GROWTH_COMMUNITY_ID, JWT_TOKEN} from '../../../constants';
import {emptyContainerRenderData} from '../../../utils/flatlistRenderData';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

const HomeCommunity = props => {
  const {
    profile,
    navigation,
    pillarEvents,
    pillarEventLoading,
    pillarEventError,
    fetchAllPillarEvent,
    cleanPillarEvent,

    communityMembers,
    communityMemberLoading,
    communityMemberError,
    fetchAllCommunityMember,
    cleanCommunityMember,

    pillarPOEs,
    pillarPOELoading,
    pillarPOEError,
    fetchAllPillarPOE,
    cleanPillarPOE,

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

    regionEvents,
    fetchEventRegion,
    cleanEventRegion,
  } = props;

  const pillarId = GROWTH_COMMUNITY_ID;

  let region = profile?.user_meta?.region;
  if (typeof region === 'undefined' || region === null) {
    region = ' ';
  } else {
    region = profile?.user_meta?.region[0];
  }

  let persona = profile?.user_meta?.user_persona;
  if (typeof persona === 'undefined' || persona === null) {
    persona = ' ';
  } else {
    persona = profile?.user_meta?.user_persona[0];
  }

  let string = region;
  if (string) string = string.toLowerCase();

  let regionUser = profile?.user_meta?.region;
  if (typeof regionUser === 'undefined' || regionUser === null) {
    regionUser = ' ';
  } else {
    regionUser = profile?.user_meta?.region[0];
  }

  const [userRegion, setUserRegion] = useState(region);
  const [memberConnection, setMemberConnection] = useState([]);
  const [hideEvents, setHideEvents] = useState(false);

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  useEffect(() => {
    setUserRegion(region);
  }, [profile]);

  // useFocusEffect(
  // 	useCallback(() => {
  // 		fetchEventRegion({
  // 			region: userRegion,
  // 		});
  // 		return () => {
  // 			cleanEventRegion();
  // 		};
  // 	}, [])
  // );

  useEffect(() => {
    fetchEventRegion({
      region: userRegion,
    });
    return () => {
      cleanEventRegion();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchAllPillarPOEAsync = async () => {
        await fetchAllPillarPOE(pillarId);
      };
      fetchAllPillarPOEAsync();

      return () => {
        cleanPillarPOE();
      };
    }, []),
  );

  // useEffect(() => {
  // 	const fetchAllPillarPOEAsync = async () => {
  // 		await fetchAllPillarPOE(pillarId);
  // 	};
  // 	fetchAllPillarPOEAsync();

  // 	return () => {
  // 		cleanPillarPOE();
  // 	};
  // }, []);

  // useFocusEffect(
  // 	useCallback(() => {
  // 		const fetchAllPillarEventAsync = async () => {
  // 			await fetchAllPillarEvent(pillarId);
  // 		};
  // 		fetchAllPillarEventAsync();

  // 		return () => {
  // 			cleanPillarPOE();
  // 		};
  // 	}, [])
  // );

  useEffect(() => {
    const fetchAllPillarEventAsync = async () => {
      await fetchAllPillarEvent(pillarId);
    };
    fetchAllPillarEventAsync();

    return () => {
      cleanPillarPOE();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchAllCommunityMemberAsync = async () => {
        await fetchAllCommunityMember({
          s: '',
          sort: 'Desc',
          region: userRegion,
        });
      };
      fetchAllCommunityMemberAsync();

      return () => {
        cleanCommunityMember();
      };
    }, []),
  );

  //   useEffect(() => {
  //     const fetchAllCommunityMemberAsync = async () => {
  //       await fetchAllCommunityMember({
  //         s: '',
  //         sort: 'Desc',
  //         region: userRegion,
  //       });
  //     };
  //     fetchAllCommunityMemberAsync();

  //     return () => {
  //       cleanCommunityMember();
  //     };
  //   }, []);

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
    if (user === 'undefined' || user === 'null') {
      user = ' ';
    } else {
      user = item?.user_meta?.region[0];
    }

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
                color: '#030303',
              }}>
              {item?.display_name}
            </Text>
            <Text style={{fontSize: 8, color: '#030303', marginTop: 3}}>
              {item?.registered_date}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.chatIcon}>
          {!memberConnection[index]?.connection ? (
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
          ) : (
            <Material name="check-circle" size={20} color="#14A2E2" />
          )}
        </View>
      </View>
    );
  };

  const _renderMiddleItem = ({item, index}, navigation) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate('CommunityDetail', {
            poeId: item?.term_id,
            pillarId: item?.parent,

            title: 'Growth Community',
            image: require('../../../assets/img/Rectangle2.png'),
          });
        }}>
        <View style={styles.middleWrapper}>
          <View style={[styles.middleW, styles.shadowProp]}>
            <Image
              source={{uri: item?.image}}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 8,
              marginHorizontal: 9,
              textAlign: 'center',
              color: '#222B45',
            }}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderTopItem = ({item, index}) => {
    return (
      <RenderTopItemComponent
        item={item}
        index={index}
        setHideEvents={setHideEvents}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />

      <FlatList
        data={emptyContainerRenderData}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}
        renderItem={() => {
          return null;
        }}
        ListHeaderComponent={() => {
          return (
            <View style={styles.container}>
              {regionEvents?.length !== 0 && (
                <View style={styles.top}>
                  {hideEvents && (
                    <Text style={styles.title}>Growth Community Events</Text>
                  )}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    {/* <Text>Render top item flat</Text> */}
                    <FlatList
                      horizontal
                      data={regionEvents}
                      listKey={'regionEvents'}
                      renderItem={_renderTopItem}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
              )}

              {pillarPOELoading && (
                <View style={{marginTop: 40}}>
                  <Loading />
                </View>
              )}
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

              {pillarPOEs?.length !== 0 && (
                <View style={styles.middle}>
                  <Text style={styles.title}>Points of Engagement</Text>

                  <FlatList
                    contentContainerStyle={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: 'red',
                    }}
                    numColumns={4}
                    showsHorizontalScrollIndicator={false}
                    listKey={'pillarPOEs'}
                    data={pillarPOEs}
                    // renderItem={_renderMiddleItem}
                    renderItem={item => _renderMiddleItem(item, navigation)}
                  />
                </View>
              )}

              {communityMembers?.length !== 0 ? (
                <View style={styles.bottom}>
                  <Text style={styles.title}>Welcome New Members</Text>
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
              ) : (
                <></>
              )}
            </View>
          );
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
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    width: '100%',
    marginBottom: 60,
  },
  top: {
    marginTop: 25,
    justifyContent: 'center',
    marginRight: 2,
  },
  title: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    marginLeft: 20,
    color: Colors.PRIMARY_TEXT_COLOR,
    fontWeight: '700',
  },

  topWrapper: {
    height: 180,
    width: 256,
    marginLeft: 15,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 5,
    marginTop: 15,
  },
  header: {
    marginLeft: 10,
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
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_MEDIUM,
    fontWeight: '400',
    color: 'white',
    fontSize: 8,
    lineHeight: 8,
  },
  middle: {
    marginTop: 20,
  },
  middleWrapper: {
    width: Dimensions.get('window').width / 4,
    borderRadius: 20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleW: {
    backgroundColor: 'white',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  headingText3: {
    ...CommonStyles.headingText3,
    fontFamily: Typography.FONT_NORMAL,
    padding: 4,
  },
  bottom: {
    marginTop: 15,
    marginRight: 5,
  },
  bottomWrapper: {
    position: 'relative',
    width: Dimensions.get('window').width / 4,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 2,
    marginBottom: 20,
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
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  content: {
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 10,
  },
  ContentWrapper: {
    height: 210,
    width: contentContainerWidth,
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
  loading1: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
  attachmentContainer: {
    margin: 1,
    width: contentContainerWidth,
    height: 70,
    paddingLeft: 20,
    paddingRight: 8,
    marginRight: 5,
    marginLeft: 15,
    marginTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowColor: Colors.UNDENARY_BACKGROUND_COLOR,
    elevation: 5,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  attachmentTitle: {
    marginLeft: 10,
    fontSize: 14,
    width: '80%',
    fontFamily: 'SFProText-Regular',
    color: Colors.SECONDARY_TEXT_COLOR,
  },
  attachmentDownloadButton: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 15,
  },
});

export default HomeCommunity;

/*
 * Flatlist render top item component
 */
const RenderTopItemComponent = ({item, index, setHideEvents}) => {
  const navigation = useNavigation();
  const actualDate = moment(item.event_start).format('ll').split(',', 3);
  const date = actualDate[0].split(' ', 3);

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

  const pillarname = 'Growth Community';
  const image = require('../../../assets/img/Rectangle2.png');

  useEffect(() => {
    if (
      item?.pillar_categories[0]?.parent === 0 ||
      item?.pillar_categories[0]?.parent === GROWTH_COMMUNITY_ID
    ) {
      setHideEvents(true);
    } else {
      setHideEvents(false);
    }
  }, []);

  if (
    item?.pillar_categories[0]?.parent === 0 ||
    item?.pillar_categories[0]?.parent === GROWTH_COMMUNITY_ID
  ) {
    <View style={styles.topWrapper} key={index}>
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate('EventDetail', {
            id: item.ID,
            title: pillarname,
            image: image,
          });

          await analytics().logEvent(item?.title, {
            id: item.ID,
            item: item.title,
          });
        }}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
          source={require('../../../assets/img/Rectangle2.png')}>
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
    </View>;
  }

  return null;
};
