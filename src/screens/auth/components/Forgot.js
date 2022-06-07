import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from 'react-native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {CommonStyles, Colors, Typography} from '../../../theme';
import Spinner from '../../../shared/spinner';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import ToastMessage from '../../../shared/toast';
import Footer from '../../../shared/footer';

const screenHeight = Math.round(Dimensions.get('window').height);

const forgotSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
});

const ForgotForm = props => {
  const {navigation, error, loading, forgotPassword} = props;

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
  } = useFormik({
    validationSchema: forgotSchema,
    initialValues: {email: ''},
    onSubmit: async values => {
      await forgotPassword(values).then(response => {
        if (response?.payload?.code === 200) {
          navigation.navigate('SignIn');
          ToastMessage.show('Email sent successfully to reset password.');
        } else {
          ToastMessage.show(response?.payload?.response);
        }
      });
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/img/GILCouncil.jpg')}
            style={{width: '80%', height: 50}}
            resizeMode="contain"
          />
          <View style={styles.header}>
            <Text style={styles.headingText1}>Reset Password</Text>

            <Text style={styles.headingText2}>
              To reset your password, please enter your email.
            </Text>
          </View>
          <View style={styles.body}>
            <FlatTextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onFocus={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
            />
          </View>

          <View style={styles.message}>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          {loading && <Spinner />}

          <View style={styles.submitButtonWrapper}>
            <Button style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Reset Password</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 30,
  },
  body: {
    width: '80%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    ...CommonStyles.message,
    margin: 15,
  },
  headingText1: {
    fontFamily: Typography.FONT_BOLD,
    fontSize: 20,
    color: 'black',
    marginTop: 20,
  },
  headingText2: {
    fontFamily: Typography.FONT_NORMAL,
    marginTop: 10,
    textAlign: 'center',
  },
  submitButtonWrapper: {
    ...CommonStyles.buttonWrapper,
  },
  submitButton: {
    width: '90%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRACTICE_COLOR,
    height: 56,
    marginBottom: 10,
    marginTop: 10,
  },
  submitButtonText: {
    ...CommonStyles.buttonText,
  },
  errorText: {
    ...CommonStyles.errorText,
  },
  successText: {
    ...CommonStyles.successText,
  },
});

export default ForgotForm;
