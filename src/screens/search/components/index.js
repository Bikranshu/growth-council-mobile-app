import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import SearchBox from '../../../shared/form/SearchBar';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import Loading from '../../../shared/loading';

const Search = props => {
  const {
    navigation,
    searches,
    searchLoading,
    searchError,
    searchEventsByIdentifier,
    cleanSearch,
  } = props;

  const eventItems = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);

    let backgroundColor = '';
    let backgroundImage = '';
    let pillarname = '';
    switch (item?.pillar_categories[0]?.parent) {
      case 0:
      case 117:
        backgroundColor = Colors.COMMUNITY_COLOR;
        pillarname = 'Growth Community';
        backgroundImage = require('../../../assets/img/Rectangle2.png');

        break;

      case 0:
      case 118:
        backgroundColor = Colors.PRACTICE_COLOR;
        pillarname = 'Growth Content';
        backgroundImage = require('../../../assets/img/best-practice-bg.png');
        break;

      default:
        backgroundColor = Colors.COACHING_COLOR;
        pillarname = 'Growth Coaching';
        backgroundImage = require('../../../assets/img/Rectangle.png');
    }

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
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EventDetail', {
              id: item.ID,
              title: pillarname,
              image: backgroundImage,
            })
          }>
          <View style={[styles.eventCard, styles.shadowProp]} key={index}>
            <View
              style={[styles.eventTheme, {backgroundColor: backgroundColor}]}
            />
            <View style={styles.eventDetails}>
              <View style={styles.eventInfo}>
                <Text style={styles.evnetTitle}>{item?.title}</Text>
                <Text style={styles.eventParagraph}>
                  {organizer} {description}
                </Text>
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

  const searchTag = ({item, index}) => {
    let navigationPath = '';
    let backgroundImage = '';
    let pillarname = '';

    switch (item?.slug) {
      case 'community':
        navigationPath = 'Growth Community';
        pillarname = 'Growth Community';
        backgroundImage = require('../../../assets/img/Rectangle2.png');
        break;
      case 'best-practices':
        navigationPath = 'Growth Content';
        pillarname = 'Growth Content';
        backgroundImage = require('../../../assets/img/best-practice-bg.png');
        break;
      case 'growth-coaching':
        navigationPath = 'Growth Coaching';
        pillarname = 'Growth Coaching';
        backgroundImage = require('../../../assets/img/Rectangle.png');
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigationPath, {
              pillarId: item.term_id,
              title: pillarname,
              image: backgroundImage,
            })
          }>
          <View style={[styles.searchTagBtn, styles.shadowProp]}>
            <Text style={styles.searchTabBtnText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderMiddleItem = ({item, index}) => {
    let backgroundImage = require('../../../assets/img/Rectangle2.png');
    let pillarname = 'Growth Community';
    let poePage = 'CommunityDetail';

    if (item?.parent === 119) {
      if (item?.slug === 'executive-coaching-clinic') {
        poePage = 'CommunityDetail';
        pillarname = 'Growth Coaching';
        backgroundImage = require('../../../assets/img/Rectangle.png');
      } else {
        poePage = 'GrowthDetail';
        pillarname = 'Growth Coaching';
        backgroundImage = require('../../../assets/img/Rectangle.png');
      }
    } else if (item?.parent === 118 || item?.parent === 133) {
      poePage = 'CommunityDetail';
      pillarname = 'Growth Content';
      backgroundImage = require('../../../assets/img/best-practice-bg.png');
    }

    return (
      <TouchableOpacity
        onPress={() => {
          if (
            item.slug === 'annual-ceo-survey' ||
            item.slug === 'innovation-generator'
          ) {
            navigation.navigate('Search');
          } else if (item.slug === 'content-library') {
            navigation.navigate('ContentLibrary');
          } else {
            navigation.navigate(poePage, {
              poeId: item?.term_id,
              pillarId: item?.parent,
              title: pillarname,
              image: backgroundImage,
            });
          }
        }}>
        <View style={styles.middleWrapper}>
          <View style={[styles.middleW, styles.shadowProp]}>
            <Image
              source={{uri: item?.image}}
              style={{width: 30, height: 35}}
			  resizeMode="contain"
            />
          </View>
          <Text style={{marginTop: 8, fontSize: 10}}>{item?.name}</Text>
        </View>
      </TouchableOpacity>
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
      <View style={styles.container}>
        <ImageBackground
          style={{width: '100%'}}
          source={require('../../../assets/img/search_back_image.png')}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginTop: 30}}>
            <View style={{marginTop: 10}}>
              <Ionicons name={'arrow-back'} size={50} color="white" />
            </View>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '95%',
            }}>
            <SearchBox searchEventsByIdentifier={searchEventsByIdentifier} />
          </View>
        </ImageBackground>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,

            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
          }}>
          <View style={{marginTop: 20}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={searches.pillars}
              renderItem={searchTag}
            />
          </View>

          <View style={styles.middle}>
            <Text
              style={{fontFamily: Typography.FONT_SF_SEMIBOLD, fontSize: 11}}>
              Suggestions
            </Text>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              {searchLoading && <Loading />}

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={searches.poes}
                renderItem={_renderMiddleItem}
              />
            </View>
          </View>

          <View style={styles.events}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={searches.events_sessions}
              renderItem={eventItems}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    width: '100%',
  },
  top: {
    height: 200,
    marginTop: 80,
    margin: 10,
    justifyContent: 'center',
  },

  topWrapper: {
    height: 170,
    width: 300,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 50,
  },
  header: {
    margin: 10,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    marginTop: 10,
    fontWeight: '800',
    color: 'white',
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: '700',
    color: 'white',
  },
  middle: {
    marginLeft: 10,
    marginTop: 5,
  },
  middleWrapper: {
    width: 80,
    borderRadius: 20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  middleW: {
    backgroundColor: 'white',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  headingText3: {
    ...CommonStyles.headingText3,
    fontFamily: Typography.FONT_NORMAL,
    padding: 4,
  },
  bottom: {
    height: 190,
    margin: 10,
    width: 400,
  },
  bottomWrapper: {
    width: 120,
    height: 140,
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  searchTagBtn: {
    backgroundColor: '#ffff',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    padding: 15,
  },
  searchTabBtnText: {
    color: '#060606',
    fontSize: 12,
  },
  events: {
    padding: 20,
  },
  eventCard: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 5,
    marginRight: 2,
  },
  eventTheme: {
    width: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
    fontSize: 14,
    fontFamily: Typography.FONT_SF_REGULAR,
  },
  eventParagraph: {
    fontSize: 10,
  },
  eventDate: {
    flex: 1,
    height: 60,
    padding: 10,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    fontSize: 18,
  },
  eventDateText: {
    textAlign: 'center',
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
    zIndex: 1011,
  },
});

export default Search;
