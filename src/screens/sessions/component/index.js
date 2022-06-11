import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, useToast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import {formatTimeByOffset} from '../../event/components/timezone';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import Footer from '../../../shared/footer';

const Session = props => {
  const {
    navigation,
    route,
    sessions,
    sessionLoading,
    sessionError,
    fetchSessionByIdentifier,
    cleanSession,
    sessionRegisters,
    sessionRegisterLoading,
    sessionRegisterError,
    registerSessionByIdentifier,
    cleanSessionRegister,
  } = props;

  const toast = useToast();
  const [sessionStatus, setSessionStatus] = useState(sessions?.register_status);
  const [timeToDisplay, setTimeToDisplay] = useState('');
  const [timeToEnd, setTimeToEnd] = useState('');

  useEffect(() => {
    fetchSessionByIdentifier(route.params.id);
  }, []);

  useEffect(() => {
    setSessionStatus(sessions?.register_status);
  }, [sessions]);

  const registerSessionBySessionID = async sessionID => {
    const response = await registerSessionByIdentifier({session_id: sessionID});
    if (response?.payload?.code === 200) {
      setSessionStatus(true);
      ToastMessage.show('You have successfully registered this event.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  const isSessionLoaded = Object.keys(sessions).length === 0;
  const actualDate = moment(sessions?.event_start).format('LLLL').split(',', 6);
  const date = actualDate[1].split(' ', 3);

  let backgroundColor = Colors.COACHING_COLOR;
 
  let description = sessions?.descirption;
  if (description !== undefined) {
    description = sessions?.descirption;
  } else {
    description = '';
  }

  const backStartTimeStamp = sessions?.event_start;
  const backEndTimeStamp = sessions?.event_end;
  const deviceTimeZone = RNLocalize.getTimeZone();

  const today = moment().tz(deviceTimeZone);
  const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

  const GobalDate = moment(timeToDisplay).format('D MMMM (dddd), h:mma - ');

  const GobalTime = moment(timeToDisplay).format('h:mm a');
  const GobalStartMonth = moment(timeToDisplay).format('D MMMM (dddd)');
  const GobalMonth = moment(timeToDisplay).format('D MMMM (dddd) - ');

  const GobalDateEnd = moment(timeToEnd).format('D MMMM (dddd), h:mm a ');
  const GobalEndTime = moment(timeToEnd).format('h:mm a ');
  const GobalEndMonth = moment(timeToEnd).format('D MMMM (dddd)');

  useEffect(() => {
    const convertedToLocalTime = formatTimeByOffset(
      backStartTimeStamp,
      currentTimeZoneOffsetInHours,
    );
    setTimeToDisplay(convertedToLocalTime);
  }, [sessions]);

  useEffect(() => {
    const convertedToLocalTimeEnd = formatTimeByOffset(
      backEndTimeStamp,
      currentTimeZoneOffsetInHours,
    );
    setTimeToEnd(convertedToLocalTimeEnd);
  }, [sessions]);

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: sessions?.image}}
          resizeMode="cover"
          style={{height: '55%'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{marginTop: 10}}>
              <Ionicons name={'arrow-back'} size={50} color="white" />
            </View>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={[styles.topbanner, {backgroundColor: backgroundColor}]}>
              {!isSessionLoaded && (
                <Text style={styles.headingText1}>{sessions?.title}</Text>
              )}
            </View>
          </View>

          <View>
            <View style={[styles.content, {height: 'auto'}]}>
              <View
                style={{height: 150, flexDirection: 'column', marginTop: 20}}>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 5,
                    paddingBottom: 5,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={[
                      styles.infoicon,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <MaterialIcons name={'event'} size={25} color={'white'} />
                  </View>

                  <View
                    style={{
                      flex: 4,
                      paddingLeft: 5,
                    }}>
                    {/* <Text style={styles.eventDetails}>{GobalDate} /</Text> */}
                    <Text style={styles.eventDetails}>
					{GobalStartMonth === GobalEndMonth
                        ? GobalDate +
                          GobalDateEnd.split(/(\s+)/)[6] +
                          GobalDateEnd.split(/(\s+)/)[8]
                        : GobalMonth + GobalEndMonth}{' '}
                      ({deviceTimeZone})
                    </Text>
                  </View>
                  {!sessionStatus && (
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          registerSessionBySessionID(route?.params?.id)
                        }>
                        <Feather
                          name={'plus-circle'}
                          size={25}
                          color={'rgba(54,147,172,1)'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {sessionStatus && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Feather
                        name={'check-circle'}
                        size={25}
                        color={'rgba(54,147,172,1)'}
                      />
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 20,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={[
                      styles.infoicon,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <Ionicons
                      name={'location-outline'}
                      size={25}
                      color={'white'}
                    />
                  </View>

                  {!isSessionLoaded && (
                    <View
                      style={{
                        flex: 5,
                        paddingLeft: 10,
                      }}>
                      <Text style={styles.eventLocationDetails}>
                        {sessions?.location?.location_city}
                        {sessions?.location?.location_state}
                        {sessions?.location?.location_country}
                      </Text>
                      <Text>{sessions?.location?.location_address}</Text>
                    </View>
                  )}
                  {sessionLoading && (
                    <View style={styles.loading1}>
                      <BubblesLoader
                        color={Colors.SECONDARY_TEXT_COLOR}
                        size={80}
                      />
                    </View>
                  )}
                </View>
              </View>

              <View style={{height: 150}}>
                <View style={{marginTop: 25}}>
                  <Text style={styles.contentHeading}>Coached By</Text>
                </View>
                <View style={styles.hostdetail}>
                  <View
                    style={[
                      styles.hostimage,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <Image
                      source={{uri: sessions?.organizer_image}}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>

                  <View
                    style={{
                      flex: 3,
                      paddingLeft: 20,
                    }}>
                    <Text style={styles.contentHeading}>
                      {sessions?.organizer?.term_name}
                    </Text>
                    <Text>{sessions?.organizer?.description}</Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      height: 60,
                      width: 30,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}></View>
                </View>
              </View>

              <View>
                <Text style={styles.contentHeading}>Session Brief</Text>
                {!isSessionLoaded && (
                  <HTMLView value={description} stylesheet={styles} />
                )}
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {sessionRegisterLoading && (
                  <View style={styles.loading1}>
                    <BubblesLoader
                      color={Colors.SECONDARY_TEXT_COLOR}
                      size={80}
                    />
                  </View>
                )}
                {!sessionStatus && (
                  <Button
                    style={styles.acceptButton}
                    onPress={() =>
                      registerSessionBySessionID(route?.params?.id)
                    }>
                    <Text style={styles.acceptButtonText}>
                      Sign Up in One Click
                    </Text>
                  </Button>
                )}
                {sessionStatus && (
                  <TouchableOpacity style={styles.registeredButton}>
                    <View style={{position: 'absolute', left: 20}}>
                      <Image
                        source={require('../../../assets/img/tick-icon.png')}
                        style={{width: 25, height: 25}}
                      />
                    </View>
                    <Text style={styles.registeredButtonText}>Registered</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* <Footer /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
  },
  content: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginTop: 170,
    borderTopStartRadius: 20,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffff',
  },
  contentHeading: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  contentText: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 25,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  acceptButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(242,103,34,1)',
  },
  eventDetails: {
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
  },
  eventLocationDetails: {
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 5,
  },
  topbanner: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 90,
    width: 318,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    borderRadius: 12,
    padding: 20,
    zIndex: 10,
    position: 'absolute',
  },
  scrollBox: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  hostdetail: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  hostimage: {
    flex: 1,
    backgroundColor: '#A1BA68',
    height: 64,
    width: 62,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 25,
    borderColor: '#F26722',
    borderWidth: 2,
    position: 'relative',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  registeredButtonText: {
    color: '#F26722',
  },
  infoicon: {
    flex: 1,
    backgroundColor: 'rgba(54,147,172,1)',
    height: 60,
    width: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
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
export default Session;
