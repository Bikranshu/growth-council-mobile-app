import React, {useState, useRef, useCallback} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import {BubblesLoader} from 'react-native-indicator';
import uuid from 'react-native-uuid';
import analytics from '@react-native-firebase/analytics';
import PhoneInput from 'react-native-phone-number-input';
import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import CheckBox from '../../../shared/form/Checkbox';
import ToastMessage from '../../../shared/toast';
import auth from '@react-native-firebase/auth';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signUpSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required.'),
  last_name: Yup.string().required('Last Name is required.'),
  email: Yup.string()
    .email('Please enter valid email.')
    .trim()
    .required('Email Address is Required.'),
  // phone: Yup.string()
  //   .matches(phoneRegExp, 'Phone number is not valid.')
  //   .required('Phone Number is required.'),
  // title: Yup.string().required('Title is required.'),
  // company: Yup.string().required('Company is required.'),
  // country: Yup.string().required('Country is required.'),
  checked: Yup.boolean()
    .required('Please agree to terms and condition for signup.')
    .oneOf([true], 'Please agree to terms and condition for signup.'),
});

const SignUpForm = props => {
  const {
    navigation,
    loading,
    error,
    registerCustomer,
    cleanCustomer,
    setLoading,
  } = props;
  const phoneInput = useRef(null);

  const min = 1;
  const max = 100;
  const rand = min + Math.random() * (max - min);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    setErrors,
    touched,
    isValid,
    setFieldValue,
  } = useFormik({
    validationSchema: signUpSchema,
    initialValues: {
      name: '',
      first_name: '',
      last_name: '',
      username: ``,
      password: uuid.v4(),
      title: '',
      company: '',
      phone: '',
      email: '',
      country: 'United States',
      checked: false,
      firebase_password: uuid.v4(),
    },
    onSubmit: async values => {
      values.name = values.first_name + ' ' + values.last_name;
      values.username = values.first_name + ' ' + values.last_name;

      //   values.email.substring(
      //     0,
      //     values.email.lastIndexOf('@'),
      //   );
      try {
        const response = await auth().createUserWithEmailAndPassword(
          values?.email?.trim(),
          '6AWgM#.Y(fE8Q2=',
        );
        const token = await response.user.getIdToken();
        // const response = await registerCustomer(values);
        console.log(response);
        if (token) {
          await registerCustomer(values).then(response => {
            if (response?.payload?.code === 200) {
              console.log('response', response);
              navigation.navigate('SignIn');
              ToastMessage.show(
                'You have successfully registered. Please wait for admin approval.',
              );
            } else {
              ToastMessage.show(
                'This email address or username is already in use',
              );
            }
          });
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            ToastMessage.show(
              'This email address or username is already in use',
            );
            break;
          case 'auth/argument-error':
            ToastMessage.show('Authentication error. Please try again.');
            break;
          case 'auth/invalid-email':
            ToastMessage.show('Please enter valid email.');
            break;
          case 'auth/user-not-found':
            ToastMessage.show('User not found.');
            break;
          case 'auth/wrong-password':
            ToastMessage.show('Invalid password.');
            break;
        }
      }
    },
  });

  const [checked, setChecked] = React.useState(false);

  const [country, setCountry] = useState('United States');

  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua & Deps',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Rep',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo {Democratic Rep}',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland {Republic}',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea North',
    'Korea South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar, {Burma}',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russian Federation',
    'Rwanda',
    'St Kitts & Nevis',
    'St Lucia',
    'Saint Vincent & the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome & Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad & Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const areAllFieldsFilled =
    values.first_name != '' &&
    values.last_name != '' &&
    values.title != '' &&
    values.company &&
    values.email != '' &&
    values.phone != '' &&
    values.country != '';

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/img/splash-screen.png')}
        resizeMode="cover">
        <View style={{height: '15%'}} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              style={{width: '80%'}}
              source={require('../../../assets/img/GILCouncil.jpg')}
              resizeMode="contain"
            />
            <Text style={styles.headingText1}>
              Join Growth Innovation Leadership Council
            </Text>
          </View>

          {loading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={60} />
            </View>
          )}

          <ScrollView
            style={styles.scrollBox}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.body}>
              <FlatTextInput
                label="First Name *"
                value={values.first_name}
                onChangeText={handleChange('first_name')}
                onFocus={handleBlur('first_name')}
                error={errors.first_name}
                touched={touched.first_name}
              />
              {errors.first_name && (
                <Text style={styles.errorMessage}>{errors.first_name}</Text>
              )}

              <FlatTextInput
                label="Last Name *"
                value={values.last_name}
                onChangeText={handleChange('last_name')}
                onFocus={handleBlur('last_name')}
                error={errors.last_name}
                touched={touched.last_name}
              />

              {errors.last_name && (
                <Text style={styles.errorMessage}>{errors.last_name}</Text>
              )}

              <FlatTextInput
                label="Title *"
                value={values.title}
                onChangeText={handleChange('title')}
                onFocus={handleBlur('title')}
                error={errors.title}
                touched={touched.title}
              />
              {errors.title && (
                <Text style={styles.errorMessage}>{errors.title}</Text>
              )}

              <FlatTextInput
                label="Company *"
                value={values.company}
                onChangeText={handleChange('company')}
                onFocus={handleBlur('company')}
                error={errors.company}
                touched={touched.company}
              />
              {errors.company && (
                <Text style={styles.errorMessage}>{errors.company}</Text>
              )}

              <FlatTextInput
                label="Business Email *"
                value={values.email}
                onChangeText={handleChange('email')}
                onFocus={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}

              <Text style={{marginTop: 20, color: 'black'}}>
                Phone Number *
              </Text>

              <PhoneInput
                ref={phoneInput}
                defaultCode="US"
                // layout="first"
                containerStyle={styles.phoneNumberView}
                textContainerStyle={{paddingVertical: 0}}
                // onChangeFormattedText={text => {
                // setPhoneNumber(text);
                // }}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onFocus={handleBlur('phone')}
                error={errors.phone}
                touched={touched.phone}
              />
              {errors.phone && (
                <Text style={styles.errorMessage}>{errors.phone}</Text>
              )}

              <Text style={{marginTop: 20, color: 'black'}}>Country *</Text>
              <TouchableOpacity
                onPress={() => setIsPickerVisible(true)}
                style={{
                  borderRadius: 5,
                  borderWidth: 0.5,
                  overflow: 'hidden',
                  height: 50,
                  marginTop: 10,
                  marginBottom: 10,
                  justifyContent: 'center',
                  paddingLeft: 20,
                }}>
                <Text style={{fontWeight: 'bold', color: 'gray'}}>
                  {values.country ? values.country : 'Select a Country'}
                </Text>
              </TouchableOpacity>
              {errors.country && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.country}
                </Text>
              )}

              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', flex: 0.2}}>
                  <CheckBox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setFieldValue('checked', !checked);
                      setChecked(!checked);
                    }}
                  />

                  <View style={{flex: 0.9}}>
                    <View>
                      <Text style={{marginTop: 7}}>
                        By clicking submit, I agree to Frost & Sullivan's{' '}
                        <Text
                          style={{color: '#31ade5', fontWeight: '700'}}
                          onPress={() => navigation.navigate('Terms')}>
                          Terms of Use{' '}
                        </Text>
                        and{' '}
                        <Text
                          style={{color: '#31ade5', fontWeight: '700'}}
                          onPress={() => navigation.navigate('Privacys')}>
                          {' '}
                          Privacy Policy*{' '}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>

                {errors.checked && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.checked}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.loginButtonWrapper}>
              <Button
                style={[
                  !areAllFieldsFilled
                    ? styles.loginButton1
                    : styles.loginButton,
                  loading && {backgroundColor: 'grey'},
                ]}
                onPress={handleSubmit}
                disabled={!areAllFieldsFilled || loading}>
                <Text style={styles.loginButtonText}>Join Now</Text>
              </Button>
            </View>

            <View style={styles.signUpLinkWrapper}>
              <View>
                <Text style={{color: Colors.NONARY_TEXT_COLOR}}>
                  Already a Growth Innovation Leadership Council Member?
                </Text>
              </View>

              <View>
                <Text
                  style={styles.signUpButtonText}
                  onPress={() => navigation.navigate('SignIn')}>
                  Click Here
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
      <Modal transparent visible={isPickerVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 300,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsPickerVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Picker
                selectedValue={country}
                mode={'dropdown'}
                // onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                onValueChange={(itemValue, itemIndex) => {
                  if (itemValue !== null) {
                    setFieldValue('country', itemValue);
                    setCountry(itemValue);
                    setErrors({});
                  }
                }}>
                {countries.map((value, index) => {
                  return (
                    <Picker.Item
                      label={value}
                      value={value}
                      style={{fontSize: 12}}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  header: {
    height: 70,
    marginTop: Platform.OS === 'ios' ? 20 : 20,
    marginBottom: 60,
  },
  scrollBox: {
    height: '65%',
    width: '100%',
    marginBottom: 0,
  },
  body: {
    width: '98%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '86%',
    backgroundColor: 'white',
    borderRadius: 18,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
  message: {
    ...CommonStyles.message,
  },
  profileImage: {
    marginBottom: 10,
    height: 50,
    width: 50,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: 22,
    marginTop: 10,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    width: 210,
    textAlign: 'center',
  },
  loginButtonWrapper: {
    ...CommonStyles.buttonWrapper,
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
  },
  loginButton: {
    width: '50%',
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRACTICE_COLOR,
    marginLeft: 5,
  },
  loginButton1: {
    width: '50%',
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    marginLeft: 5,
  },
  loginButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
  },
  signUpLinkWrapper: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  signUpButtonText: {
    color: Colors.PRIMARY_BUTTON_COLOR,
    fontFamily: Typography.FONT_NORMAL,
    zIndex: 10,
    right: 50,
    bottom: 18,
  },

  errorText: {
    ...CommonStyles.errorText,
    textAlign: 'left',
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
  errorMessage: {
    fontSize: 10,
    color: 'red',
  },
  phoneNumberView: {
    width: '100%',
    height: 50,
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default SignUpForm;
