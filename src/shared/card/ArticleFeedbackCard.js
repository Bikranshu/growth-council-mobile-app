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

import {Colors} from '../../theme';
import {useFormik} from 'formik';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToastMessage from '../toast';
import Loading from '../loading';
import * as Yup from 'yup';

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

  const likes = Number(contentLibraryDetails?.likes);
  const dislikes = Number(contentLibraryDetails?.dislikes);

  const [likeCount, setLikeCount] = useState(likes === NaN ? 0 : likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  //   const [articleAction, setArticleAction] = useState('like');
  const [likeEnabled, setLikeEnabled] = useState(false);
  const [likeDisable, setLikeDisable] = useState(false);
  const [dislikeEnabled, setDislikeEnabled] = useState(false);
  const [dislikeDisable, setDislikeDisable] = useState(false);

  useEffect(() => {
    setLikeCount(likes === NaN ? 0 : likes);
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
      await ContentLibraryArticle(values).then(response => {
        console.log(response);
        if (response?.payload?.code === 200) {
          ToastMessage.show(response?.payload?.data);
          fetchContentLibraryDetail(contentLibraryDetails?.ID);
        }
      });
      resetForm();
      //   setLikeEnabled(false);
    },
  });
  const articlelikeSwitch = () => {
    setLikeCount(likeCount + 1);

    setFieldValue('id', contentLibraryDetails?.ID);
    setFieldValue('action', 'like');
    setDislikeDisable(true);
    handleSubmit();

    setLikeEnabled(true);
    setDislikeEnabled(false);
  };

  const articledislikeSwitch = () => {
    setFieldValue('id', contentLibraryDetails?.ID);
    setDislikeCount(dislikeCount + 1);
    setFieldValue('action', 'dislike');
    setLikeDisable(true);

    handleSubmit();

    setDislikeEnabled(true);
    setLikeEnabled(false);
  };

  console.log(contentLibraryDetails?.ID);

  return (
    <>
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
              {/* // onPressIn={articlelikeSwitch}> */}
              {/* {isTrue && <FeatherIcon name="check" color="#62C1EB" />} */}
              <Ionicons
                name="happy"
                color={
                  likeEnabled === false
                    ? likeDisable === true
                      ? 'white'
                      : '#899499'
                    : 'white'
                }
                size={18}
              />
              <Text
                style={[
                  likeEnabled === false
                    ? styles.checkButtonText
                    : styles.checkButtonText1,
                ]}>
                Like
              </Text>
              <Text
                style={[
                  likeEnabled === false
                    ? styles.checkButtonText
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
              {/* {!isTrue && <FeatherIcon name="check" color="#62C1EB" />} */}
              <Ionicons
                name="sad"
                color={
                  dislikeEnabled === false
                    ? dislikeDisable === true
                      ? 'white'
                      : '#899499'
                    : 'white'
                }
                size={18}
              />
              <Text
                style={[
                  dislikeEnabled === false
                    ? styles.checkButtonText
                    : styles.checkButtonText1,
                ]}>
                Dislike
              </Text>
              <Text
                style={[
                  dislikeEnabled === false
                    ? styles.checkButtonText
                    : styles.checkButtonText1,
                ]}>
                {dislikeCount === NaN ? '' : dislikeCount}
              </Text>
            </Pressable>
          </View>
        </View>
        <Text style={{color: 'white', marginTop: 10}}>
          View: {contentLibraryDetails?.views}
        </Text>
        {dislikeEnabled === true && (
          <View style={{marginTop: 20}}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <View>
                <Text style={{color: 'white'}}>Your email (optional) :</Text>
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
            {/* {articleLoading && <Loading />} */}
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <View>
                <Text style={{color: 'white', marginTop: 10}}>
                  Your can leave feedback :
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

            <Text style={{color: 'white', marginTop: 20}}>
              We will use your feedback to improve this article
            </Text>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setFieldValue('id', contentLibraryDetails?.ID);
                  setFieldValue('action', 'dislike');
                  handleSubmit();
                  setDislikeEnabled(false);
                }}>
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
  disabledButton: {
    width: 100,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#B2BEB5',
    color: 'white',
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
