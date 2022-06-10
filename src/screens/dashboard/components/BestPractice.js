import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Linking} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
// import ReactNativeBlobUtil from 'react-native-blob-util';
import RNFetchBlob from 'react-native-blob-util';
import ToastMessage from '../../../shared/toast';
import YoutubePlayer from '../../../shared/youtube';
import Footer from '../../../shared/footer';
import Player from './Player';
import {CommonStyles, Colors, Typography} from '../../../theme';
import BottomNav from '../../../layout/BottomLayout';
import Loading from '../../../shared/loading';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

const BestPractice = props => {
  const {
    route,
    navigation,
    pillarEvents,
    pillarEventLoading,
    pillarEventError,
    fetchAllPillarEvent,
    cleanPillarEvent,
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
  } = props;

  const pillarId = 170;
  const isFocused = useIsFocused();

  const [memberConnection, setMemberConnection] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchAllPillarPOE(pillarId);

      return () => {
        cleanPillarPOE();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchAllPillarEventAsync = async () => {
        await fetchAllPillarEvent(pillarId);
      };
      fetchAllPillarEventAsync();

      return () => {
        cleanPillarEvent();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchAllPillarMemberContentAsync = async () => {
        await fetchAllPillarMemberContent(pillarId);
      };
      fetchAllPillarMemberContentAsync();
      return () => {
        cleanPillarMemberContent();
      };
    }, [isFocused]),
  );

  useEffect(() => {
    setMemberConnection(pillarMemberContents?.members);
  }, [pillarMemberContents?.members]);

  const _renderTopItem = ({item, index}, navigation) => {
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
    const pillarname = 'Growth Content';
    const image = require('../../../assets/img/best-practice-bg.png');
    return (
      <View key={index} style={styles.topWrapper}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EventDetail', {
              id: item.ID,
              title: pillarname,
              image: image,
            })
          }>
          <ImageBackground
            style={{width: '100%', height: 150, borderRadius: 20}}
            source={require('../../../assets/img/best-practice-bg.png')}>
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

  const _renderItem = ({item, index}) => {
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
                color: '#222B45',
              }}>
              {item?.user_meta?.first_name} {item?.user_meta?.last_name}
            </Text>
            <Text style={{fontSize: 6, color: '#030303'}}>
			{item?.user_meta?.Title}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.chatIcon}>
          {/* {!memberConnection[index]?.connection && (
            <TouchableOpacity onPress={() => navigation.navigate('People')}>
              <Ionicons name="add-circle" size={20} color="#B2B3B9" />
            </TouchableOpacity>
          )}
          {memberConnection[index]?.connection && (
            <Material name="check-circle" size={20} color="#14A2E2" />
          )} */}
        </View>
      </View>
    );
  };

  const _renderMiddleItem = ({item, index}, navigation) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (
            item.slug === 'companies-to-action' ||
            item.slug === 'growth-opportunity'
          ) {
            navigation.navigate('Growth Content');
          } else if (item.slug === 'content-library') {
            navigation.navigate('ContentLibrary');
          } else {
            navigation.navigate('CommunityDetail', {
              poeId: item?.term_id,
              pillarId: item?.parent,

              title: 'Growth Content',
              image: require('../../../assets/img/best-practice-bg.png'),
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

            caches;
          } else {
            Alert.alert('Error', 'Storage Permission Not Granted');
          }
        } catch (err) {
          ToastMessage.show(err);
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

  const _renderContentItem = ({item, index}) => {
    const file = item?.file;
    const link = file?.split('=', 2);
    let videoLink = link[1].split('&', 2);
    return <Player {...props} item={item} file={file} videoLink={videoLink} />;
  };

  const _renderExternal = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item?.link)}>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            marginLeft: 20,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: '600', color: 'blue'}}>
            {item?.link}
          </Text>
        </View>
      </TouchableOpacity>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
        <View style={styles.container}>
          {pillarEvents?.length !== 0 &&
            pillarEvents !== null &&
            pillarEvents !== false && (
              <View style={styles.top}>
                <Text style={styles.title}>Growth Content Events</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={pillarEvents}
                    // renderItem={_renderTopItem}
                    renderItem={item => _renderTopItem(item, navigation)}
                  />
                </View>
              </View>
            )}

          <View style={styles.middle}>
            <Text style={[styles.title, {marginLeft: 15}]}>
              Points of Engagement
            </Text>
            {pillarPOELoading && <Loading />}

            <FlatList
              numColumns={4}
              showsHorizontalScrollIndicator={false}
              data={pillarPOEs}
              // renderItem={_renderMiddleItem}
              renderItem={item => _renderMiddleItem(item, navigation)}
            />
          </View>
          {pillarMemberContents?.attachments !== undefined &&
            pillarMemberContents?.attachments !== false && (
              <View style={styles.sectionContainer}>
                <FlatList
                  vertical
                  showsHorizontalScrollIndicator={false}
                  data={pillarMemberContents?.attachments}
                  renderItem={_renderContent}
                />
              </View>
            )}
          {pillarMemberContents?.external_link !== undefined &&
            pillarMemberContents?.external_link !== false &&
            pillarMemberContents?.external_link !== null && (
              <View style={styles.content}>
                <Text style={styles.title}>External Links</Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={pillarMemberContents?.external_link}
                  renderItem={_renderExternal}
                />
              </View>
            )}
          {/* {pillarMemberContents?.members?.length !== 0 && (
            <View style={styles.bottom}>
              <Text style={styles.title}>Best Practices Members</Text>
              <View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={pillarMemberContents?.members}
                  renderItem={_renderItem}
                  // renderItem={item => _renderItem(item, navigation)}
                />
              </View>
            </View>
          )} */}

          {pillarMemberContents?.pillar_contents !== undefined &&
            pillarMemberContents?.pillar_contents !== null &&
            pillarMemberContents?.pillar_contents !== false && (
              <View style={styles.content}>
                <Text style={styles.title}>Growth Content Content</Text>
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
          {/* <Footer /> */}
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
    marginBottom: 60,
  },
  top: {
    marginTop: 20,
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  title: {
    fontFamily: Typography.FONT_SF_BOLD,
    fontSize: 14,
    color: Colors.PRIMARY_TEXT_COLOR,
    marginLeft: 10,
    fontWeight: '700',
  },

  topWrapper: {
    height: 144,
    width: 256,
    marginLeft: 10,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  header: {
    margin: 10,
  },
  headingText1: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    marginTop: 5,
    fontWeight: '600',
    color: 'white',
    fontSize: 12,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_MEDIUM,
    fontWeight: '400',
    color: 'white',
    fontSize: 8,
  },
  headingText: {
    fontSize: 8,
    color: 'white',
  },

  middle: {
    marginTop: 20,
  },
  middleWrapper: {
    width: (Dimensions.get('window').width - 10) / 4,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleW: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
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
    marginTop: 25,
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
    top: 30,
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
    marginTop: 20,
  },
});

export default BestPractice;
