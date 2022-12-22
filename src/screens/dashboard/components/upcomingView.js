import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';

import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';

const UpcomingView = props => {
  const {
    navigation,
    route,
    upcomingEvents,
    upcomingEventLoading,
    upcomingEventError,
    fetchAllUpcomingEvent,
    cleanUpcomingEvent,
  } = props;

  const _renderItem = ({item, index}, navigation) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    return (
      <View style={styles.eventCard}>
        {item?.pillar_categories[0]?.slug === 'growth-community' && (
          <View
            style={{
              height: '100%',
              width: 10,
              borderRadius: 50,
              backgroundColor: '#2a9df4',
            }}
          />
        )}
        {item?.pillar_categories[0]?.slug === 'basic-practices' && (
          <View
            style={{
              height: '100%',
              width: 10,
              borderRadius: 50,
              backgroundColor: '#ADD8E6',
            }}
          />
        )}
        {item?.pillar_categories[0]?.slug === 'growth-coaching' && (
          <View
            style={{
              height: '100%',
              width: 10,
              borderRadius: 50,
              backgroundColor: '#90EE90',
            }}
          />
        )}

        <View style={styles.eventDetails}>
          <View style={styles.eventInfo}>
            <Text style={styles.evnetTitle}>{item.title}</Text>
            <Text style={styles.eventParagraph}>
              Hosted by {item?.organizer?.term_name}{' '}
              {item?.organizer?.description}
            </Text>
          </View>
          <View style={styles.eventDate}>
            <Text>{date[1]}</Text>
            <Text>{date[0]}</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchAllUpcomingEventAsync = async () => {
      await fetchAllUpcomingEvent();
    };
    fetchAllUpcomingEventAsync();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.events}>
            <Text style={styles.eventsTitle}>UPCOMING EVENTS</Text>
            <View styles={styles.eventList}>
              <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                data={upcomingEvents}
                renderItem={_renderItem}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.01)',
    width: '100%',
    height: '100%',
  },
  meta: {
    width: '100%',
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f3354',
  },
  paragraph: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 5,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  moreButton: {
    width: '40%',
    borderRadius: 10,
    height: 40,
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
    marginLeft: 5,
  },
  moreButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 13,
    fontWeight: 'bold',
  },
  events: {
    padding: 10,
    width: '100%',
  },
  eventsTitle: {
    marginBottom: 15,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventList: {},
  eventCard: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 5,
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
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  eventInfo: {
    paddingRight: 5,
    flex: 5,
  },
  evnetTitle: {
    marginBottom: 5,
  },
  eventParagraph: {
    fontSize: 10,
  },
  eventDate: {
    width: 60,
    padding: 10,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    fontSize: 18,
  },
  eventDateText: {
    textAlign: 'center',
  },
});
export default UpcomingView;
