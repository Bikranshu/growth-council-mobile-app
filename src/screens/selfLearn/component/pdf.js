import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  PermissionStatus,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';
import ToastMessage from '../../../shared/toast';
import RNFetchBlob from 'react-native-blob-util';

const pdf = props => {
  const {navigation, route} = props;

  const source = {uri: route.params.paramsFile, cache: true};

    const fileUrl = route.params.paramsFile;

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
              '/file_'+
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
        //   .progress((received, total) => {
        //     console.log('progress', received / total);
        //   })

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
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
        renderActivityIndicator={() => <ActivityIndicator size={40} />}
      />
      
      <TouchableOpacity style={styles.buttonWrapper} onPress={checkPermission}>
        <Text style={styles.text}>Download File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default pdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonWrapper: {
    width: '50%',
    padding: 5,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#F26722',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
});
