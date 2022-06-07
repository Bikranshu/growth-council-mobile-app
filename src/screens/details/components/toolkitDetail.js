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
import {Button} from 'native-base';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Player from '../../dashboard/components/Player';
import HTMLView from 'react-native-htmlview';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Loading from '../../../shared/loading';
import RNFetchBlob from 'react-native-blob-util';

import ToastMessage from '../../../shared/toast';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;
const buttonContainerWidth = win.width - 40;

const ToolkitDetails = props => {
  const {
    navigation,
    route,
    poeDetails,
    poeDetailLoading,
    poeDetailError,
    fetchAllPOEDetail,
    cleanPOEDetail,
    pillarPOEs,
    pillarPOELoading,
    pillarPOEError,
    fetchAllPillarPOE,
    cleanPillarPOE,
  } = props;

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      fetchAllPOEDetail(route.params.poeId);
    }, [isFocused]),
  );

  useFocusEffect(
    useCallback(() => {
      fetchAllPillarPOE(route.params.poeId);
      return () => {
        cleanPillarPOE();
      };
    }, [isFocused]),
  );

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

  const _renderMiddleItem = ({item, index}, navigation) => {
    return (
      <TouchableOpacity>
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

  let backgroundColor = '';
  const parent = poeDetails?.parent;
  switch (parent) {
    case 118:
      backgroundColor = Colors.PRACTICE_COLOR;
      break;
    case 117:
      backgroundColor = Colors.COMMUNITY_COLOR;
      break;
    case 119:
      backgroundColor = Colors.COACHING_COLOR;
  }

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
            />
          </View>

          <ScrollView
            style={[styles.content, {backgroundColor: Colors.PRACTICE_COLOR}]}>
            <View style={styles.contentWrapper}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#1E2022',
                  textAlign: 'center',
                  marginTop: 50,
                }}>
                {poeDetails?.name}
              </Text>
              {poeDetailLoading && <Loading />}
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
                  },
                }}
              />
{/* 
              {poeDetails !== null &&
                pillarPOEs !== null &&
                pillarPOEs !== false &&
                pillarPOEs !== undefined &&
                pillarPOEs?.length !== 0 && (
                  <View style={styles.top}>
                    <Text style={styles.title}> Sub Points of Engagement</Text>
                    <FlatList
                      numColumns={4}
                      showsHorizontalScrollIndicator={false}
                      data={pillarPOEs}
                      // renderItem={_renderMiddleItem}
                      renderItem={item => _renderMiddleItem(item, navigation)}
                    />
                  </View>
                )} */}
              {poeDetails?.attachments?.length !== 0 &&
                poeDetails?.attachments !== null &&
                poeDetails?.attachments !== false &&
                poeDetails?.pillar_contents !== undefined && (
                  <View style={styles.sectionContainer}>
                    <FlatList
                      vertical
                      showsHorizontalScrollIndicator={false}
                      data={poeDetails?.attachments}
                      renderItem={_renderContent}
                    />
                  </View>
                )}
             

              {/* <Footer /> */}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
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
    marginTop: 10,
    justifyContent: 'center',
  },
  topWrapper: {
    height: 144,
    width: 256,
    marginLeft: 15,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 5,
    marginTop: 15,
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
    margin: 10,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_REGULAR,
    marginTop: 5,
    fontWeight: '600',
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
    justifyContent: 'space-around',
    marginTop: 30,
  },
  signupbutton: {
    ...CommonStyles.button,
    width: buttonContainerWidth,
    marginBottom: Platform.OS === 'ios' ? 10 : 20,
    borderRadius: 10,
    height: 56,
    flexDirection: 'row',
    backgroundColor: Colors.PRACTICE_COLOR,
  },
  signinbuttonText: {
    fontFamily: Typography.FONT_SF_BOLD,
    fontSize: 18,
    color: 'white',
    alignItems: 'center',
    paddingRight: 50,
  },
});

export default ToolkitDetails;
