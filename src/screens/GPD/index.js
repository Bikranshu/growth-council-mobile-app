import React, {useCallback, useState} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import HTMLView from 'react-native-htmlview';
import {CommonStyles, Colors, Typography} from '../../theme';

const GPDScreen = props => {
//   const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [modalVisible, setModalVisible] = useState(false);

//   const toggleNumberOfLines = () => {
//     //To toggle the show text or hide it
//     setTextShown(!textShown);
//   };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  
  const description = "The Growth Innovation Leadership Council's mission ";
  const longText =
    'Text is also commonly used to refer to a text message or to send a text message. Text has several other senses as a noun. Text refers to the actual words written in a book, newspaper, blog post, or any other written work. Pictures, charts, and other images are not text. Text could be movies, scripts, paintings, songs, political cartoons, advertisements and maps. If we can look at something with words and sentences, explore it, find layers of meaning in it, and draw information and conclusions from it, you`re looking at a text.';
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.privacy}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Growth Pipeline Dialogue</Text>
              <View style={styles.titleBorder}></View>
            </View>
            <View>
              <HTMLView
                value={description}
                textComponentProps={{
                  style: {
                    fontSize: 16,
                    paddingBottom: 30,
                    textAlign: 'justify',
                  },
                }}
              />
            </View>

            <View>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={2}
                style={{lineHeight: 21}}>
                {longText}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text>'Read More...' </Text>
              </TouchableOpacity>

              {/* {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{lineHeight: 21, marginTop: 10}}>
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            ) : null} */}
            </View>
          </View>
        </View>
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
              marginTop: 22,
            }}>
            <View
              style={{
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
                  margin: 15,
                }}>
                <Text
                  style={{
                    padding: 15,
                    fontSize: 18,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
              <Text
                // onTextLayout={onTextLayout}
                // numberOfLines={textShown ? undefined : 2}
                style={{lineHeight: 21, marginTop: 30}}>
                {longText}
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
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

export default GPDScreen;
const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    paddingBottom: 20,
  },
  header: {
    ...CommonStyles.header,
    marginTop: Platform.OS === 'ios' ? 120 : 62,
    width: '100%',
    marginLeft: 32,
    marginRight: 32,
  },
  privacy: {
    padding: 30,
  },
  title: {
    marginBottom: 30,
  },
  titleText: {
    color: '#000',
    fontSize: 24,
    paddingBottom: 20,
    fontWeight: '600',
  },
  titleBorder: {
    height: 5,
    width: 50,
    backgroundColor: 'rgba(24,56,99,1)',
  },
  aboutImage: {
    marginBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  backgroundText: {
    padding: 30,
    flex: 1,
    backgroundColor: '#1f71cc',
  },
  backgroundTitle: {
    paddingBottom: 30,
  },
  backgroundTitleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 30,
  },
  backgroundTitleBorder: {
    height: 5,
    width: 50,
    backgroundColor: '#fff',
  },
  backgroundParagraph: {
    color: '#fff',
  },
  cta: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    ...CommonStyles.button,
    height: 60,
    width: 380,
    backgroundColor: Colors.SECONDARY_BUTTON_COLOR,
  },
  buttonText: {
    ...CommonStyles.buttonText,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 15,
  },
  iconImage: {
    width: 300,
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
  },
  paragraph: {
    fontSize: 14,
  },
  plainButton: {
    width: '70%',
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  plainButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
  },
  poweredBy: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
});
