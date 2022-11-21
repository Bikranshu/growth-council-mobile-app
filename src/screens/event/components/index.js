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
import {Linking} from 'react-native';

import analytics from '@react-native-firebase/analytics';
import {formatTimeByOffset} from './timezone';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import Footer from '../../../shared/footer';
import Loading from '../../../shared/loading';
import {
  GROWTH_COACHING_ID,
  GROWTH_COMMUNITY_ID,
  GROWTH_CONTENT_ID,
} from '../../../constants';
import {COMMUNITY_COLOR} from '../../../theme/colors';

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
  const [actualtimeZone, setactualtimeZone] = useState(events?.time_zone);
  const [timeToDisplay, setTimeToDisplay] = useState('');
  const [timeToEnd, setTimeToEnd] = useState('');

  const eventID = route?.params?.id;
  const Slug = events?.slug !== undefined ? events?.slug : '';

  useEffect(() => {
    fetchEventByIdentifier(eventID);
  }, [eventID]);

  useEffect(() => {
    setEventStatus(events?.register_status);
  }, [events]);

  useEffect(() => {
    setactualtimeZone(events?.time_zone);
  }, [events, eventID]);

  const registerEventByEventID = async eventID => {
    const response = await registerEventByIdentifier({
      event_id: eventID,
      slug: Slug,
    });
    if (response?.payload?.code === 200) {
      setEventStatus(true);
      ToastMessage.show('You have successfully RSVP’d for this event.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  let backgroundColor = '';
  const pillarCategory = events?.pillar_categories
    ? events?.pillar_categories[0]?.parent ||
      events?.pillar_categories[1]?.parent
    : '';
  switch (pillarCategory) {
    case 0:
    case GROWTH_COMMUNITY_ID:
      backgroundColor = Colors.COMMUNITY_COLOR;
      break;
    case 0:
    case GROWTH_CONTENT_ID:
      backgroundColor = Colors.PRACTICE_COLOR;
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

  const eventDate = moment(events?.event_start).format('MMMM D dddd, h:mma - ');

  const eventStartMonth = moment(events?.event_start).format('MMMM D dddd');
  const eventStartTime = moment(events?.event_start).format('h:mma ');
  const eventEndTime = moment(events?.event_end).format(' h:mma');
  const eventEndMonth = moment(events?.event_end).format('MMMM D dddd');

  const comma = '/';

  const backStartTimeStamp = moment(events?.event_start).format('h : mm a');
  const backEndTimeStamp = moment(events?.event_end).format('h : mm a');
  //   const [day, setDay] = useState([]);

  let day = [
    'Sunday,',
    'Monday,',
    'Tuesday,',
    'Wednesday,',
    'Thursday,',
    'Friday,',
    'Saturday,',
  ];

  const deviceTimeZone = RNLocalize.getTimeZone();

  const today = moment().tz(deviceTimeZone);
  const deviceOffset = today?.utcOffset();

  let Today = moment().tz(actualtimeZone);
 
  let eventOffset = Today?.utcOffset();

  const com = ':';

  console.log('ad', deviceOffset);
  //calculating gobal timezone of event.start

  const startHours = Number(backStartTimeStamp.split(/(\s+)/)[0]);
  const min =
    Number(backStartTimeStamp.split(/(\s+)/)[3]) +
    Number(backStartTimeStamp.split(/(\s+)/)[4]);
  const hourCal =
    backStartTimeStamp.split(/(\s+)/)[6] === 'am'
      ? startHours * 60 + min
      : (startHours + 12) * 60 + min;
  const startDateCal = (hourCal - eventOffset + deviceOffset) / 60;

  const gobalStart =
    startDateCal > 12 && startDateCal < 24
      ? startDateCal - 12 + eventDate.split(/(\s+)/)[7] + 'pm'
      : startDateCal > 24
      ? startDateCal - 24 + ' am'
      : startDateCal + eventDate.split(/(\s+)/)[7] + 'am';

  let nextDay = day?.indexOf(eventDate.split(/(\s+)/)[4]) + 1;
  let previousDay = day?.indexOf(eventDate.split(/(\s+)/)[4]) - 1;

  const gobalDate =
    startDateCal > 24
      ? Number(eventDate.split(/(\s+)/)[2]) +
        1 +
        eventDate.split(/(\s+)/)[7] +
        day[nextDay]
      : startDateCal < 0
      ? Number(eventDate.split(/(\s+)/)[2]) -
        1 +
        eventDate.split(/(\s+)/)[7] +
        day[previousDay]
      : null;

  const first =
    gobalStart?.split('.')[0] === '0' ? '12' : gobalStart?.split('.')[0];
  const second = gobalStart?.split('.')[1];

  const third = '0.' + second?.split('')[0] + second?.split('')[1];

  const fourth =
    third !== '0.undefinedundefined'
      ? com + Math.round(Number(third) * 60)
      : '';
	  
  const fifth =
    gobalStart.split(' ')[1] === undefined ? '' : gobalStart.split(' ')[1];
  const six = first?.indexOf(fifth) > -1 !== false ? '' : fifth;

  const GobalStartTime = first + fourth + six;
  const actualGobalStartTime =
    GobalStartTime === 'NaNam:' ? '' : GobalStartTime;

  console.log('GobalStartTime', first?.indexOf(fifth) > -1 !== false,"ad", gobalStart.split(' '));

  //calculating gobal timezone of event.end
  const endHours = Number(backEndTimeStamp.split(/(\s+)/)[0]);
  const min1 =
    Number(backEndTimeStamp.split(/(\s+)/)[3]) +
    Number(backEndTimeStamp.split(/(\s+)/)[4]);
  const hourCal1 =
    backEndTimeStamp.split(/(\s+)/)[6] === 'am'
      ? endHours * 60 + min1
      : (endHours + 12) * 60 + min1;

  const endDateCal = (hourCal1 - eventOffset + deviceOffset) / 60;
  const gobalEnd =
    endDateCal > 12 && endDateCal < 24
      ? endDateCal - 12 + eventDate.split(/(\s+)/)[7] + 'pm'
      : endDateCal > 24
      ? endDateCal - 24 + '' + ' am'
      : endDateCal + eventDate.split(/(\s+)/)[7] + 'am';

  const a = gobalEnd.split('.')[0] === '0' ? '12' : gobalEnd.split('.')[0];
  const b = gobalEnd.split('.')[1];
  const c = '0.' + b?.split('')[0] + b?.split('')[1];
  const d =
    c !== '0.undefinedundefined' ? com + Math.round(Number(c) * 60) : '';
  const e = gobalEnd.split(' ')[1] === undefined ? '' : gobalEnd.split(' ')[1];
  const f = a?.indexOf(e) > -1 !== false ? '' : e;

  const GobalEndTime = a + d + f;
  const actualGobalEndTime = GobalEndTime === 'NaNam:' ? '' : GobalEndTime;

  console.log('GobalEndTime', d);

  let title = '';
  const pillarname = events?.pillar_categories
    ? events?.pillar_categories[1]?.parent ||
      events?.pillar_categories[0]?.parent
    : '';
  switch (pillarname) {
    case GROWTH_COMMUNITY_ID:
    case 0:
      title =
        events?.pillar_categories[1]?.name ||
        events?.pillar_categories[0]?.name;
      break;
    case GROWTH_CONTENT_ID:
    case 0:
      title =
        events?.pillar_categories[1]?.name ||
        events?.pillar_categories[0]?.name;
      break;
    case GROWTH_COACHING_ID:
    case 0:
      title =
        events?.pillar_categories[0]?.name ||
        events?.pillar_categories[0]?.name;
      break;
  }

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: typeof events?.image === 'boolean' ? null : events?.image,
          }}
          resizeMode="cover"
          style={{height: '55%'}}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.arrow}>
              <Ionicons name={'arrow-back'} size={30} color="black" />
            </View>
          </TouchableOpacity> */}
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={[styles.topbanner, {backgroundColor: backgroundColor}]}>
              {!isEventLoaded && (
                <Text style={styles.headingText1}>{events?.title}</Text>
              )}
              <View style={styles.poe}>
                <Text style={{fontSize: 11}}>{title}</Text>
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
                      justifyContent: 'center',
                    }}>
                    {/* <Text style={styles.eventDetails}>{GobalDate} /</Text> */}
                    <Text style={styles.eventDetails}>
                      {/* {GobalStartMonth === GobalEndMonth
                        ? GobalDate + GobalEndTime
                        : GobalStartMonth +
                          GobalDate.split(/(\s+)/)[7] +
                          GobalDate.split(/(\s+)/)[6] +
                          GobalDate.split(/(\s+)/)[7] +
                          GobalEndMonth}{' '}
                      (
                      {deviceTimeZone.split('/')[1] +
                        comma +
                        deviceTimeZone.split('/')[0]}
                      ) /{' '} */}
                      {eventStartMonth === eventEndMonth
                        ? eventStartMonth
                        : eventStartMonth +
                          eventDate.split(/(\s+)/)[7] +
                          eventDate.split(/(\s+)/)[8] +
                          eventDate.split(/(\s+)/)[7] +
                          eventEndMonth}
                      {/* {eventDate.split(/(\s+)/)[5]}
                      {events?.event_meta?.evo_event_timezone !== undefined
                        ? events?.event_meta?.evo_event_timezone
                        : ''} */}
                    </Text>
                    {eventStartMonth === eventEndMonth ? (
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 12, marginLeft: 5}}>
                          {eventStartTime}
                          {eventDate.split(/(\s+)/)[8]}
                          {eventEndTime}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            marginLeft: 5,
                            color: COMMUNITY_COLOR,
                          }}>
                          {/* {events?.event_meta?.evo_event_timezone !== undefined
                            ? events?.event_meta?.evo_event_timezone
                            : ''} */}
                          {events?.time_zone !== undefined
                            ? events?.time_zone
                            : ''}
                        </Text>
                      </View>
                    ) : null}
                    {eventStartMonth === eventEndMonth ? (
                      <View>
                        {gobalDate && (
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 5,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            {eventDate.split(/(\s+)/)[0] +
                              eventDate.split(/(\s+)/)[7] +
                              gobalDate}
                          </Text>
                        )}

                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 12, marginLeft: 5}}>
                            {actualGobalStartTime +
                              eventDate.split(/(\s+)/)[7] +
                              eventDate.split(/(\s+)/)[8] +
                              eventDate.split(/(\s+)/)[7] +
                              actualGobalEndTime}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 5,
                              color: COMMUNITY_COLOR,
                            }}>
                            {/* {deviceTimeZone.split('/')[1] +
                              comma +
                              deviceTimeZone.split('/')[0]} */}
                            {deviceTimeZone}
                          </Text>
                        </View>
                      </View>
                    ) : null}
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
                {eventLoading && <Loading />}
                {events?.location?.location_city !== undefined &&
                  events?.location?.location_address !== '' && (
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
                            {events?.location?.location_country}
                          </Text>
                          <Text>{events?.location?.location_address}</Text>
                        </View>
                      )}
                    </View>
                  )}
              </View>
              <View style={styles.seperationline} />

              {events?.organizer?.term_name !== undefined &&
                events?.organizer?.term_name !== '' && (
                  <View
                    style={{
                      borderBottomColor: '#F6F4F4',
                      borderBottomWidth: 1,
                    }}>
                    <View>
                      <Text style={styles.contentHeading}>Hosted By</Text>
                    </View>

                    <View style={styles.hostdetail}>
                      {events?.organizer_image !== false &&
                        events?.organizer_image !== null && (
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
                        )}

                      <View
                        style={{
                          flex: 3,

                          justifyContent: 'center',
                        }}>
                        <Text style={styles.contentTitle}>
                          {events?.organizer?.term_name}
                        </Text>
                        <Text style={{fontSize: 14, fontStyle: 'italic'}}>
                          {events?.organizer?.description}
                        </Text>
                      </View>
                      <View style={styles.eventaddress}></View>
                    </View>
                  </View>
                )}
              {events?.descirption !== undefined &&
                events?.descirption !== '' &&
                events?.descirption !== null && (
                  <View>
                    <Text style={[styles.contentHeading, {marginTop: 20}]}>
                      Event Info
                    </Text>
                    {!isEventLoaded && (
                      <HTMLView
                        value={description}
                        textComponentProps={{
                          style: {
                            fontSize: 12,
                            lineHeight: 20,
                            fontWeight: 'regular',
                            color: '#666767',
                            alignItems: 'center',
                            textAlign: 'justify',
                          },
                        }}
                      />
                    )}
                  </View>
                )}
              {/* {events?.title ===
                '16TH ANNUAL GROWTH, INNOVATION AND LEADERSHIP' &&
                eventStatus && (
                  <View>
                    <Text
                      style={[
                        styles.contentHeading,
                        {marginTop: 20, alignItems: 'center'},
                      ]}>
                      Downloading the Mobile App {'\n'}
                      Your Full Event Guide!
                    </Text>

                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <MaterialIcons
                        name={'circle'}
                        size={10}
                        style={{color: 'black', marginTop: 5}}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          textAlign: 'justify',
                          marginRight: 5,
                        }}>
                        Search for{' '}
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: 'justify',
                            marginRight: 5,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          "CrowdCompass Attendee Hub"
                        </Text>{' '}
                        in your phone's app store/ (Blackberry and Windows users
                        can access the event app using this URL:
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://event.crowdcompass.com/gil2022',
                        )
                      }>
                      <Text style={{color: 'blue', marginLeft: 15}}>
                        https://event.crowdcompass.com/gil2022
                      </Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <MaterialIcons
                        name={'circle'}
                        size={10}
                        style={{color: 'black', marginTop: 5}}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          textAlign: 'justify',
                          marginRight: 5,
                        }}>
                        Open the app and search for{' '}
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: 'justify',
                            marginRight: 5,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          "16 Annual Growth, Innovation and leadership"{' '}
                        </Text>
                        Tap on "Download" adn enter the password "gil22sj" to
                        gain access
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <MaterialIcons
                        name={'circle'}
                        size={10}
                        style={{color: 'black', marginTop: 5}}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          textAlign: 'justify',
                          marginRight: 5,
                        }}>
                        Tap on the{' '}
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: 'justify',
                            marginRight: 5,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          "Profile"
                        </Text>{' '}
                        icon on the bottom and click on{' '}
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: 'justify',
                            marginRight: 5,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          "Log in" .
                        </Text>
                        Enter you first and last name, followed by your email
                        address.
                        {'\n'}
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: 'justify',
                            marginRight: 5,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          If you do not login, you won't have access to full
                          participant list.
                        </Text>
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <MaterialIcons
                        name={'circle'}
                        size={10}
                        style={{color: 'black', marginTop: 5}}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          textAlign: 'justify',
                          marginRight: 5,
                        }}>
                        You will be sent a verificaton email with 6 digit
                        codethat will need to be entered in to app. (this may
                        take a few minute. If you have any issues please see us
                        at the registeryion desk!
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <MaterialIcons
                        name={'circle'}
                        size={10}
                        style={{color: 'black', marginTop: 5}}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          textAlign: 'justify',
                          marginRight: 5,
                        }}>
                        Then click back in{' '}
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: 'justify',
                            marginRight: 5,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          {' '}
                          "Profile"
                        </Text>{' '}
                        and tap on{' '}
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: 'justify',
                            marginRight: 5,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          {' '}
                          "Edit"{' '}
                        </Text>
                        to edit your profile.
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <MaterialIcons
                        name={'circle'}
                        size={10}
                        style={{color: 'black', marginTop: 5}}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          textAlign: 'justify',
                          marginRight: 5,
                        }}>
                        You can either manually enter your information/photo or
                        scroll to the bottom and{' '}
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: 'justify',
                            marginRight: 5,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          {' '}
                          "Connect"
                        </Text>{' '}
                        with LinkedIn to have it automatically entered. Now you
                        are visible on the participant list and can interact
                        with peers!
                      </Text>
                    </View>
                  </View>
                )} */}

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                {eventRegisterLoading && <Loading />}
                {!eventStatus && (
                  <Button
                    style={styles.acceptButton}
                    onPress={async () => {
                      registerEventByEventID(route?.params?.id);
                      let eventName = events?.title;
                      await analytics().logEvent(eventName, {
                        item: events?.title,
                        description: 'Event Register',
                      });
                    }}>
                    <Text style={styles.acceptButtonText}>RSVP</Text>
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
                    <Text style={styles.registeredButtonText}>RSVP'd</Text>
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
    fontSize: 14,
    color: '#ffff',
  },
  eventDetails: {
    fontFamily: Typography.FONT_SF_MEDIUM,
    color: Colors.NONARY_TEXT_COLOR,
    marginLeft: 5,
    fontSize: 13,
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
    fontSize: 15,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  contentTitle: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_MEDIUM,
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: 14,
    fontStyle: 'italic',
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
    height: 100,
    width: 318,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 14,
    padding: 15,
    position: 'relative',
  },

  poe: {
    position: 'absolute',
    top: -15,
    left: 0,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.2,
    paddingVertical: 5,
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
    paddingBottom: 15,
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
    marginRight: 15,
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
