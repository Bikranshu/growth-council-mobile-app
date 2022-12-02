import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import ToastMessage from '../../../shared/toast';
import {Toast, useToast} from 'native-base';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {GROWTH_COMMUNITY_ID, GROWTH_CONTENT_ID} from '../../../constants';

const CouncilAllDetail = props => {
  const {
    navigation,
    route,
    upcomingEvents,
    upcomingEventLoading,
    upcomingEventError,
    fetchUpcomingEventsByIdentifier,
    cleanUpcomingEvent,
    pillarPOEs,
    pillarPOELoading,
    pillarPOEError,
    fetchAllPillarPOE,
    cleanPillarPOE,
    pillar_id,
  } = props;

  useEffect(() => {
    const fetchUpcomingEventAsync = async () => {
      await fetchUpcomingEventsByIdentifier(pillar_id);
    };

    fetchUpcomingEventAsync();
  }, []);

  useEffect(() => {
    const fetchAllPillarPOEAsync = async () => {
      await fetchAllPillarPOE(pillar_id);
    };
    fetchAllPillarPOEAsync();
    return () => {
      cleanPillarPOE();
    };
  }, []);

  const _renderItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

    let backgroundColor = '';
    const pillarCategory =
      item?.pillar_categories[0]?.parent || item?.pillar_categories[1]?.parent;
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
    return (
      <View>
        <TouchableOpacity
          onPress={() => ToastMessage.show('Please login to review further.')}>
          <View style={styles.eventCard} key={index}>
            <View style={[styles.eventTheme, {borderColor: backgroundColor}]} />
            <View style={styles.eventDetails}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                {/* <Text style={styles.eventParagraph}>
                  Hosted by {item?.organizer?.term_name}{' '}
                  {item?.organizer?.description}
                </Text> */}
              </View>
              <View style={styles.eventDate}>
                <Text style={styles.eventDateText}>
                  {date[0]}
                  {'\n'}
                  {date[1]}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const toast = useToast();
  const id = 'test-toast';

  const _renderPOE = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (!toast.isActive(id)) {
              toast.show({
                id,
                title: 'Please login to review further.',
              });
            }
            // ToastMessage.show('Please login to review further.')
          }}>
          <View style={styles.poeCard} key={index}>
            <View style={[styles.poeTheme, styles.shadowProp]}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: 35,
                  height: 35,
                }}
                resizeMode="contain"
              />
            </View>
            <View style={styles.eventDetails}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{item.name}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#001D3F'} />
      <View style={styles.container}>
        <ScrollView>
          {pillarPOEs?.length !== 0 &&
            pillarPOEs !== null &&
            pillarPOEs !== false &&
            pillarPOEs !== undefined && (
              <View style={styles.events}>
                <Text style={styles.poeTitle}>POINTS OF ENGAGEMENT </Text>
                <View styles={styles.eventList}>
                  <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    data={pillarPOEs}
                    renderItem={_renderPOE}
                  />
                </View>
              </View>
            )}
          {/* {upcomingEvents?.length !== 0 &&
            upcomingEvents !== null &&
            upcomingEvents !== false &&
            upcomingEvents !== undefined && (
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
            )} */}
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
    marginTop: 5,
    marginBottom: 10,
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
    padding: 20,
    width: '100%',
  },
  eventsTitle: {
    marginBottom: 34,
    fontWeight: '600',
    color: 'black',
  },
  poeTitle: {
    marginTop: 10,
    marginBottom: 30,
    fontWeight: '600',
    color: 'black',
  },
  eventList: {},
  eventCard: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,
  },
  poeCard: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    // backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 5,
    marginLeft: 2,
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
  poeTheme: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
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
  eventTheme: {
    width: 10,
    borderRadius: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 10,
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
  eventTitle: {
    marginBottom: 8,
    fontSize: 14,
    
  },
  eventParagraph: {
    fontSize: 8,
    
  },
  eventDate: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    fontSize: 18,
    height: 62,
    width: 56,
  },
  eventDateText: {
    textAlign: 'center',
    fontSize: 14,
   
  },
});
export default CouncilAllDetail;
