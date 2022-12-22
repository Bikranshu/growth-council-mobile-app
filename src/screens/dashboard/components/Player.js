import React, {useEffect, useState} from 'react';
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
  Button,
  Modal,
  Pressable,
  Alert,
} from 'react-native';

import {Thumbnail} from 'react-native-thumbnail-video';

import YoutubePlayer from '../../../shared/youtube';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;
const modalContainerWidth = win.width;

const Player = props => {
  const {item, file, videoLink} = props;

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.ContentWrapper}>
        <Thumbnail
          url={item?.file}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.title}> Content Library</Text>

                <View
                  style={{
                    width: '100%',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}>
                  <YoutubePlayer videoId={videoLink} />
                </View>
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textS}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ContentWrapper: {
    width: contentContainerWidth,
    height: 200,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  centeredView: {
    flex: 1,
    // marginTop: 22,
  },
  modalView: {
    width: modalContainerWidth,
    height: 350,
    backgroundColor: 'white',
    padding: 10,
    // shadowColor: '#000',

    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 60,
    backgroundColor: '#2196F3',
  },
  textS: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    color: PRIMARY_TEXT_COLOR,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default Player;
