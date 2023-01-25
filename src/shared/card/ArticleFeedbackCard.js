import React, {useEffect, useState} from 'react';
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

import {Colors, Typography} from '../../theme';
import {useFormik} from 'formik';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToastMessage from '../toast';
import Loading from '../loading';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAsyncStorage} from '../../utils/storageUtil';
import {ARTICLE_LIKE, USER_NAME} from '../../constants';

const contentLibraryDetailSchema = Yup.object().shape({
  //   display_name: Yup.string().required('Name is required.'),
  //   first_name: Yup.string().required('First name is required.'),
  //   last_name: Yup.string().required('Last Name is required.'),
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
});

const ArticleFeedbackCard = props => {
  const {
    // isTrue,
    // handleValue,
    article,
    articleLoading,
    articleError,
    ContentLibraryArticle,
    contentLibraryDetails,
    fetchContentLibraryDetail,
  } = props;

  let likes = Number(contentLibraryDetails?.likes);
  let dislikes = Number(contentLibraryDetails?.dislikes);
  if (isNaN(likes)) likes = 0.0;
  if (isNaN(dislikes)) dislikes = 0.0;

  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const [ARTICLE, setARTICLE] = useState();
  const [likeEnabled, setLikeEnabled] = useState(false);
  const [likeDisable, setLikeDisable] = useState(false);
  const [dislikeEnabled, setDislikeEnabled] = useState(false);
  const [dislikeDisable, setDislikeDisable] = useState(false);
  const [hideShow, setHideShow] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);

  useEffect(() => {
    setLikeCount(likes);
    setDislikeCount(dislikes);
  }, [contentLibraryDetails]);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      id: contentLibraryDetails?.ID,
      action: '',
      email: '',
      content: '',
    },
    onSubmit: async values => {
      console.log({values});
      await ContentLibraryArticle(values).then(async response => {
        if (response?.payload?.code === 200) {
          ToastMessage.show(response?.payload?.data);
          fetchContentLibraryDetail(contentLibraryDetails?.ID);
        }
      });
      resetForm();
    },
  });
  const articlelikeSwitch = () => {
    setLikeCount(likeEnabled === false ? likeCount + 1 : likeCount - 1);
    setFieldValue('id', contentLibraryDetails?.ID);
    setFieldValue('action', 'like');
    setLikeEnabled(!likeEnabled);
    setDislikeDisable(!dislikeDisable);
    setSubmitBtn(!submitBtn);
    setDislikeEnabled(false);
  };

  const articledislikeSwitch = () => {
    setFieldValue('id', contentLibraryDetails?.ID);
    setDislikeCount(
      dislikeEnabled === false ? dislikeCount + 1 : dislikeCount - 1,
    );
    setFieldValue('action', 'dislike');
    setDislikeEnabled(!dislikeEnabled);
    setLikeDisable(!likeDisable);
    setLikeEnabled(false);
    setSubmitBtn(!submitBtn);
  };

  return (
    <>
      {!hideShow && (
        <View style={styles.articleContainer}>
          <Text style={styles.articleTitle}>Was this article helpful?</Text>
          <View style={styles.articleContainerDivider} />
          <View style={styles.articleButtonsContainer}>
            <View style={styles.singleButtonContainer}>
              <TouchableOpacity
                style={[
                  likeEnabled === false
                    ? likeDisable === true
                      ? styles.disabledButton
                      : styles.checkButton
                    : styles.checkButton1,
                ]}
                disabled={likeDisable}
                onPress={articlelikeSwitch}>
                <Ionicons
                  name="happy"
                  color={
                    likeEnabled === false
                      ? likeDisable === true
                        ? Colors.LIGHTGREY
                        : Colors.SILVERGREY
                      : Colors.PRIMARY_BACKGROUND_COLOR
                  }
                  size={18}
                />
                <Text
                  style={[
                    likeEnabled === false
                      ? likeDisable === true
                        ? styles.disableButtonText
                        : styles.checkButtonText
                      : styles.checkButtonText1,
                  ]}>
                  Like
                </Text>
                <Text
                  style={[
                    likeEnabled === false
                      ? likeDisable === true
                        ? styles.disableButtonText
                        : styles.checkButtonText
                      : styles.checkButtonText1,
                  ]}>
                  {likeCount}
                </Text>
              </TouchableOpacity>
            </View>
            {articleLoading && <Loading />}
            <View style={styles.singleButtonContainer}>
              <Pressable
                style={[
                  dislikeEnabled === false
                    ? dislikeDisable === true
                      ? styles.disabledButton
                      : styles.checkButton
                    : styles.dislikeCheckButton,
                ]}
                onPress={articledislikeSwitch}
                disabled={dislikeDisable}>
                <Ionicons
                  name="sad"
                  color={
                    dislikeEnabled === false
                      ? dislikeDisable === true
                        ? Colors.LIGHTGREY
                        : Colors.SILVERGREY
                      : Colors.PRIMARY_BACKGROUND_COLOR
                  }
                  size={18}
                />
                <Text
                  style={[
                    dislikeEnabled === false
                      ? dislikeDisable === true
                        ? styles.disableButtonText
                        : styles.checkButtonText
                      : styles.checkButtonText1,
                  ]}>
                  Dislike
                </Text>
                <Text
                  style={[
                    dislikeEnabled === false
                      ? dislikeDisable === true
                        ? styles.disableButtonText
                        : styles.checkButtonText
                      : styles.checkButtonText1,
                  ]}>
                  {dislikeCount === NaN ? '' : dislikeCount}
                </Text>
              </Pressable>
            </View>
          </View>

          {dislikeEnabled === true && (
            <View style={{marginTop: 20}}>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View>
                  <Text style={{color: Colors.PRIMARY_BACKGROUND_COLOR}}>
                    Your email (optional) :
                  </Text>
                  <TextInput
                    multiline={true}
                    style={[styles.textarea]}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onFocus={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View>
                  <Text
                    style={{
                      color: Colors.PRIMARY_BACKGROUND_COLOR,
                      marginTop: 10,
                    }}>
                    You can leave feedback :
                  </Text>
                  <TextInput
                    multiline={true}
                    style={styles.textarea1}
                    value={values.content}
                    onChangeText={handleChange('content')}
                    onFocus={handleBlur('content')}
                    error={errors.content}
                    touched={touched.content}
                  />
                </View>
              </TouchableWithoutFeedback>

              <Text
                style={{color: Colors.PRIMARY_BACKGROUND_COLOR, marginTop: 20}}>
                We will use your feedback to improve this article
              </Text>
            </View>
          )}
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable
              onPress={async () => {
                handleSubmit();
                setHideShow(true);
                await analytics().logEvent('article_button_clicked', {
                  button_name: 'Submit',
                  article_value: values.action,
                  page_name: 'Content library details',
                });
              }}
              disabled={!submitBtn}
              style={[
                dislikeEnabled === true || likeEnabled === true
                  ? styles.button1
                  : styles.button,
              ]}>
              <Text
                style={[
                  dislikeEnabled === true || likeEnabled === true
                    ? styles.buttonText1
                    : styles.buttonText,
                ]}>
                Submit
              </Text>
            </Pressable>
          </View>
          <Text style={{color: Colors.PRIMARY_BACKGROUND_COLOR, marginTop: 10}}>
            View: {contentLibraryDetails?.views}
          </Text>
        </View>
      )}

      {hideShow && <></>}
    </>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    paddingVertical: 20,
    marginBottom: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: Colors.TERTIARY_BLUE,
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
  disabledButton: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.PRIMARY_BACKGROUND_COLOR,
    borderWidth: 2,
  },
  checkButton: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  checkButton1: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.GREEN,
  },
  dislikeCheckButton: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.RED,
  },
  checkButtonText: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 13,
    color: 'black',
  },
  disableButtonText: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 13,
    color: Colors.PRIMARY_BACKGROUND_COLOR,
    opacity: 0.6,
  },
  checkButtonText1: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 13,
    color: Colors.PRIMARY_BACKGROUND_COLOR,
  },

  feedbackContainer: {
    height: 120,
    marginBottom: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: Colors.TERTIARY_BLUE,
  },

  textarea: {
    padding: 10,
    fontSize: 16,
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 5,
    borderColor: Colors.PRIMARY_BACKGROUND_COLOR,
    color: Colors.PRIMARY_BACKGROUND_COLOR,
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
    borderColor: Colors.PRIMARY_BACKGROUND_COLOR,
    color: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  buttonWrapper: {
    width: 200,
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },

  button1: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  buttonText: {
    color: Colors.PRIMARY_BACKGROUND_COLOR,
    fontSize: 14,
  },
  buttonText1: {
    color: 'black',
    fontSize: 14,
  },
});

export default ArticleFeedbackCard;
