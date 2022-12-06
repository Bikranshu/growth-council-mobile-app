import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import {Button} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {GROWTH_COMMUNITY_ID, GROWTH_CONTENT_ID} from '../../../constants';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import {formatTimeByOffset} from '../../event/components/timezone';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Loading from '../../../shared/loading';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';

const EventForum = props => {
  const {navigation, route, pastEvent, pastEventLoading, pastEventForum} =
    props;
  const [value, setValue] = useState('Current/Upcoming Events');

  useEffect(() => {
    pastEventForum();
  }, []);

  const _renderItem = ({item, index}) => {
    const actualDate = moment(item?.event_start).format('LLLL').split(',', 6);
    const date = actualDate[1].split(' ', 3);

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

    const backStartTimeStamp = item?.event_start;
    const deviceTimeZone = RNLocalize.getTimeZone();

    const today = moment().tz(deviceTimeZone);
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

    let convertedToLocalTime = formatTimeByOffset(
      backStartTimeStamp,
      currentTimeZoneOffsetInHours,
    );

    const time = moment(convertedToLocalTime).format('h:mma');
    let nav = 'coachingSession';
    if (item?.pillar_categories[0]?.slug === 'growth-leadership-coaching') {
      nav = 'coachingSession';
    } else {
      nav = 'EventDetail';
    }

    // let backgroundImage = '';
    // let pillarname = '';
    // switch (
    //   item?.pillar_categories[0]?.parent ||
    //   item?.pillar_categories[1]?.parent
    // ) {
    //   case GROWTH_COMMUNITY_ID:
    //   case 0:
    //     backgroundImage = require('../../../assets/img/Rectangle2.png');
    //     pillarname = 'Growth Community';
    //     break;
    //   case GROWTH_CONTENT_ID:
    //   case 0:
    //     backgroundImage = require('../../../assets/img/best-practice-bg.png');
    //     pillarname = 'Growth Content';
    //     break;

    //   default:
    //     backgroundImage = require('../../../assets/img/Rectangle.png');
    //     pillarname = 'Growth Coaching';
    // }

    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Discussion', {
              eventID: item?.ID,
              title: item?.title,
            })
          }>
          <View style={[styles.middleWrapper, styles.shadowProp]}>
            <View style={styles.wrapper}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.text, {width: '80%', marginRight: 10}]}>
                  {item?.title}
                </Text>
              </View>

              <View style={styles.iconWrapper}>
                {item?.organizer !== undefined &&
                  item?.organizer !== null &&
                  item?.organizer !== '' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginRight: 10,
                      }}>
                      <Ionicon name={'person'} size={20} color="#0B0B45" />
                      <Text style={[styles.text, {fontSize: 10, width: 190}]}>
                        {organizer} {description}
                      </Text>
                    </View>
                  )}
                {item?.event_start !== undefined &&
                  item?.event_start !== null &&
                  item?.event_start !== '' && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicon name={'time'} size={20} color="#0B0B45" />
                      <Text style={[styles.text, {fontSize: 12}]}>{time}</Text>
                    </View>
                  )}
              </View>
              <View style={styles.iconWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Ionicon name={'calendar'} size={20} color="#0B0B45" />
                  <Text style={[styles.text, {fontSize: 12, width: 100}]}>
                    {date[1]} {date[2]}
                  </Text>
                </View>
                {item?.location?.location_address !== undefined &&
                  item?.location?.location_address !== null &&
                  item?.location?.location_address !== '' && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicon name={'location'} size={20} color="#0B0B45" />
                      <Text style={[styles.text, {fontSize: 12, width: 120}]}>
                        {item?.location?.location_address}
                      </Text>
                    </View>
                  )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
        <View style={styles.container}>
          <View style={styles.buttonWrapper}>
            <ButtonToggleGroup
              highlightBackgroundColor={'white'}
              highlightTextColor={'#0B0B45'}
              inactiveBackgroundColor={'transparent'}
              inactiveTextColor={'grey'}
              values={['Current/Upcoming Events', 'Past Events']}
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
          {pastEventLoading && <Loading />}
          {value === 'Current/Upcoming Events' && <View></View>}

          {value === 'Past Events' && (
            <FlatList
              Vertical
              showsVerticalScrollIndicator={false}
              data={pastEvent}
              renderItem={_renderItem}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default EventForum;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
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

  text: {
    color: '#343537',
    marginLeft: 5,
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
  },

  wrapper: {
    marginLeft: 10,
    marginTop: 10,
  },
  middleWrapper: {
    paddingBottom: 20,
    width: '98%',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    padding: 5,
    left: 5,
    backgroundColor: 'white',
    // borderWidth: 0.3,
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

  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
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
