import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  useFocusEffect,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import moment from 'moment-timezone';
import {Calendar} from 'react-native-calendars';
import {Picker} from '@react-native-picker/picker';
import * as RNLocalize from 'react-native-localize';
import analytics from '@react-native-firebase/analytics';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Footer from '../../../shared/footer';
import Loading from '../../../shared/loading';
import ToastMessage from '../../../shared/toast';
import {CommonStyles, Colors} from '../../../theme';
import BottomNav from '../../../layout/BottomLayout';
import FloatingButton from '../../../shared/floatingButton';
import {formatTimeByOffset} from '../../event/components/timezone';
import {GROWTH_COMMUNITY_ID, GROWTH_CONTENT_ID} from '../../../constants';

const EventCalendar = props => {
  const {
    navigation,
    route,
    calendarEvents,
    calendarEventLoading,
    calendarEventError,
    fetchAllCalendarEvent,
    cleanCalendarEvent,

    profile,
    profileLoading,
    profileError,
    fetchProfile,
    cleanProfile,

    region,
    regionLoading,
    regionError,
    fetchAllRegions,
    cleanRegion,
  } = props;

  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [calendarMonth, setCalendarMonth] = useState(moment().format('MM'));
  const [calendarYear, setCalendarYear] = useState(moment().format('YYYY'));
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(true);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [regionVisible, setRegionVisible] = useState(false);

  let profileRegion = profile?.user_meta?.region;

  if (
    typeof profileRegion === 'undefined' ||
    profileRegion === null ||
    profileRegion === ''
  ) {
    profileRegion = 'ALL REGION';
  } else {
    profileRegion = profile?.user_meta?.region[0];
  }

  const [mobileRegion, setMobileRegion] = useState(profileRegion);

  // Start tracking the duration of the user's stay on the page
  let startTime = new Date().getTime();

  // Call this method when the user navigates away from the page
  let endTime = new Date().getTime();
  let duration = endTime - startTime;

  useEffect(() => {
    const GoogleA = async () => {
      await analytics().logEvent('calendar_duration', {
        page_name: 'Calendar', // name of the page
        duration: duration, // duration in milliseconds
      });
    };
    GoogleA();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchAllRegions();
  }, []);


  useEffect(() => {
    const fetchAllCalendarEventAsync = async () => {
      await fetchAllCalendarEvent({
        year: moment().format('YYYY'),
        month: moment().format('MM'),
        all_events: showAllEvents,
        region: mobileRegion,
      })
        .then(response => {
          if (response?.payload?.code === 200) {
            setCurrentEvents(response?.payload?.data);
          } else {
            setCurrentEvents([]);
          }
        })
        .catch(e => {
          setCurrentEvents([]);
        });
    };
    fetchAllCalendarEventAsync();
  }, []);

  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

  let markedDay = {};
  currentEvents?.map(item => {
    const startDate = moment(item?.event_start).format('YYYY-MM-DD');
    const endDate = moment(item?.event_end).format('YYYY-MM-DD');

    let backgroundColor = '';
    const pillarCategory = item?.pillar_categories
      ? item?.pillar_categories[0]?.parent || item?.pillar_categories[1]?.parent
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

    if (moment(startDate).isSame(endDate)) {
      markedDay[startDate] = {
        color: backgroundColor,
        textColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
      };
    } else {
      const dates = getDates(
        new Date(moment(startDate).format('YYYY-MM-DD')),
        new Date(moment(endDate).format('YYYY-MM-DD')),
      );
      dates.map((item, index) => {
        if (index === 0) {
          markedDay[moment(item).format('YYYY-MM-DD')] = {
            startingDay: true,
            color: backgroundColor,
            textColor: 'white',
            borderRadius: 10,
          };
        } else if (dates?.length - 1 === index) {
          markedDay[moment(item).format('YYYY-MM-DD')] = {
            endingDay: true,
            color: backgroundColor,
            textColor: 'white',
            borderRadius: 10,
          };
        } else {
          markedDay[moment(item).format('YYYY-MM-DD')] = {
            color: backgroundColor,
            textColor: 'white',
            borderRadius: 10,
          };
        }
      });
    }
  });

  const renderItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('MMMM DD ');
    const eventStart = moment(item.event_start).format('MMMM DD -');
    const eventEnd = moment(item.event_end).format('MMMM DD ');
    const startdate = eventStart.split(' ', 3)[1].split('', 3);
    const enddate = eventEnd.split(' ', 3)[1].split('', 3);

    const backStartTimeStamp = item?.event_start;
    const deviceTimeZone = RNLocalize.getTimeZone();

    const today = moment().tz(deviceTimeZone);
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

    let convertedToLocalTime = formatTimeByOffset(
      backStartTimeStamp,
      currentTimeZoneOffsetInHours,
    );

    const time = moment(item.event_start).format('h:mma');

    let organizer = item?.organizer?.term_name;
    let description = item?.organizer?.description;
    if (organizer === undefined) {
      organizer = ' ';
    } else {
      organizer = <Text>Hosted By {item?.organizer?.term_name}</Text>;
    }

    if (description === undefined) {
      description = ' ';
    } else {
      description = item?.organizer?.description;
    }

    let borderColor = '';
    let backgroundImage = '';
    let pillarname = '';
    const pillarCategory = item?.pillar_categories
      ? item?.pillar_categories[0]?.parent || item?.pillar_categories[1]?.parent
      : '';
    switch (pillarCategory) {
      case GROWTH_COMMUNITY_ID:
      case 0:
        borderColor = Colors.COMMUNITY_COLOR;
        pillarname = 'Growth Community';
        backgroundImage = require('../../../assets/img/Rectangle2.png');
        break;
      case GROWTH_CONTENT_ID:
      case 0:
        borderColor = Colors.PRACTICE_COLOR;
        pillarname = 'Growth Content';
        backgroundImage = require('../../../assets/img/best-practice-bg.png');
        break;

      default:
        borderColor = Colors.COACHING_COLOR;
        pillarname = 'Growth Coaching';
        backgroundImage = require('../../../assets/img/Rectangle.png');
    }

    let nav = 'coachingSession';
    if (item?.pillar_categories[0]?.slug === 'growth-leadership-coaching') {
      nav = 'coachingSession';
    } else {
      nav = 'EventDetail';
    }

    return (
      <View>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate(nav, {
              id: item.ID,
              title: pillarname,
              image: backgroundImage,
            });
            await analytics().logEvent(item?.title, {
              id: item.ID,
              item: item.title,
            });
          }}>
          <View style={[styles.eventCard, styles.shadowProp]} key={index}>
            <Text
              style={{
                paddingVertical: 20,
                marginLeft: 5,
                marginRight: 5,
                fontSize: 12,
                color: '#030303',
              }}>
              {time}
            </Text>

            <View style={[styles.eventDetails, {borderColor: borderColor}]}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{item?.title}</Text>
                <Text style={styles.eventParagraph}>
                  {organizer} {description}
                </Text>
              </View>
              <View style={styles.eventDate}>
                <Text style={styles.eventDateText}>
                  {actualDate === eventEnd
                    ? actualDate.substring(0, 3).split(' ', 3)[0] +
                      actualDate.split(/(\s+)/)[1] +
                      startdate[0] +
                      startdate[1]
                    : eventStart.split(/(\s+)/)[2] ===
                      eventEnd.split(/(\s+)/)[2]
                    ? eventStart.substring(0, 3).split(/(\s+)/)[0] +
                      eventStart.split(/(\s+)/)[4] +
                      eventEnd.substring(0, 3).split(' ', 3)[0] +
                      eventEnd.split(/(\s+)/)[1] +
                      enddate[0] +
                      enddate[1] +
                      enddate[2]
                    : actualDate.substring(0, 3).split(' ', 3)[0] +
                      actualDate.split(/(\s+)/)[1] +
                      startdate[0] +
                      startdate[1] +
                      eventStart.split(/(\s+)/)[4] +
                      eventEnd.substring(0, 3).split(' ', 3)[0] +
                      eventEnd.split(/(\s+)/)[1] +
                      enddate[0] +
                      enddate[1]}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              style={{
                flex: 1,
                // alignItems: 'center',
                borderWidth: 0.3,
                paddingVertical: 10,
                borderRadius: 10,
                paddingLeft: 20,
                width: 100,
                borderColor: 'gray',
                marginRight: 10,
              }}>
              <Text style={{fontSize: 12, color: '#030303'}}>
                {showAllEvents ? 'All Events' : 'My Events'}
              </Text>
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color="black"
                style={{position: 'absolute', right: 15, top: 8}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRegionVisible(true)}
              style={{
                flex: 1,
                // alignItems: 'center',
                borderWidth: 0.3,
                paddingVertical: 10,
                borderRadius: 10,
                width: 100,
                paddingLeft: 20,
                borderColor: 'gray',
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#030303',
                }}>
                {mobileRegion ? mobileRegion : 'ALL REGION'}
              </Text>
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color="black"
                style={{position: 'absolute', right: 15, top: 8}}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.calendar, styles.shadowProp]}>
            <Calendar
              markingType={'period'}
              onMonthChange={async month => {
                cleanCalendarEvent();
                setCalendarMonth(moment(month?.dateString).format('MM'));
                setCalendarYear(moment(month?.dateString).format('YYYY'));
                setCurrentMonth(moment(month?.dateString).format('MMMM'));

                await fetchAllCalendarEvent({
                  year: moment(month?.dateString).format('YYYY'),
                  month: moment(month?.dateString).format('MM'),
                  all_events: showAllEvents,
                  region: mobileRegion,
                })
                  .then(response => {
                    if (response?.payload?.code === 200) {
                      setCurrentEvents(response?.payload?.data);
                    } else {
                      setCurrentEvents([]);
                    }
                  })
                  .catch(e => {
                    setCurrentEvents([]);
                  });
              }}
              markedDates={markedDay}
            />
          </View>
          <View style={styles.events}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {currentMonth} Events
            </Text>
            {calendarEventLoading && <Loading />}
            {!calendarEventLoading && (
              <FlatList
                vertical
                showsVerticalScrollIndicator={true}
                data={currentEvents}
                renderItem={renderItem}
              />
            )}
          </View>
          <Modal transparent visible={pickerVisible}>
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
                  onPress={() => setPickerVisible(false)}
                  style={{alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      padding: 15,
                      fontSize: 18,
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>

                <View>
                  <Picker
                    selectedValue={showAllEvents}
                    mode="dropdown"
                    itemTextStyle={{fontSize: 14}}
                    onValueChange={async (itemValue, itemIndex) => {
                      setShowAllEvents(itemValue);
                      await fetchAllCalendarEvent({
                        year: calendarYear,
                        month: calendarMonth,
                        all_events: itemValue,
                        region: mobileRegion,
                      })
                        .then(response => {
                          if (response?.payload?.code === 200) {
                            setCurrentEvents(response?.payload?.data);
                          } else {
                            setCurrentEvents([]);
                          }
                        })
                        .catch(e => {
                          setCurrentEvents([]);
                        });
                    }}>
                    <Picker.Item label="All Events" value={true} />
                    <Picker.Item label="My Events" value={false} />
                  </Picker>
                </View>
              </View>
            </View>
          </Modal>
          <Modal transparent visible={regionVisible}>
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
                    selectedValue={mobileRegion}
                    mode="dropdown"
                    itemTextStyle={{fontSize: 12}}
                    onValueChange={async itemValue => {
                      setMobileRegion(itemValue);

                      await fetchAllCalendarEvent({
                        year: calendarYear,
                        month: calendarMonth,
                        all_events: showAllEvents,
                        region: itemValue,
                      })
                        .then(response => {
                          if (response?.payload?.code === 200) {
                            setCurrentEvents(response?.payload?.data);
                          } else {
                            setCurrentEvents([]);
                          }
                        })
                        .catch(e => {
                          setCurrentEvents([]);
                        });
                    }}>
                    {region?.region_options?.map(item => {
                      return (
                        <Picker.Item
                          label={item?.mobile_region}
                          value={item?.mobile_region}
                          //   key={key}
                          style={{fontSize: 14}}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <FloatingButton {...props} navigation={navigation} />
      <BottomNav {...props} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    marginBottom: 20,
  },
  yearTab: {
    width: '90%',
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  activeWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  passiveWrapper: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 25,
    paddingRight: 30,
  },
  wrapper: {
    top: '20%',
  },
  calendar: {
    width: '95%',
    padding: 5,
    marginLeft: 10,
    marginTop: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  events: {
    padding: 12,
    borderWidth: 0.1,
    paddingBottom: 50,
  },
  eventCard: {
    // height: 82,
    marginTop: 15,
    marginLeft: 2,
    marginRight: 2,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  eventTheme: {
    height: '100%',
    width: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(128,186,116,1)',
  },
  eventDetails: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderLeftWidth: 10,
  },
  eventInfo: {
    paddingRight: 5,
    flex: 5,
  },
  eventTitle: {
    fontSize: 11,
    color: '#030303',
  },
  eventParagraph: {
    fontSize: 8,
    color: '#030303',
  },
  eventDate: {
    flex: 1,
    padding: 5,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  eventDateText: {
    textAlign: 'center',
    color: '#030303',
    fontSize: 12,
  },
  buttonWrapper: {
    width: 350,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 10,
    marginTop: 15,
    marginLeft: 20,
  },
  dropdown: {},
  pickerWrapper: {
    display: 'flex',
    flexDirection: 'row',
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default EventCalendar;
