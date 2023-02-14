import React, {useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import {
  useFocusEffect,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {Button} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import {BubblesLoader} from 'react-native-indicator';
import analytics from '@react-native-firebase/analytics';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAuthentication} from '../../../context/auth';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const signInSchema = Yup.object().shape({
  username: Yup.string().required('Email or Username is required.'),
  password: Yup.string().required('Password is required.'),
});

const SignInForm = props => {
  const {navigation} = props;

  const [hidePass, setHidePass] = useState(true);

  const {loading, setLoading, message, setMessage, signIn, userCountry} =
    useAuthentication();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
  } = useFormik({
    validationSchema: signInSchema,
    initialValues: {username: '', password: ''},
    onSubmit: async values => {
      await signIn(values);
    },
  });

  const areAllFieldsFilled = values.username != '' && values.password != '';

  // const postToAPI = async data => {
  //   return axios.get(
  //     `${API_URL}/pd/fcm/subscribe?api_secret_key=s3D6nHoU9AUw%jjTHy0K@UO)&user_email=${data.email}&device_token=${data.token}&subscribed=UserNotification`,
  //   );
  // };

  useFocusEffect(
    useCallback(() => {
      setMessage(null);
      ``;
      setLoading(false);
    }, []),
  );

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, height: screenHeight + 100}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/img/splash-screen.png')}
          resizeMode="cover">
          <View style={{height: '15%'}} />

          <View>
            <View style={styles.content}>
              <View style={styles.header}>
                <Image
                  style={{width: '80%'}}
                  source={require('../../../assets/img/GILCouncil.jpg')}
                  resizeMode="contain"
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text style={styles.headingText1}>
                  Growth Innovation
                  {'\n'}
                  Leadership Council
                </Text>
                <Text>
                  {'\n'}
                  Login to your account below.
                </Text>
              </View>

              <View style={styles.body}>
                {loading && (
                  <View style={styles.loading1}>
                    <BubblesLoader
                      color={Colors.SECONDARY_TEXT_COLOR}
                      size={60}
                    />
                  </View>
                )}
                <FlatTextInput
                  label="Email or Username*"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onFocus={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                  autoCapitalize="none"
                />
                {errors.username && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.username}
                  </Text>
                )}
                <View>
                  <FlatTextInput
                    label="Password *"
                    value={values.password}
                    secureTextEntry={hidePass}
                    onChangeText={handleChange('password')}
                    onFocus={handleBlur('password')}
                    error={errors.password}
                    touched={touched.password}
                    autoCapitalize="none"
                  />
                  {errors.password && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.password}
                    </Text>
                  )}

                  <Ionicons
                    name={!hidePass ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color={
                      !hidePass
                        ? Colors.PRIMARY_BACKGROUND_ICON_COLOR
                        : Colors.PRIMARY_HEADING_COLOR
                    }
                    onPress={() => setHidePass(!hidePass)}
                    style={{
                      position: 'absolute',
                      top: 15,
                      right: 15,
                    }}
                  />
                </View>
              </View>
              {!message?.success && (
                <View style={styles.message}>
                  <Text style={styles.errorText}>{message?.message}</Text>
                </View>
              )}

              <View style={styles.loginButtonWrapper}>
                <Button
                  style={[
                    !areAllFieldsFilled
                      ? styles.loginButton1
                      : styles.loginButton,
                    loading && {backgroundColor: 'grey'},
                  ]}
                  onPress={() => {
                    handleSubmit();
                    analytics().logEvent('Login', {
                      username: values.username,
                      address: '12345678',
                      test: 'movies',
                      eventName: 'hello event 2/14/2023',
                      sessionName: 'R S',
                    });
                  }}
                  disabled={!areAllFieldsFilled || loading}>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </Button>
              </View>
              <View style={styles.forgotButtonWrapper}>
                <TouchableOpacity>
                  <Text
                    style={styles.forgotButtonText}
                    onPress={() => navigation.navigate('Forgot')}>
                    Reset Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signuptext}>
                <Text>Join Growth Innovation Leadership Council</Text>
                <Text
                  style={{color: '#31ade5', fontWeight: '700'}}
                  onPress={() => navigation.navigate('SignUp')}>
                  {' '}
                  Sign Up{' '}
                </Text>
              </View>
              <View
                style={[
                  styles.signuptext,
                  {marginTop: Platform.OS === 'ios' ? 40 : 80},
                ]}>
                {/* <Ionicons name="help-circle-outline" size={20} color={'#31ade5'}/> */}
                <Text>Need Help? </Text>
                <Text
                  style={{color: '#31ade5', fontWeight: '700'}}
                  onPress={async () => {
                    navigation.navigate('Email', {
                      title: 'Account Assistance',
                    });
                    await analytics().logEvent('signinEmail', {
                      item: 'click email button from login page',
                    });
                  }}>
                  Contact Us
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 20 : 20,
  },
  body: {
    width: '90%',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    paddingLeft: 25,
    height: '100%',
  },
  message: {
    ...CommonStyles.message,
    paddingTop: 0,
  },
  errorText: {
    ...CommonStyles.errorText,
    alignContent: 'center',
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    width: 210,
    marginBottom: 30,
  },
  loginButtonWrapper: {
    ...CommonStyles.buttonWrapper,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRACTICE_COLOR,
    height: 40,
    marginBottom: 15,
    borderRadius: 10,
    width: '50%',
  },
  loginButton1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    height: 40,
    marginBottom: 15,
    borderRadius: 10,
    width: '50%',
  },
  loginButtonText: {
    ...CommonStyles.buttonText,
  },
  forgotButtonWrapper: {
    ...CommonStyles.forgotButtonWrapper,
    marginTop: Platform.OS === 'ios' ? 5 : 15,
  },
  forgotButtonText: {
    ...CommonStyles.forgotButtonText,
  },
  signUpLinkWrapper: {
    ...CommonStyles.linkWrapper,
  },
  signUpButtonText: {
    color: Colors.SECONDARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_MEDIUM,
    paddingLeft: 8,
  },

  signuptext: {
    flexDirection: 'row',
  },
  dropdown: {
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    height: 50,
    borderWidth: 0.3,
    marginTop: 10,
    flexDirection: 'row',
    shadowColor: '#000',
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
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default SignInForm;
