import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
  Button,
  StatusBar,
  Dimensions,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ToastMessage from '../../../shared/toast';
import ReactNativeBlobUtil from 'react-native-blob-util';
import BottomNav from '../../../layout/BottomLayout';
import ArticleFeedbackCard from '../../../shared/card/ArticleFeedbackCard';
import Footer from '../../../shared/footer';
import SearchHeader from '../../../shared/header/SearchHeader';
import {Colors, CommonStyles} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import {BubblesLoader} from 'react-native-indicator';
import WebView from 'react-native-autoheight-webview';
import HTMLView from 'react-native-htmlview';

const ContentLibraryDetail = props => {
  const {
    navigation,
    route,
    contentLibraryDetails,
    contentLibraryDetailsLoading,
    contentLibraryDetailsError,
    fetchContentLibraryDetail,
    cleanContentLibraryDetail,
  } = props;

  const isFocused = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      fetchContentLibraryDetail(route?.params?.id);
      return () => {
        cleanContentLibraryDetail();
      };
    }, [isFocused]),
  );

  const [isTrue, setIsTrue] = useState(true);

  const handleFeedbackChange = value => {
    setIsTrue(value);
  };

  console.log(route.params.id);
  console.log({contentLibraryDetails});

  const _renderItem = ({item, index}) => {
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

            console.log('Storage Permission Granted.');
          } else {
            Alert.alert('Error', 'Storage Permission Not Granted');
          }
        } catch (err) {
          console.log('++++' + err);
        }
      }
    };

    const downloadFile = () => {
      let date = new Date();

      let FILE_URL = fileUrl;

      let file_ext = getFileExtention(FILE_URL);

      file_ext = '.' + file_ext[0];

      const {config, fs} = ReactNativeBlobUtil;
      let RootDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path:
            RootDir +
            '/file_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            file_ext,
          description: 'downloading file...',
          notification: true,
          useDownloadManager: true,
        },
      };
      config(options)
        .fetch('GET', FILE_URL, ToastMessage.show('PDF File Download Started.'))
        .then(res => {
          console.log('res -> ', JSON.stringify(res));
          ToastMessage.show('PDF File Downloaded Successfully.');
        });
    };

    const getFileExtention = fileUrl => {
      return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    };
    return (
		<TouchableOpacity
        onPress={() =>
          navigation.navigate('pdf', {paramsFile: item?.file?.url})
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

  const _renderTagItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ContentTags', {
            itemname: item?.name,
            title: route?.params?.title,
            id: item?.term_id,
          })
        }>
        <View style={styles.tagsContainer}>
          <View style={styles.singleTagContainer}>
            <FeatherIcon
              name="tag"
              size={20}
              color="#9B9CA0"
              style={{marginTop: 5}}
            />
            <Text style={styles.tagTitleText} numberOfLines={2}>
              {item?.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const _renderActionItem = ({item, index}) => {
    return (
      <View style={{marginBottom: 10, flexDirection: 'row'}}>
        <Entypo name="dot-single" size={20} color="black" />

        <Text
          style={{
            fontFamily: 'SFProText-Regular',
            color: Colors.SECONDARY_TEXT_COLOR,
          }}>
          {item?.list}
        </Text>
      </View>
    );
  };
  console.log(contentLibraryDetails?.presenter);
  let video = contentLibraryDetails?.video_url;
  if (video !== undefined) {
    video = contentLibraryDetails?.video_url;
  } else {
    video = '';
  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />

      <View style={styles.bodyContainer}>
        {/* Breadcrumb Section */}
        <View style={styles.breadcrumbContainer}>
          <View style={styles.singleBreadcrumb}>
           
            {route.params.itemname !== undefined && (
              <HTMLView
                value={route.params.itemname}
                textComponentProps={{
                  style: {
                    marginRight: 10,
                    fontFamily: 'SFProText-Medium',
                    fontSize: 8,
                    color: '#B2B3B9',
                  },
                }}
              />
            )}

            <FeatherIcon name="chevron-right" size={10} color="#B2B3B9" />
          </View>
          <View style={{...styles.singleBreadcrumb, flex: 1}}>
            <Text style={styles.activeBreadcrumbText}>
              {route?.params?.title}
            </Text>
          </View>
        </View>

        {/* Main Body Section */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{padding: 25}}
          contentContainerStyle={{paddingBottom: 60}}>
          {contentLibraryDetails?.video_url !== null &&
            contentLibraryDetails?.video_url !== '' && (
              <View style={{height: 180, borderRadius: 10}}>
                <WebView
                  style={{width: '100%', height: 205, marginTop: 10}}
                  allowsFullscreenVideo
                  scrollEnabled={false}
                  webViewStyle={{opacity: 0.99}}
                  automaticallyAdjustContentInsets
                  source={{
                    html: `
          <Html>
            <body>
              ${video}
            </body>
          </Html>
        `,
                  }}
                />
              </View>
            )}
          {contentLibraryDetails?.presenter !== false &&
            contentLibraryDetails?.presenter !== null &&
            contentLibraryDetails?.presenter !== '' && (
              <View style={styles.sectionContainerBorder}>
                <Text style={styles.bodyTitleText}>Presented By:</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: contentLibraryDetails?.presenter_image}}
                    style={styles.userImage}
                  />
                  <View style={{marginLeft: 20}}>
                    <Text style={styles.userNameText}>
                      {contentLibraryDetails?.presenter}
                    </Text>
                  </View>
                </View>
              </View>
            )}

          {contentLibraryDetailsLoading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
            </View>
          )}
          {/* Abstract Section */}
          {contentLibraryDetails?.abstract !== undefined &&
            contentLibraryDetails?.abstract !== '' && (
              <View style={styles.sectionContainer}>
                <Text style={styles.bodyTitleText}>Abstract:</Text>
                <Text style={styles.abstractDescriptionText}>
                  {contentLibraryDetails?.abstract}
                </Text>
              </View>
            )}
          {/* Call To Action Section */}
          {contentLibraryDetails?.call_to_action?.length !== 0 &&
            contentLibraryDetails?.call_to_action !== false && (
              <View style={styles.sectionContainer}>
                <Text style={styles.bodyTitleText}>Call to Action:</Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={contentLibraryDetails?.call_to_action}
                  renderItem={_renderActionItem}
                />
              </View>
            )}

          {/* Attachments Section */}
          {contentLibraryDetails?.attachment?.length !== 0 &&
            contentLibraryDetails?.attachment !== false && (
              <View style={styles.sectionContainer}>
                <Text style={styles.bodyTitleText}>Attachments:</Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={contentLibraryDetails?.attachment}
                  renderItem={_renderItem}
                />
              </View>
            )}

          {/* Tags Section */}
          {contentLibraryDetails?.tags?.length !== 0 && (
            <View style={styles.sectionContainerBorder}>
              <Text style={styles.bodyTitleText}>Tags:</Text>

              <FlatList
                contentContainerStyle={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
                showsVerticalScrollIndicator={false}
                data={contentLibraryDetails?.tags}
                renderItem={_renderTagItem}
              />
            </View>
          )}

          {/* Article Feedback Section */}
          <ArticleFeedbackCard
            isTrue={isTrue}
            handleValue={handleFeedbackChange}
          />

          {/* Footer Section */}
          <Footer />
        </ScrollView>
      </View>

      {/* Bottom Navigation Section */}
      <BottomNav {...props} navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  bodyContainer: {
    ...CommonStyles.container,
    marginTop: 25,
  },
  breadcrumbContainer: {
    marginHorizontal: 25,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.13)',
  },
  singleBreadcrumb: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveBreadcrumbText: {
    marginRight: 10,
    fontFamily: 'SFProText-Medium',
    fontSize: 8,
    color: '#B2B3B9',
  },
  activeBreadcrumbText: {
    marginRight: 10,
    fontFamily: 'SFProText-Medium',
    fontSize: 8,
    color: Colors.TERTIARY_BUTTON_COLOR,
  },
  contentImage: {width: '100%', height: 205, borderRadius: 16},
  sectionContainerBorder: {
    margin: 2,
    marginBottom: 10,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.13)',
    marginTop: 20,
  },
  bodyTitleText: {
    marginBottom: 20,
    fontFamily: 'SFProText-SemiBold',
    color: Colors.PRIMARY_TEXT_COLOR,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 14,
    resizeMode: 'contain',
  },
  userNameText: {
    marginBottom: 10,
    fontFamily: 'SFProText-Medium',
    color: Colors.SECONDARY_TEXT_COLOR,
    width: '75%',
  },
  userInfoText: {
    fontFamily: 'SFProText-Medium',
    color: Colors.SECONDARY_TEXT_COLOR,
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  abstractDescriptionText: {
    flex: 1,
    fontFamily: 'SFProText-Regular',
    lineHeight: 22,
    color: Colors.SECONDARY_TEXT_COLOR,
  },
  attachmentContainer: {
    margin: 1,
    height: 63,
    paddingLeft: 20,
    paddingRight: 8,
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
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleTagContainer: {
    width: (Dimensions.get('window').width - 90) / 2,
    height: 50,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowColor: Colors.UNDENARY_BACKGROUND_COLOR,
    elevation: 5,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  tagTitleText: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'SFProText-Regular',
    fontSize: 9,
    lineHeight: 15,
    color: Colors.SECONDARY_TEXT_COLOR,
  },
  input: {
    height: 45,
    width: '85%',
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  loading1: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default ContentLibraryDetail;
