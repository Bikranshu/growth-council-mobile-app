import React, {useState, useRef, useEffect} from 'react';
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
import {Button} from 'native-base';

import Loading from '../../../shared/loading';
import {useFormik} from 'formik';
import {Picker} from '@react-native-picker/picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {style} from '@mui/system';

const screenHeight = Math.round(Dimensions.get('window').height);

const CountryPopup = props => {
  const {
    navigation,
    route,
    profile,
    profileLoading,
    profileError,
    fetchProfile,
    cleanProfile,
    userLoading,
    updateUser,
  } = props;

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [regionVisible, setRegionVisible] = useState(false);

  //   const [region, setRegion] = useState(countryRegion);
  const [country, setCountry] = useState('United States');
  const [countryRegion, setCountryRegion] = useState('AMERICAS');

  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfile();
    };
    fetchProfileAsync();
  }, []);

  //   const profile = route?.params?.profile;
  //   const userLoading = route?.params?.userLoading;
  //   const updateUser = route?.params?.updateUser;

  console.log(profile);

  let title = profile?.user_meta?.title;
  if (typeof title === 'undefined') {
    title = ' ';
  } else {
    title = profile?.user_meta?.title[0];
  }

  let company = profile?.user_meta?.company;
  if (typeof company === 'undefined') {
    company = ' ';
  } else {
    company = profile?.user_meta?.company[0];
  }

  let Location = profile?.user_meta?.Location;
  if (typeof Location === 'undefined') {
    Location = ' ';
  } else {
    Location = profile?.user_meta?.Location[0];
  }

  let favorite_quote = profile?.user_meta?.favorite_quote;
  if (typeof favorite_quote === 'undefined') {
    favorite_quote = ' ';
  } else {
    favorite_quote = profile?.user_meta?.favorite_quote[0];
  }

  let professional_summary = profile?.user_meta?.professional_summary;
  if (typeof professional_summary === 'undefined') {
    professional_summary = ' ';
  } else {
    professional_summary = profile?.user_meta?.professional_summary[0];
  }

  let initatives = profile?.user_meta?.initatives;
  if (typeof initatives === 'undefined') {
    initatives = ' ';
  } else {
    initatives = profile?.user_meta?.initatives[0];
  }

  let insights = profile?.user_meta?.insights;
  if (typeof insights === 'undefined') {
    insights = ' ';
  } else {
    insights = profile?.user_meta?.insights[0];
  }

  let expertise_areas1 = profile?.expertise_areas1
    ? profile?.expertise_areas1
    : [];

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
    enableReinitialize: true,
    initialValues: {
      title: title,
      company: company,
      email: profile?.user_email,
      Location: Location,
      favorite_quote: favorite_quote,
      expertise_areas1: expertise_areas1,
      professional_summary: professional_summary,
      country: country,
      region: countryRegion,
    },
    onSubmit: async values => {
      await updateUser(values).then(async response => {
        if (response?.payload?.code === 200) {
          console.log('response', response);
          navigation.navigate('SignIn');
        }
      });
    },
  });

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

  const measa = [
    'India',
    'Pakistan',
    'Sri Lanka ',
    'Middle east',
    'Nepal',
    'Bangladesh',
    'Bhutan',
    'Maldives',
  ];

  const Apac = [
    'Brunei',
    'Burma',
    'Cambodia',
    'Timor- Leste ',
    'Indonesia ',
    'Laos',
    'Malaysia',
    'Philippines',
    'Singapore',
    'Thailand',
    'Vietnam',
    'Australia',
    'Japan',
  ];

  const america = ['United States', 'Canada', 'Mexio'];

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, height: screenHeight + 100}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/img/splash-screen.png')}
          resizeMode="cover">
          <Ionicons
            name={'arrow-back'}
            size={70}
            color={'white'}
            style={{
              position: Platform.OS === 'ios' ? 'absolute' : 'relative',
            }}
            onPress={() => navigation.navigate('SignIn')}
          />
          <View style={{height: '5%'}} />

          <View>
            <View style={styles.content}>
              <View style={styles.header}>
                <Image
                  style={{width: '80%'}}
                  source={require('../../../assets/img/GILCouncil.jpg')}
                  resizeMode="contain"
                />
              </View>
              {userLoading && <Loading />}
              <View style={{marginTop: 10}}>
                <Text style={styles.headingText1}>Select Your Country</Text>
                <Text style={{marginTop: 20, color: 'black'}}>Country *</Text>
                <TouchableOpacity
                  onPress={() => setIsPickerVisible(true)}
                  style={{
                    borderRadius: 5,
                    borderWidth: 0.5,
                    overflow: 'hidden',
                    height: 50,
                    marginTop: 10,
                    marginRight: 20,
                    marginBottom: 10,
                    justifyContent: 'center',
                    paddingLeft: 20,
                  }}>
                  <Text style={{fontWeight: 'bold', color: 'gray'}}>
                    {country}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View>
                <Text style={{color: 'black', marginTop: 10}}>Your Region</Text>
                <TouchableOpacity onPress={() => setRegionVisible(true)}>
                  <View
                    style={{
                      borderRadius: 5,
                      borderWidth: 0.5,
                      overflow: 'hidden',
                      height: 50,
                      marginTop: 10,
                      marginRight: 20,
                      marginBottom: 10,
                      justifyContent: 'center',
                      paddingLeft: 20,
                    }}>
                    <Text
                      style={{
                        position: 'absolute',
                        left: 20,
                        top: 12,
                        color: 'gray',
                      }}>
                      {values.region ? values.region : 'Region'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> */}

              <View style={styles.loginButtonWrapper}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSubmit}>
                  <Text style={styles.loginButtonText}>Proceed</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.signuptext,
                  {marginTop: Platform.OS === 'ios' ? 40 : 80},
                ]}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color={'#31ade5'}
                />
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
                    setCountryRegion(
                      Apac.indexOf(itemValue) > -1 !== false
                        ? 'APAC'
                        : measa.indexOf(itemValue) > -1 !== false
                        ? 'MEASA'
                        : america.indexOf(itemValue) > -1 !== false
                        ? 'AMERICAS'
                        : null,
                    );
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

      {/* <Modal transparent visible={regionVisible}>
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
              onPress={() => setRegionVisible(false)}
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
                selectedValue={region}
                mode={'dropdown'}
                // onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                onValueChange={(itemValue, itemIndex) => {
                  if (itemValue !== null) {
                    setFieldValue('region', itemValue);
                    setRegion(itemValue);
                    setErrors({});
                  }
                }}>
                {Region.map((value, index) => {
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
      </Modal> */}
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
    fontSize: 22,
    color: 'black',
    marginTop: 20,
  },
  signuptext: {
    flexDirection: 'row',
  },
  loginButtonWrapper: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
  },
  loginButton: {
    width: '50%',
    borderRadius: 5,
    height: 50,
    backgroundColor: Colors.PRACTICE_COLOR,
    marginLeft: 5,
  },
  loginButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
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

export default CountryPopup;
