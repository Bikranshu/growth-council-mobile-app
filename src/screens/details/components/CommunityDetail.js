import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import {Button, useToast} from 'native-base';
import FloatingButton from '../../../shared/floatingButton';

import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Loading from '../../../shared/loading';
import RNFetchBlob from 'react-native-blob-util';
import LinearGradient from 'react-native-linear-gradient';
import {COACHING_COLOR, COMMUNITY_COLOR} from '../../../theme/colors';

import ToastMessage from '../../../shared/toast';
import {
  GROWTH_COACHING_ID,
  GROWTH_COMMUNITY_ID,
  GROWTH_CONTENT_ID,
} from '../../../constants';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;
const buttonContainerWidth = win.width - 50;

const CommunityDetail = props => {
  const {
    navigation,
    route,
    sessionDetails,
    sessionDetailLoading,
    sessionDetailError,
    fetchSessionDetailByIdentifier,
    cleanSessionDetail,
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
    pillarPOEs,
    pillarPOELoading,
    pillarPOEError,
    fetchAllPillarPOE,
    cleanPillarPOE,

    getSlug,
    getSlugLoading,
    getSlugError,
    GetIdBySlug,
    cleanSlug,

  
  } = props;

  const isFocused = useIsFocused();
  const [emailStatus, setEmailStatus] = useState(false);

  const [memberConnection, setMemberConnection] = useState([]);
  const [slugName, setSlugName] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchSessionDetailByIdentifier(route?.params?.id);
      return () => {
        cleanSessionDetail();
      };
    }, [isFocused]),
  );

  useFocusEffect(
    useCallback(() => {
      fetchAllPOEDetail(route?.params?.poeId);
      return () => {
        cleanPOEDetail();
      };
    }, [isFocused]),
  );

  useFocusEffect(
    useCallback(() => {
      fetchAllPOEEvent(route?.params?.poeId);
      return () => {
        cleanPOEEvent();
      };
    }, [isFocused]),
  );

  useEffect(() => {
    fetchAllPillarMemberContent(route?.params?.pillarId);
  }, [isFocused]);

  useEffect(() => {
    setMemberConnection(pillarMemberContents);
  }, [pillarMemberContents]);

  useFocusEffect(
    useCallback(() => {
      fetchAllPillarPOE(route?.params?.poeId);

      return () => {
        cleanPillarPOE();
      };
    }, [isFocused]),
  );



  //   useEffect(() => {
  //  GetIdBySlug({
  //       slug: poeDetails?.slug,
  //     }).then(response => {
  //       console.log('a', response);
  //     });
  //   }, [poeDetails]);

  //     useEffect(() => {
  //       setSlugName(poeDetails?.slug);
  //     }, [poeDetails]);

  //   const _renderItem = ({item, index}, navigation) => {
  //     return (
  //       <View style={[styles.bottomWrapper, styles.shadowProp]} key={index}>
  //         <TouchableOpacity
  //           onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
  //           <Image
  //             source={{uri: item.avatar}}
  //             style={{
  //               width: '100%',
  //               height: 83,
  //               borderRadius: 10,
  //             }}
  //           />
  //           <View style={{padding: 10, paddingBottom: 20}}>
  //             <Text
  //               style={{
  //                 fontSize: 10,
  //                 fontFamily: Typography.FONT_SF_SEMIBOLD,
  //                 color: Colors.TERTIARY_TEXT_COLOR,
  //               }}>
  //               {item?.user_meta?.first_name} {item?.user_meta?.last_name}
  //             </Text>
  //             <Text style={{fontSize: 6}}>Frost and Sullivan</Text>
  //           </View>
  //         </TouchableOpacity>

  //         {/* <View style={styles.chatIcon}>
  //           <TouchableOpacity onPress={() => navigation.navigate('People')}>
  //             <Ionicons name={'add'} size={15} color="#B1AFAF" />
  //           </TouchableOpacity>
  //         </View> */}
  //       </View>
  //     );
  //   };

  const _renderMiddleItem = ({item, index}, navigation) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (
            item.slug === 'visionary-innovation-content' ||
            item.slug === 'innovation-generator' ||
            item.slug === 'annual-ceo-survey'
          ) {
            navigation.navigate('CommunityDetail', {
              poeId: route?.params?.poeId,
              title: 'Growth Content',
              image: require('../../../assets/img/best-practice-bg.png'),
            });
          } else {
            navigation.navigate('SubPoe', {
              poeId: item?.term_id,
              id: route?.params?.poeId,
            });
          }
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
              fontSize: 10,
              marginHorizontal: 10,
              textAlign: 'center',
              color: '#030303',
            }}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderTopItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

    let backgroundImage = '';
    let pillarname = '';
    switch (
      item?.pillar_categories[0]?.parent ||
      item?.pillar_categories[1]?.parent
    ) {
      case 0:
      case GROWTH_COMMUNITY_ID:
        backgroundImage = require('../../../assets/img/Rectangle2.png');
        pillarname = 'Growth Community';
        break;

      case 0:
      case GROWTH_CONTENT_ID:
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
      <View style={styles.topWrapper}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EventDetail', {
              id: item.ID,
              title: pillarname,
              image: backgroundImage,
            })
          }>
          <ImageBackground
            style={{
              width: '100%',
              height: 190,
              borderRadius: 20,
            }}
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

  const _renderContent = ({item, index}) => {
    const fileUrl = item?.file?.url;

    const checkPermission = async () => {
      if (Platform.OS === 'ios') {
        downloadFile();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to download File',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            downloadFile();
          } else {
            Alert.alert('Error', 'Storage Permission Not Granted');
          }
        } catch (err) {
          ToastMessage.show('++++' + err);
        }
      }
    };

    const downloadFile = () => {
      const {config, fs} = RNFetchBlob;
      const {
        dirs: {DownloadDir, DocumentDir},
      } = RNFetchBlob.fs;
      const isIOS = Platform.OS === 'ios';
      const aPath =
        Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
      // Platform.select({ios: DocumentDir, android: DocumentDir});

      let date = new Date();
      let FILE_URL = fileUrl;

      let file_ext = getFileExtention(FILE_URL);

      file_ext = '.' + file_ext[0];

      const configOptions = Platform.select({
        ios: {
          fileCache: true,
          path:
            aPath +
            '/file_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            file_ext,
          description: 'downloading file...',
        },
        android: {
          fileCache: false,
          addAndroidDownloads: {
            path:
              aPath +
              '/file_' +
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              file_ext,
            description: 'downloading file...',
            notification: true,
            useDownloadManager: true,
          },
        },
      });

      if (isIOS) {
        RNFetchBlob.config(configOptions)
          .fetch('GET', FILE_URL)
          .then(res => {
            console.log('file', res);
            RNFetchBlob.ios.previewDocument('file://' + res.path());
          });
        return;
      } else {
        config(configOptions)
          .fetch('GET', FILE_URL)
          .progress((received, total) => {
            console.log('progress', received / total);
          })

          .then(res => {
            console.log('file download', res);
            RNFetchBlob.android.actionViewIntent(res.path());
          })
          .catch((errorMessage, statusCode) => {
            console.log('error with downloading file', errorMessage);
          });
      }
    };

    const getFileExtention = fileUrl => {
      return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('pdf', {
            paramsFile: item?.file?.url,
            title: item?.file?.title,
          })
        }>
        <View style={styles.attachmentContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <FontAwesomeIcon name="file-pdf-o" size={35} color="#9B9CA0" />
            <Text style={styles.attachmentTitle}>{item?.file?.title}</Text>
          </View>

          <TouchableOpacity
            style={styles.attachmentDownloadButton}
            onPress={checkPermission}>
            <FeatherIcon name="arrow-down" size={20} color="#9B9CA0" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  let backgroundColor = '';
  let title = '';
  const parent = poeDetails?.parent;
  const slug = poeDetails?.slug;
  switch (parent) {
    case GROWTH_CONTENT_ID:
      backgroundColor = Colors.PRACTICE_COLOR;
      title = 'Best Practices';
      break;
    case GROWTH_COMMUNITY_ID:
      backgroundColor = Colors.COMMUNITY_COLOR;
      title = 'Growth Community';
      break;
    case GROWTH_COACHING_ID:
      backgroundColor = Colors.COACHING_COLOR;
      title = 'Growth Coaching';
    case 133:
      backgroundColor = Colors.PRACTICE_COLOR;
  }
  switch (slug) {
    case 'executive-coaching-clinic':
      backgroundColor = Colors.COACHING_COLOR;
      title = 'Growth Coaching';
  }

  let poeDescription = poeDetails?.description;
  if (poeDescription !== undefined) {
    poeDescription = poeDetails?.description;
  } else {
    poeDescription = '';
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView
        style={{
          backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        }}>
        <View style={styles.container}>
          <ImageBackground
            source={{uri: poeDetails?.pillar_detail_image}}
            style={{height: 240, width: '100%'}}></ImageBackground>

          <View style={[styles.icon, styles.shadowProp]}>
            <Image
              source={{uri: poeDetails?.image}}
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              resizeMode="contain"
            />
          </View>

          <ScrollView
            style={[styles.content, {backgroundColor: backgroundColor}]}>
            <View style={styles.contentWrapper}>
              <View style={{paddingHorizontal: 15}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#1E2022',
                    textAlign: 'center',
                    marginTop: 40,
                    marginBottom: 15,
                  }}>
                  {poeDetails.name}
                </Text>

                <HTMLView
                  value={poeDescription}
                  textComponentProps={{
                    style: {
                      fontFamily: Typography.FONT_SF_REGULAR,
                      fontSize: 14,
                      lineHeight: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#77838F',
                      textAlign: 'justify',
                    },
                  }}
                />
              </View>
              
              {poeDetails !== null &&
                pillarPOEs !== null &&
                pillarPOEs !== false &&
                pillarPOEs !== undefined &&
                pillarPOEs?.length !== 0 && (
                  <View style={styles.top}>
                    {/* <Text style={styles.title}> Sub Points of Engagement</Text> */}
                    <FlatList
                      numColumns={4}
                      showsHorizontalScrollIndicator={false}
                      data={pillarPOEs}
                      // renderItem={_renderMiddleItem}
                      renderItem={item => _renderMiddleItem(item, navigation)}
                    />
                  </View>
                )}

              {poeDetails !== null && poeEvents?.length !== 0 && (
                <View style={styles.top}>
                  <Text style={styles.title}> Events</Text>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={poeEvents}
                      renderItem={_renderTopItem}
                    />
                  </View>
                </View>
              )}
              {poeDetails?.parent === 118 &&
                poeDetails?.attachments?.length !== 0 &&
                poeDetails?.attachments !== null && (
                  <View style={styles.sectionContainer}>
                    <FlatList
                      vertical
                      showsHorizontalScrollIndicator={false}
                      data={poeDetails?.attachments}
                      renderItem={_renderContent}
                    />
                  </View>
                )}
              {poeDetails?.slug === 'peer-to-peer-interactions' && (
                <View style={styles.buttonWrapper}>
                  <View style={styles.memberWrapper}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('People', {
                          name: 'arrow-back-sharp',
                          id: poeDetails?.term_id,
                        })
                      }>
                      <ImageBackground
                        style={{width: '100%', height: 160, borderRadius: 20}}
                        source={require('../../../assets/img/people.jpg')}>
                        <LinearGradient
                          colors={['#00000000', '#000000']}
                          style={{height: '100%', width: '100%'}}
                        />
                        <View
                          style={{
                            width: buttonContainerWidth,
                            marginBottom: Platform.OS === 'ios' ? 10 : 10,
                            borderRadius: 10,
                            height: 45,
                            flexDirection: 'row',
                            position: 'absolute',
                            bottom: -5,
                            left: 5,
                          }}>
                          <Ionicons
                            name="people-outline"
                            size={25}
                            color="white"
                            style={{marginLeft: 5}}
                          />
                          <Text
                            style={{
                              fontFamily: Typography.FONT_SF_BOLD,
                              fontSize: 14,
                              color: 'white',
                              alignItems: 'center',
                              paddingLeft: 5,
                            }}>
                            Connect with Growth Council Members
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserList', {
                        name: 'arrow-back-sharp',
                        id: poeDetails?.term_id,
                      })
                    }>
                    <View style={styles.chatbutton}>
                      <Ionicons name="chatbox" size={20} color="white" />
                      <Text style={styles.chatbuttonText}>
                        Chat with Growth Council Members
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {poeDetails?.slug === 'transformational-think-tanks' ||
              poeDetails?.slug === 'mega-trends-workshop' ||
              poeDetails?.slug === 'executive-mindxchange-events' ||
              poeDetails?.slug === 'innovative-center-tours' ? (
                <View style={styles.buttonWrapper}>
                  <View style={styles.btnWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        if (poeDetails?.slug === 'council-virtual-events') {
                          navigation.navigate('LibraryDetail', {
                            resources: 44,
                            itemname: poeDetails?.name,
                          });
                        } else if (
                          poeDetails?.slug === 'transformational-think-tanks'
                        ) {
                          navigation.navigate('LibraryDetail', {
                            resources: 119,
                            itemname: poeDetails?.name,
                          });
                        } else if (
                          poeDetails?.slug === 'mega-trends-workshop'
                        ) {
                          navigation.navigate('LibraryDetail', {
                            resources: 204,
                            itemname: poeDetails?.name,
                          });
                        } else if (
                          poeDetails?.slug === 'executive-mindxchange-events'
                        ) {
                          navigation.navigate('ContentDetail', {
                            resourceId: 35,
                            resourcesName: poeDetails?.name,
                          });
                        } else if (
                          poeDetails?.slug === 'innovative-center-tours'
                        ) {
                          // live= 205 and stgaing= 206
                          navigation.navigate('LibraryDetail', {
                            resources: 206,
                            itemname: poeDetails?.name,
                          });
                        } else {
                          navigation.navigate('ContentDetail', {
                            resourceId: poeDetails?.ID,
                            resourcesName: poeDetails?.name,
                          });
                        }
                      }}>
                      <ImageBackground
                        style={{width: '100%', height: 120, borderRadius: 20}}
                        source={require('../../../assets/img/onDemat.jpg')}>
                        <LinearGradient
                          colors={['#00000000', '#000000']}
                          style={{height: '100%', width: '100%'}}
                        />
                        <View
                          style={{
                            width: buttonContainerWidth,
                            marginBottom: Platform.OS === 'ios' ? 10 : 10,
                            borderRadius: 10,
                            height: 45,
                            flexDirection: 'row',
                            position: 'absolute',
                            bottom: -15,
                            left: 5,
                          }}>
                          <Image
                            source={require('../../../assets/img/ContentIcon_Orange.png')}
                            style={{width: 20, height: 20}}
                            resizeMode="cover"
                          />
                          {/* <Ionicons
                              name="people-outline"
                              size={25}
                              color="white"
                            /> */}
                          <Text
                            style={{
                              fontFamily: Typography.FONT_SF_BOLD,
                              fontSize: 16,
                              color: 'white',
                              alignItems: 'center',
                              paddingLeft: 10,
                              fontWeight: '700',
                            }}>
                            On-Demand Content
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <></>
              )}

              {/* <Footer /> */}
            </View>
          </ScrollView>
        </View>
        {poeDetailLoading && <Loading />}
      </ScrollView>
      <FloatingButton {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center',
    position: 'relative',
  },
  arrow: {
    marginTop: 30,
  },

  title: {
    fontSize: 16,
    fontFamily: Typography.FONT_SF_REGULAR,
    color: Colors.PRIMARY_TEXT_COLOR,
    fontWeight: '650',
    marginLeft: 10,
  },

  icon: {
    width: Platform.OS === 'ios' ? 80 : 80,
    height: Platform.OS === 'ios' ? 80 : 80,
    backgroundColor: 'white',
    borderRadius: 19,
    marginTop: 200,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    width: '98%',
    // borderRadius: 18,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 20,
  },
  contentWrapper: {
    width: '100%',
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
    marginTop: 10,
  },
  middleWrapper: {
    width: (Dimensions.get('window').width - 10) / 4,
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
  bottom: {
    marginTop: 15,
  },
  bottomWrapper: {
    width: Dimensions.get('window').width / 4,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 10,
    backgroundColor: 'white',
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
    fontFamily: Typography.FONT_SF_MEDIUM,
    // fontWeight: '700',
    color: 'white',
    fontSize: 8,
    lineHeight: 8,
    paddingRight: 2,
  },

  growthContent: {
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  //   ContentWrapper: {
  //     height: 206,
  //     width: 364,
  //     marginTop: 20,
  //     marginLeft: 15,
  //     borderRadius: 20,
  //     overflow: 'hidden',
  //   },
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
    marginTop: 20,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
    bottom: 0,
  },
  chatbutton: {
    ...CommonStyles.button,
    width: buttonContainerWidth,
    marginBottom: Platform.OS === 'ios' ? 10 : 10,
    borderRadius: 10,
    height: 45,
    flexDirection: 'row',
    backgroundColor: Colors.PRACTICE_COLOR,
  },

  chatbuttonText: {
    fontFamily: Typography.FONT_SF_BOLD,
    fontSize: 16,
    color: 'white',
    alignItems: 'center',
    paddingLeft: 10,
  },
  memberWrapper: {
    height: 150,
    width: 330,
    marginLeft: 15,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 5,
    marginBottom: 15,
  },
  btnWrapper: {
    height: 120,
    width: 300,
    marginLeft: 15,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 5,
    marginBottom: 15,
  },
  emailButton: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '100%',
    height: 50,
    backgroundColor: COACHING_COLOR,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRegisterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 25,
    borderColor: COACHING_COLOR,
    borderWidth: 2,
    position: 'relative',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  emailButtonText: {
    color: COACHING_COLOR,
  },
});

export default CommunityDetail;
