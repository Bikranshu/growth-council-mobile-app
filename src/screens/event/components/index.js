import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Button, useToast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

import 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import {formatTimeByOffset} from './timezone';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import Footer from '../../../shared/footer';

const Event = props => {
  const {
    navigation,
    route,
    events,
    eventLoading,
    eventError,
    fetchEventByIdentifier,
    cleanEvent,
    eventRegisters,
    eventRegisterLoading,
    eventRegisterError,
    registerEventByIdentifier,
    cleanEventRegister,
  } = props;

  const toast = useToast();
  const [eventStatus, setEventStatus] = useState(events?.register_status);
  const [timeToDisplay, setTimeToDisplay] = useState('');
  const [timeToEnd, setTimeToEnd] = useState('');

  useEffect(() => {
    fetchEventByIdentifier(route.params.id);
  }, []);

  useEffect(() => {
    setEventStatus(events?.register_status);
  }, [events]);

  const registerEventByEventID = async eventID => {
    const response = await registerEventByIdentifier({event_id: eventID});
    if (response?.payload?.code === 200) {
      setEventStatus(true);
      ToastMessage.show('You have successfully registered this event.');
    } else {
      console.log('Error Toast');
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  let backgroundColor = '';
  const pillarCategory = events?.pillar_categories
    ? events?.pillar_categories[0]?.parent
    : '';
  switch (pillarCategory) {
    case 0:
    case 118:
      backgroundColor = Colors.PRACTICE_COLOR;
      break;
    case 0:
    case 117:
      backgroundColor = Colors.COMMUNITY_COLOR;
      break;
    default:
      backgroundColor = Colors.COACHING_COLOR;
  }

  let description = events?.descirption;
  if (description !== undefined) {
    description = events?.descirption;
  } else {
    description = '';
  }

  const isEventLoaded = Object.keys(events).length === 0;

  const backStartTimeStamp = events?.event_start;
  const backEndTimeStamp = events?.event_end;
  const deviceTimeZone = RNLocalize.getTimeZone();

  const today = moment().tz(deviceTimeZone);
  const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

  const GobalDate = moment(timeToDisplay).format('D MMMM, dddd, h:mma - ');
  const GobalStartMonth = moment(timeToDisplay).format('D MMMM dddd');

  const GobalDateEnd = moment(timeToEnd).format('D MMMM, dddd, h:mm a ');
  const GobalEndTime = moment(timeToEnd).format('h:mma ');
  const GobalEndMonth = moment(timeToEnd).format('D MMMM dddd');
  console.log( GobalDate.split(/(\s+)/)[8])
  useEffect(() => {
    const convertedToLocalTime = formatTimeByOffset(
      backStartTimeStamp,
      currentTimeZoneOffsetInHours,
    );
    setTimeToDisplay(convertedToLocalTime);
  }, [events]);

  useEffect(() => {
    const convertedToLocalTimeEnd = formatTimeByOffset(
      backEndTimeStamp,
      currentTimeZoneOffsetInHours,
    );
    setTimeToEnd(convertedToLocalTimeEnd);
  }, [events]);

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: typeof events?.image === 'boolean' ? null : events?.image,
          }}
          resizeMode="cover"
          style={{height: '55%'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.arrow}>
              <Ionicons name={'arrow-back'} size={30} color="black" />
            </View>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={[styles.topbanner, {backgroundColor: backgroundColor}]}>
              {!isEventLoaded && (
                <Text style={styles.headingText1}>{events.title}</Text>
              )}
              <View style={styles.poe}>
                <Text style={{fontSize: 12}}>Megatrend Workshop</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.content}>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 5,
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
                      flex: 5,
                      paddingLeft: 5,
                    }}>
                    {/* <Text style={styles.eventDetails}>{GobalDate} /</Text> */}
                    <Text style={styles.eventDetails}>
                      {GobalStartMonth === GobalEndMonth
                        ? GobalDate + GobalEndTime
                        : GobalStartMonth +GobalDate.split(/(\s+)/)[7]+  GobalDate.split(/(\s+)/)[8] +GobalDate.split(/(\s+)/)[7]+ GobalEndMonth}{' '}
                      ({deviceTimeZone})
                    </Text>
                  </View>
                  {!eventStatus && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          registerEventByEventID(route?.params?.id)
                        }>
                        <Feather
                          name={'plus-circle'}
                          size={25}
                          color={'rgba(54,147,172,1)'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {eventStatus && (
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

                  {!isEventLoaded && (
                    <View
                      style={{
                        flex: 5,
                        paddingLeft: 10,
                      }}>
                      <Text style={styles.eventLocationDetails}>
                        {events?.location?.location_city}{' '}
                        {events?.location?.location_state}{' '}
                        {events?.location?.location_country}
                      </Text>
                      <Text>{events?.location?.location_address}</Text>
                    </View>
                  )}

                  {eventLoading && (
                    <View style={styles.loading1}>
                      <BubblesLoader
                        color={Colors.SECONDARY_TEXT_COLOR}
                        size={80}
                      />
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.seperationline} />
              <View>
                <View>
                  <Text style={styles.contentHeading}>Hosted By</Text>
                </View>

                <View style={styles.hostdetail}>
                  <View
                    style={[
                      styles.hostimage,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <Image
                      source={{
                        uri:
                          typeof events?.organizer_image === 'boolean'
                            ? null
                            : events?.organizer_image,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flex: 3,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.contentTitle}>
                      {events?.organizer?.term_name}
                    </Text>
                    <Text style={{fontSize: 14}}>
                      {events?.organizer?.description}
                    </Text>
                  </View>
                  <View style={styles.eventaddress}></View>
                </View>
              </View>
              <View style={styles.seperationline} />
              <View>
                <Text style={styles.contentHeading}>Event Info</Text>
                {!isEventLoaded && (
                  <HTMLView
                    value={description}
                    style={{fontSize: 14, color: '#77838F'}}
                  />
                )}
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {eventRegisterLoading && (
                  <View style={styles.loading1}>
                    <BubblesLoader
                      color={Colors.SECONDARY_TEXT_COLOR}
                      size={80}
                    />
                  </View>
                )}
                {!eventStatus && (
                  <Button
                    style={styles.acceptButton}
                    onPress={() => registerEventByEventID(route?.params?.id)}>
                    <Text style={styles.acceptButtonText}>
                      Sign Up in One Click
                    </Text>
                  </Button>
                )}
                {eventStatus && (
                  <TouchableOpacity style={styles.registeredButton}>
                    <View style={{position: 'absolute', left: 20}}>
                      <Image
                        source={require('../../../assets/img/tick-icon.png')}
                        style={{
                          width: 25,
                          height: 25,
                        }}
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
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  scrollBox: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  arrow: {
    marginTop: 30,
    marginLeft: 10,
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
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffff',
  },
  eventDetails: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    color: Colors.NONARY_TEXT_COLOR,
    marginLeft: 5,
    marginTop: 3,
    fontSize: 14,
    color: '#1E2022',
    fontWeight: 'bold',
  },
  eventLocationDetails: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  contentHeading: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_MEDIUM,
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: 14,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  contentTitle: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_MEDIUM,
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentText: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 25,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
    fontWeight: 'regular',
  },
  acceptButton: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#F26722',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredButton: {
    flexDirection: 'row',
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
  topbanner: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 90,
    width: 318,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 14,
    padding: 20,
    position: 'relative',
  },

  poe: {
    height: 22,
    width: 148,
    position: 'absolute',
    top: -10,
    left: 0,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  infoicon: {
    flex: 1,
    backgroundColor: 'rgba(54,147,172,1)',
    height: 48,
    width: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  seperationline: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: '#F6F4F4',
    borderBottomWidth: 1,
  },
  hostdetail: {
    flex: 1,
    paddingBottom: 5,
    flexDirection: 'row',
    marginTop: 5,
  },
  hostimage: {
    flex: 1,
    backgroundColor: 'rgba(54,147,172,1)',
    height: 62,
    width: 62,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventaddress: {
    flex: 2,
    height: 60,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  followbtn: {
    width: 92,
    height: 36,
    backgroundColor: '#183863',
    borderRadius: 15,
  },
  loading1: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});
export default Event;
