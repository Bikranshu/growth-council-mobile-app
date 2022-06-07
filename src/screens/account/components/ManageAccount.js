import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from 'react-native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useIsFocused} from '@react-navigation/native';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import Footer from '../../../shared/footer';
import {useSelector} from 'react-redux';
import Loading from '../../../shared/loading';

const profileUpdateSchema = Yup.object().shape({
  //   display_name: Yup.string().required('Name is required.'),
  //   first_name: Yup.string().required('First name is required.'),
  //   last_name: Yup.string().required('Last Name is required.'),
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
});

const ManageAccount = props => {
  const {
    navigation,
    route,
    profile,
    profileLoading,
    profileError,
    fetchProfileByIdentifier,
    cleanProfile,
    userLoading,
    updateUser,

    uploadProfileImages,
    uploadProfileImageLoading,
    uploadProfileImageError,
    uploadImage,

    updateEntities,
    updateLoading,
    updateError,
    updateImage,

    expertise,
    expertiseLoading,
    expertiseError,
    fetchAllExpertises,
    cleanExperties,
  } = props;

  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(profile.avatar);

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

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
    }).then(async image => {
      setImage(image.path);
      let fd = new FormData();
      const file = {
        type: image.mime,
        uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
        name: 'profile_photo.jpg',
      };
      fd.append('file', file);
      console.log('choosePhotoFromLibrary', fd);
      await uploadImage(fd).then(async response => {
        console.log('Upload response:::::::::::', response?.payload?.id);
        await updateImage({attachment_id: response?.payload?.id}).then(
          response => {
            if (response?.payload?.code === 200) {
              navigation.navigate('Account');
              ToastMessage.show('Profile Image has been successfully updated.');
              console.log('Update response::::::::::', response);
            }
          },
        );
      });
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(async image => {
      setImage(image.path);
      let fd = new FormData();
      const file = {
        type: image.mime,
        uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
        name: 'profile_photo.jpg',
      };
      fd.append('file', file);

      await uploadImage(fd).then(async response => {
        await updateImage({attachment_id: response?.payload?.id}).then(
          response => {
            if (response?.payload?.code === 200) {
              navigation.navigate('Account');
              ToastMessage.show('Profile Image has been successfully updated.');
            }
          },
        );
      });
    });
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    validationSchema: profileUpdateSchema,
    initialValues: {
      title: title,
      company: company,
      email: profile?.user_email,
      Location: Location,
      expertise_areas1: expertise_areas1,
      professional_summary: professional_summary,
    },
    onSubmit: async values => {
      await updateUser(values).then(response => {
        if (response?.payload?.code === 200) {
          navigation.navigate('Account');
          ToastMessage.show('Profile has been successfully updated.');
        }
      });
    },
  });

  useEffect(() => {
    fetchProfileByIdentifier();
  }, []);

  useEffect(() => {
    fetchAllExpertises();
  }, []);

  useEffect(() => {
    const result = Object.entries(expertise)
      ?.filter(function ([key, value]) {
        if (value === 'Expertise Areas') {
          return false; // skip
        }
        return true;
      })
      .map(([key, value]) => ({
        label: key,
        value,
      }));
    setItems(result);
    setValue(expertise_areas1);
  }, [expertise]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.y;
          if (offset >= 70) {
            navigation.setOptions({
              headerShown: false,
            });
          } else {
            navigation.setOptions({
              headerShown: true,
            });
          }
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: PRIMARY_BACKGROUND_COLOR,
        }}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="grey"
          translucent={false}
        />
        <View style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
          <Image
            source={require('../../../assets/img/appBG.png')}
            style={{
              height: Dimensions.get('screen').height / 4,
              paddingTop: Dimensions.get('screen').height / 9,
            }}/>
          <View
            style={{
              display: 'flex',
              marginTop: -80,
              alignContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <View
              style={{
                zIndex: 30,
                position: 'absolute',
                right: 5,
                marginTop: 10,
                marginRight: 10,
              }}>
              <TouchableOpacity onPress={takePhotoFromCamera}>
                <Ionicons
                  name={'camera'}
                  size={20}
                  color="#C4C8CC"
                  style={{marginTop: 5, marginLeft: 30}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={choosePhotoFromLibrary}>
                <AntDesign
                  name={'upload'}
                  size={20}
                  color="#C4C8CC"
                  style={{marginTop: 10, marginLeft: 30}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.profileWrapper}>
              <View style={styles.icon}>
                <Image
                  source={{uri: image}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.header}>
                {uploadProfileImageLoading && (
                  <>
                    <View style={styles.loading1}>
                      <BubblesLoader
                        color={Colors.SECONDARY_TEXT_COLOR}
                        size={80}
                      />
                    </View>
                  </>
                )}
                {updateLoading && (
                  <>
                    <View style={styles.loading1}>
                      <BubblesLoader
                        color={Colors.SECONDARY_TEXT_COLOR}
                        size={80}
                      />
                    </View>
                  </>
                )}
                <Text style={styles.headingText1}>{profile?.display_name}</Text>
                <Text style={{color: '#222B45'}}>
                  {profile.user_meta?.title}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <View>
              <View style={styles.middle}>
                <View style={styles.wrapper}>
                  {profileError && (
                    <View style={styles.message}>
                      <Text style={styles.errorText}>
                        {profileError.message}
                      </Text>
                    </View>
                  )}
                  {profileLoading && <Loading />}

                  <View style={styles.middleWrapper}>
                    <View style={styles.middleImage}>
                      <Ionicons name="person-outline" color="white" size={20} />
                    </View>
                    <Text style={styles.menuText}>Account</Text>
                    <Ionicons
                      name="chevron-down-outline"
                      size={20}
                      color="#d7d7d7"
                      style={{right: 0, position: 'absolute'}}
                    />
                  </View>

                  <View style={styles.TextWrapper} onPress={Keyboard.dismiss}>
                    <Text
                      style={{
                        size: 7,
                        marginLeft: 10,
                        fontSize: 10,
                        color: '#8F9BB3',
                      }}>
                      Title
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      error={errors.title}
                      touched={touched.title}
                    />

                    <Text
                      style={{
                        size: 7,
                        marginLeft: 10,
                        fontSize: 10,
                        color: '#8F9BB3',
                      }}>
                      Company
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={values.company}
                      onChangeText={handleChange('company')}
                      onBlur={handleBlur('company')}
                      error={errors.company}
                      touched={touched.company}
                    />

                    {/* <Text
                    style={{
                      size: 7,
                      marginLeft: 10,
                      fontSize: 10,
                      color: '#8F9BB3',
                    }}>
                    Last Name
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={values.last_name}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    error={errors.last_name}
                    touched={touched.last_name}
                  /> */}

                    <Text
                      style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                      Email Address
                    </Text>
                    <TextInput
                      style={[styles.input, {color: '#808080'}]}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={errors.email}
                      touched={touched.email}
                      editable={false}
                    />

                    <Text
                      style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                      Region
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={values.Location}
                      onChangeText={handleChange('Location')}
                      onBlur={handleBlur('Location')}
                      error={errors.Location}
                      touched={touched.Location}
                    />

                    {/* <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    Favorite Quote
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    value={values.favorite_quote}
                    onChangeText={handleChange('favorite_quote')}
                    onBlur={handleBlur('favorite_quote')}
                    error={errors.favorite_quote}
                    touched={touched.favorite_quote}
                  /> */}

                    <Text
                      style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                      Professional Summary
                    </Text>
                    <TextInput
                      multiline={true}
                      numberOfLines={6}
                      style={styles.textarea}
                      value={values.professional_summary}
                      onChangeText={handleChange('professional_summary')}
                      onBlur={handleBlur('professional_summary')}
                      error={errors.professional_summary}
                      touched={touched.professional_summary}
                    />

                    <Text
                      style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                      Areas of Expertise
                    </Text>

                    <DropDownPicker
                      multiple={true}
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      maxHeight={1000}
                      onChangeValue={value => {
                        setFieldValue('expertise_areas1', value);
                      }}
                      containerStyle={{
                        width: '94%',
                        marginLeft: 10,
                      }}
                    />

                    {/* <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    Most Recent Growth/Innovation Initative
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    value={values.initatives}
                    onChangeText={handleChange('initatives')}
                    onBlur={handleBlur('initatives')}
                    error={errors.initatives}
                    touched={touched.initatives}
                  /> */}

                    {/* <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    I'm Seeking Insights On
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    value={values.insights}
                    onChangeText={handleChange('insights')}
                    onBlur={handleBlur('insights')}
                    error={errors.insights}
                    touched={touched.insights}
                  /> */}
                    {userLoading && <Loading />}
                    <View style={styles.loginButtonWrapper}>
                      <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleSubmit}>
                        <Text style={styles.loginButtonText}>Update</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ChangePassword')}>
                    <View
                      style={[styles.middleWrapper, {borderBottomWidth: 0}]}>
                      <View style={styles.middleImage}>
                        <Ionicons name="key" color="white" size={20} />
                      </View>
                      <Text style={styles.menuText}>Change Password</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <Footer /> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ManageAccount;

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    color: 'black',
  },
  textarea: {
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    color: 'black',
  },

  loginButtonWrapper: {
    marginLeft: 10,
    marginTop: 18,
    marginBottom: 10,
  },
  loginButton: {
    width: '40%',
    paddingVertical: 20,
    borderRadius: 10,
    paddingHorizontal: 25,
    backgroundColor: '#3A9BDC',
  },
  loginButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 16,
  },
  message: {
    ...CommonStyles.message,
    width: '86%',
  },
  errorWrapper: {
    width: '70%',
  },
  errorText: {
    ...CommonStyles.errorText,
  },

  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 40,
    paddingRight: 40,
  },
  profileWrapper: {
    padding: 20,
    alignItems: 'center',
    width: 328,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    borderRadius: 12,
    position: 'relative',
    paddingTop: 100,
    borderWidth: 1,
    borderColor: '#707070',
  },
  header: {
    alignItems: 'center',
  },
  icon: {
    width: 110,
    height: 110,
    borderColor: PRIMARY_BACKGROUND_COLOR,
    borderRadius: 16,
    borderWidth: 3,
    overflow: 'hidden',
    position: 'absolute',
    top: -35,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
    color: '#222B45',
  },
  middle: {},
  wrapper: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F7',
  },
  middleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#EDF1F7',
    position: 'relative',
  },
  TextWrapper: {
    marginTop: 10,
  },

  middleImage: {
    width: 40,
    height: 40,
    backgroundColor: '#3A9BDC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },

  menuText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 15,
    color: '#222B45',
  },
  loading1: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});
