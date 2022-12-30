import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {Colors} from '../../theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ArticleFeedbackCard = props => {
  const {isTrue, handleValue} = props;
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  return (
    <>
      <View style={styles.articleContainer}>
        <Text style={styles.articleTitle}>Was this article helpful?</Text>
        <View style={styles.articleContainerDivider} />
        <View style={styles.articleButtonsContainer}>
          <View style={styles.singleButtonContainer}>
            <Pressable
              style={[
                likeCount === 0 ? styles.checkButton : styles.checkButton1,
              ]}
              onPress={() => {
                handleValue(true),
                  setLikeCount(likeCount + 1),
                  setDislikeCount(0);
              }}>
              {/* {isTrue && <FeatherIcon name="check" color="#62C1EB" />} */}
              <Ionicons
                name="happy"
                color={likeCount === 0 ? '#899499' : 'white'}
                size={18}
              />
              <Text
                style={[
                  likeCount === 0
                    ? styles.checkButtonText
                    : styles.checkButtonText1,
                ]}>
                Like
              </Text>
              <Text
                style={[
                  likeCount === 0
                    ? styles.checkButtonText
                    : styles.checkButtonText1,
                ]}>
                {likeCount}
              </Text>
            </Pressable>
          </View>
          <View style={styles.singleButtonContainer}>
            <Pressable
              style={[
                dislikeCount === 0
                  ? styles.checkButton
                  : styles.dislikeCheckButton,
              ]}
              onPress={() => {
                handleValue(true),
                  setDislikeCount(dislikeCount + 1),
                  setLikeCount(0);
              }}>
              {/* {!isTrue && <FeatherIcon name="check" color="#62C1EB" />} */}
              <Ionicons
                name="sad"
                color={dislikeCount === 0 ? '#899499' : 'white'}
                size={18}
              />
              <Text
                style={[
                  dislikeCount === 0
                    ? styles.checkButtonText
                    : styles.checkButtonText1,
                ]}>
                Dislike
              </Text>
              <Text
                style={[
                  dislikeCount === 0
                    ? styles.checkButtonText
                    : styles.checkButtonText1,
                ]}>
                {dislikeCount}
              </Text>
            </Pressable>
          </View>
        </View>
        {dislikeCount !== 0 && (
          <View style={{marginTop: 20}}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <View>
                <Text style={{color: 'white'}}>Your email (optional) :</Text>
                <TextInput multiline={true} style={[styles.textarea]} />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <View>
                <Text style={{color: 'white', marginTop: 10}}>
                  Your can leave feedback :
                </Text>
                <TextInput multiline={true} style={styles.textarea1} />
              </View>
            </TouchableWithoutFeedback>

            <Text style={{color: 'white', marginTop: 20}}>
              We will use your feedback to improve this article
            </Text>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Send Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    paddingVertical: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#62C1EB',
  },
  articleTitle: {
    marginLeft: 15,
    fontFamily: 'SFProText-SemiBold',
    color: Colors.PRIMARY_BACKGROUND_COLOR,
    textAlign: 'center',
  },
  articleContainerDivider: {
    width: '100%',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#DBD7D7',
  },
  articleButtonsContainer: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkButton: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  checkButton: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  checkButton1: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#3BB143',
  },
  dislikeCheckButton: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#7B1818',
  },
  checkButtonText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    color: 'black',
  },
  checkButtonText1: {
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    color: 'white',
  },

  feedbackContainer: {
    height: 120,
    marginBottom: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#62C1EB',
  },

  textarea: {
    padding: 10,
    fontSize: 16,
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 5,
    borderColor: 'white',
    color: 'white',
  },
  textarea1: {
    minHeight: 100,
    height: 'auto',
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'top',

    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    borderColor: 'white',
    color: 'white',
  },
  buttonWrapper: {
    width: 200,
    marginTop: 20,
  },
  button: {
    width: '60%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#02B0F0',
    height: 56,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default ArticleFeedbackCard;
