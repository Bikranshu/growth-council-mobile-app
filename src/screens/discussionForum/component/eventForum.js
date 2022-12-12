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
import {BubblesLoader} from 'react-native-indicator';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  GROWTH_COACHING_ID,
  GROWTH_COMMUNITY_ID,
  GROWTH_CONTENT_ID,
} from '../../../constants';
import moment from 'moment-timezone';
import {
  COACHING_COLOR,
  COMMUNITY_COLOR,
  PRACTICE_COLOR,
  PRIMARY_BACKGROUND_COLOR,
} from '../../../theme/colors';
import FloatingButton from '../../../shared/floatingButton';

import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Loading from '../../../shared/loading';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';

const EventForum = props => {
  const {navigation, route, pastEvent, pastEventLoading, pastEventForum} =
    props;

  useEffect(() => {
    pastEventForum();
  }, []);

  const _renderItem = ({item, index}) => {
    const actualTime = moment(item?.event_start).format('D MMMM, ddd ');
    const actualDate = moment(item?.event_start).format('h:mma ');
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

    let nav = 'coachingSession';
    if (item?.pillar_categories[0]?.slug === 'growth-leadership-coaching') {
      nav = 'coachingSession';
    } else {
      nav = 'EventDetail';
    }

    let backgroundImage = '';
    let pillarname = '';
    let backgroundColor = '';
    switch (
      item?.pillar_categories[0]?.parent ||
      item?.pillar_categories[1]?.parent
    ) {
      case GROWTH_COACHING_ID:
      case 0:
        backgroundImage = require('../../../assets/img/Rectangle.png');
        pillarname = 'Growth Coaching';
        backgroundColor = COACHING_COLOR;
        break;
      case GROWTH_CONTENT_ID:
      case 0:
        backgroundImage = require('../../../assets/img/best-practice-bg.png');
        backgroundColor = PRACTICE_COLOR;
        break;
      default:
        backgroundImage = require('../../../assets/img/Rectangle2.png');
        pillarname = 'Growth Community';
        backgroundColor = COMMUNITY_COLOR;
    }

    return (
      <View key={index} style={{paddingBottom: 10}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Discussion', {
              eventID: item?.ID,
              title: item?.title,
              backgroundColor: backgroundColor,
              organizer: item?.organizer?.term_name,
              image: backgroundImage,
              eventDate: item?.event_start,
              location: item?.location?.location_type,
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
                {item?.event_start !== undefined &&
                  item?.event_start !== null &&
                  item?.event_start !== '' && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicon
                        name={'calendar'}
                        size={20}
                        color={COMMUNITY_COLOR}
                      />
                      <Text
                        style={[
                          styles.text,
                          {fontSize: 10, color: COMMUNITY_COLOR},
                        ]}>
                        {actualTime}
                      </Text>
                    </View>
                  )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Ionicon
                    name={'time-outline'}
                    size={20}
                    color={COMMUNITY_COLOR}
                  />
                  <Text
                    style={[
                      styles.text,
                      {fontSize: 10, color: COMMUNITY_COLOR},
                    ]}>
                    {actualDate}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: '#EBECF0',
                justifyContent: 'center',
                padding: 10,
              }}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/img/JoinDiscussion.png')}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  resizeMode="cover"
                />
                <Text
                  style={[styles.text, {fontSize: 10, color: COMMUNITY_COLOR}]}>
                  Join Discussion
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
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
          {pastEventLoading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
            </View>
          )}

          <FlatList
            Vertical
            showsVerticalScrollIndicator={false}
            data={pastEvent}
            renderItem={_renderItem}
          />
        </View>
      </ScrollView>
	  <FloatingButton {...props} navigation={navigation} />

</View>
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
    width: '70%',
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
