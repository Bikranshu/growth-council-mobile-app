import React, {useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Button} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from '../../../shared/loading';
import ToastMessage from '../../../shared/toast';
import {CommonStyles, Colors, Typography} from '../../../theme';

const emailSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required.'),
  message: Yup.string().required('Message is required.'),
});
const screenHeight = Math.round(Dimensions.get('window').height);
const Email = props => {
  const {
    navigation,

    sendMail,
    sendMailLoading,
    sendMailError,
    sendMailUser,
    cleanSendMail,
  } = props;
  const isFocused = useIsFocused();

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      validationSchema: emailSchema,
      initialValues: {
        subject: '',
        message: '',
        sender: '',
      },
      onSubmit: async values => {
        await sendMailUser(values).then(response => {
          if (response?.payload?.code === 200) {
            navigation.navigate('Dashboard');
            ToastMessage.show('Your message has been sent successfully');
          }
        });
      },
    });

  useEffect(() => {
    return () => {
      cleanSendMail();
    };
  }, [isFocused]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />

      <ScrollView
        // height = screenHeight + 50 because if we put more than 50 then it is hiding backarrow button at top when we scroll.
        contentContainerStyle={{flexGrow: 1, height: screenHeight + 50}}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../../assets/img/splash-screen.png')}
            resizeMode="cover">
            <View style={{height: '15%'}} />

            <View>
              <View style={styles.content}>
                <View
                  style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.headingText1}>New Message</Text>

                  {/* <View style={styles.loginButtonWrapper}> */}
                  <Button style={[styles.loginButton]} onPress={handleSubmit}>
                    <Text style={styles.loginButtonText}>Send</Text>
                  </Button>
                  {/* </View> */}
                </View>
                {sendMailLoading && <Loading />}
                <View style={styles.body}>
                  <View style={{marginTop: 10}}>
                    <Text style={styles.formText}>From:</Text>
                    <TextInput
                      style={{
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: '#D3D3D3',
                        marginTop: 10,
                      }}
                      value={values.sender}
                      onChangeText={handleChange('sender')}
                      onFocus={handleBlur('sender')}
                      error={errors.sender}
                      touched={touched.sender}
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={{marginTop: 10}}>
                    <Text style={styles.formText}>Subject:</Text>
                    <TextInput
                      style={{
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: '#D3D3D3',
                        marginTop: 10,
                      }}
                      multiline={true}
                      numberOfLines={2}
                      placeholder="Type your subject here"
                      value={values.subject}
                      onChangeText={handleChange('subject')}
                      onFocus={handleBlur('subject')}
                      error={errors.subject}
                      touched={touched.subject}
                    />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={styles.formText}>Message:</Text>
                    <TextInput
                      style={{
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: '#D3D3D3',
                        marginTop: 10,
                        textAlignVertical: 'top',
                      }}
                      multiline={true}
                      numberOfLines={15}
                      placeholder="Type your message here"
                      value={values.message}
                      onChangeText={handleChange('message')}
                      onFocus={handleBlur('message')}
                      error={errors.message}
                      touched={touched.message}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </>
  );
};
export default Email;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },

  body: {
    width: '90%',
    justifyContent: 'center',
    marginTop: 30,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    paddingLeft: 25,
    height: '100%',
  },

  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: '700',
    fontSize: 20,
    color: '#0000cd',
  },
  formText: {fontSize: 16, color: 'black', fontWeight: '600'},
  loginButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    width: 200,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#02B0F0',
    height: 40,
    marginRight: 15,
    borderRadius: 10,
    width: 100,
    // width: '50%',
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
});
