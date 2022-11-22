import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import Footer from '../../../shared/footer';
import {useIsFocused} from '@react-navigation/native';
import MyEvent from './MyEvent';
import AboutMe from './AboutMe';
import BottomNav from '../../../layout/BottomLayout';
import Loading from '../../../shared/loading';

const Profile = props => {
  const {
    navigation,
    profile,
    profileLoading,
    profileError,
    fetchProfileByIdentifier,
    cleanProfile,
  } = props;

  const win = Dimensions.get('window');

  const [value, setValue] = useState('About me');
  const [totalDuration, setTotalDuration] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchProfileByIdentifier();
  }, [isFocused]);

  useEffect(() => {
    //We are showing the coundown timer for a given expiry date-time
    //If you are making a quize type app then you need to make a simple timer
    //which can be done by using the simple like given below
    //that.setState({ totalDuration: 30 }); //which is 30 sec
    var date = new Date();
    //Getting the current date-time with required formate and UTC
    var expirydate = '2022-12-23 04:00:45'; //You can set your own date-time
    //Let suppose we have to show the countdown for above date-time
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //difference of the expiry date-time given and current date-time
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    //converting in seconds
    setTotalDuration(d);
    //Settign up the duration of countdown in seconds to re-render
  }, [profile]);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
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
        <View
          style={{
            backgroundColor: PRIMARY_BACKGROUND_COLOR,
            justifyContent: 'center',
            alignContent: 'center',
            marginBottom: 30,
          }}>
          <Image
            source={require('../../../assets/img/appBG.png')}
            style={{
              height: (Dimensions.get('screen').height - 150) / 3,
              paddingTop: Dimensions.get('screen').height / 9,
              width: win.width,
            }}
          />
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
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('Settings');
                  await analytics().logEvent('ProfileSettings', {
                    item: 'Profile Settings',
                  });
                }}>
                <Ionicon
                  name={'settings-outline'}
                  size={24}
                  color="#A0A8B0"
                  style={{marginTop: 10, marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.profileWrapper}>
              <View style={styles.icon}>
                <Image
                  source={{uri: profile.avatar}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.header}>
                <Text style={styles.headingText1}>{profile?.user_login}</Text>
                <Text style={{color: '#222B45'}}>
                  {profile?.user_meta?.title === undefined
                    ? profile?.user_meta?.Title[0]
                    : profile?.user_meta?.title[0]}
                  {/* {profile?.user_meta?.title} */}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginVertical: 20}}>
            <CountDown
              until={totalDuration}
              //style of countdown
              digitStyle={{
                backgroundColor: '#FFF',
                borderWidth: 2,
                borderColor: '#1CC625',
              }}
              digitTxtStyle={{color: '#1CC625'}}
              timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
              separatorStyle={{color: '#1CC625', marginBottom: 20}}
              //duration of countdown in seconds
              timetoShow={('H', 'M', 'S')}
              timeLabels={{d: 'Days', h: 'Hour', m: 'Min', s: 'Sec'}}
              //formate to show
              onFinish={() => alert('finished')}
              //on Finish call
              onPress={() => alert('hello')}
              //on Press call
              size={20}
              showSeparator
            />
          </View>

          <View style={styles.container}>
            <View>
              <View style={styles.middle}>
                <View style={styles.buttonWrapper}>
                  <ButtonToggleGroup
                    highlightBackgroundColor={'white'}
                    highlightTextColor={'#0B0B45'}
                    inactiveBackgroundColor={'transparent'}
                    inactiveTextColor={'grey'}
                    values={['About me', 'Points of Engagement']}
                    value={value}
                    onSelect={val => setValue(val)}
                    style={{
                      // width: '100%',
                      // alignItems: 'center',
                      paddingLeft: 5,
                      paddingRight: 5,
                      // borderRadius: 10,
                    }}
                    textStyle={{
                      paddingHorizontal: 0,
                      // paddingLeft: 15,
                      fontSize: 13,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  />
                </View>
                {profileLoading && <Loading />}
                {value === 'Points of Engagement' && <MyEvent {...props} />}

                {value === 'About me' && <AboutMe {...props} />}
              </View>
            </View>
          </View>
          {/* <Footer /> */}
        </View>
      </ScrollView>
      <BottomNav {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 20,
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
  text: {
    color: '#343537',
    marginLeft: 5,
    fontFamily: Typography.FONT_SF_REGULAR,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
    color: '#222B45',
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
  middle: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  wrapper: {
    width: Platform.OS === 'ios' ? '65%' : '70%',
    marginLeft: 10,
    marginTop: 10,
  },
  middleWrapper: {
    paddingBottom: 20,
    width: '100%',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.5,
    marginTop: 20,
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
  middleImage1: {
    width: 40,
    height: 40,
    backgroundColor: '#d7d7d7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 15,
  },
  buttonWrapper: {
    width: '100%',
    height: 55,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },

  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
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
});

export default Profile;
