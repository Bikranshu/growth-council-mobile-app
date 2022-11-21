import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {Button, useToast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import {formatTimeByOffset} from '../../event/components/timezone';
import moment from 'moment-timezone';
import 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import {BubblesLoader} from 'react-native-indicator';

import ToastMessage from '../../../shared/toast';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Loading from '../../../shared/loading';

const sessionAbout = props => {
  const {
    navigation,
    route,
    traits,
    traitsLoading,
    traitsError,
    fetchAllTraitBySession,
    cleanTraits,

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
    setSessionStatus(sessions?.register_status);
  }, [sessions]);

  const registerSessionBySessionID = async sessionID => {
    const response = await registerSessionByIdentifier({session_id: sessionID});
    if (response?.payload?.code === 200) {
      setSessionStatus(true);
      ToastMessage.show('You have successfully RSVP’d  this event.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };
  const isSessionLoaded = Object.keys(sessions).length === 0;
  const actualDate = moment(sessions?.event_start).format('LLLL').split(',', 6);
  const date = actualDate[1].split(' ', 3);

  let description = sessions?.descirption;
  if (description !== undefined) {
    description = sessions?.descirption;
  } else {
    description = '';
  }

  const _renderItem = ({item, index}, navigation) => {
    return (
      <View style={styles.traitWrapper}>
        <View style={[styles.traitW, styles.shadowProp]}>
          <Text style={{paddingHorizontal: 10, fontSize: 12}}>
            {item?.title}
          </Text>
        </View>
      </View>
    );
  };
  const backStartTimeStamp = sessions?.event_start;
  const backEndTimeStamp = sessions?.event_end;
  const deviceTimeZone = RNLocalize.getTimeZone();

  const today = moment().tz(deviceTimeZone);
  const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

  const GobalDate = moment(timeToDisplay).format('MMMM D, dddd, h:mma - ');
  const GobalStartMonth = moment(timeToDisplay).format('MMMM D');

  const GobalDateEnd = moment(timeToEnd).format('MMMM D, dddd, h:mm a ');
  const GobalEndTime = moment(timeToEnd).format('h:mma ');
  const GobalEndMonth = moment(timeToEnd).format('MMMM D');

  const EventDate = moment(sessions?.event_start).format(
    'MMMM D, dddd, h:mma - ',
  );
  const EventStartMonth = moment(sessions?.event_start).format('MMMM D');

  const EventDateEnd = moment(sessions?.event_end).format(
    'MMMM D, dddd, h:mm a ',
  );
  const EventEndTime = moment(sessions?.event_end).format('h:mma ');
  const EventEndMonth = moment(sessions?.event_end).format('MMMM D');

  useEffect(() => {
    const convertedToLocalTime = formatTimeByOffset(
      backStartTimeStamp,
      currentTimeZoneOffsetInHours,
    );
    setTimeToDisplay(convertedToLocalTime);
    const convertedToLocalTimeEnd = formatTimeByOffset(
      backEndTimeStamp,
      currentTimeZoneOffsetInHours,
    );
    setTimeToEnd(convertedToLocalTimeEnd);
  }, [sessions]);

 

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <View style={{flexDirection: 'column'}}>
        {sessions?.show_date_in_app !== false &&
          sessions?.show_date_in_app !== undefined && (
            <View
              style={{
                flex: 1,
                paddingTop: 5,
                paddingBottom: 5,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#A1BA68',
                  height: 50,
                  width: 40,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons name={'event'} size={30} color={'white'} />
              </View>

              <View
                style={{
                  flex: 4,
                  paddingLeft: 5,
                  justifyContent: 'center',
                }}>
                {/* <Text style={styles.eventDetails}>{GobalDate} </Text> */}
                <Text style={styles.eventDetails}>
                  {/* {GobalStartMonth === GobalEndMonth
                ? GobalDate + GobalEndTime
                : GobalStartMonth +
                  GobalDate.split(/(\s+)/)[7] +
                  GobalDate.split(/(\s+)/)[8] +
                  GobalDate.split(/(\s+)/)[7] +
                  GobalEndMonth}{' '}
              ({deviceTimeZone}) /  */}
                  {/* {EventDate.split(/(\s+)/)[7]} */}
                  {EventStartMonth === EventEndMonth
                    ? EventDate + EventEndTime
                    : EventStartMonth +
                      EventDate.split(/(\s+)/)[7] +
                      EventDate.split(/(\s+)/)[8] +
                      EventDate.split(/(\s+)/)[7] +
                      EventEndMonth +
                      EventDate.split(/(\s+)/)[7]}
                  {sessions?.event_meta?.evo_event_timezone}
                </Text>
              </View>
              {!sessionStatus && (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      registerSessionBySessionID(route?.params?.id)
                    }>
                    <Feather
                      name={'plus-circle'}
                      size={30}
                      color={'rgba(54,147,172,1)'}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {sessionStatus && (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Feather
                    name={'check-circle'}
                    size={35}
                    color={'rgba(54,147,172,1)'}
                  />
                </View>
              )}
            </View>
          )}
        {sessions?.location?.location_address !== undefined &&
          sessions?.location?.location_address !== '' && (
            <View
              style={{
                flex: 1,
                paddingTop: 20,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#A1BA68',
                  height: 50,
                  width: 48,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name={'location-outline'} size={30} color={'white'} />
              </View>

              {!isSessionLoaded && (
                <View
                  style={{
                    flex: 5,
                    paddingLeft: 10,
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={styles.eventLocationDetails}>
                    {sessions?.location?.location_city}
                    {sessions?.location?.location_state}
                    {sessions?.location?.location_country}
                  </Text> */}
                  <Text style={styles.eventLocationDetails}>
                    {sessions?.location?.location_address}
                  </Text>
                </View>
              )}
            </View>
          )}
      </View>

      <View>
        <View style={{marginTop: 20}}>
          <Text style={styles.contentHeading}>Traits</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={traits}
          renderItem={item => _renderItem(item, navigation)}
        />
      </View>
      {/* {sessions?.organizer?.term_name !== undefined &&
        sessions?.organizer?.term_name !== '' && (
          <View style={{height: 150}}>
            <View style={{marginTop: 25}}>
              <Text style={styles.contentHeading}>Coach By</Text>
            </View>
            <View style={styles.hostdetail}>
              <View style={styles.hostimage}>
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
                }}
              />
            </View>
          </View>
        )} */}

      {sessions?.descirption !== undefined && sessions?.descirption !== '' && (
        <View style={{marginTop: 20}}>
          <Text style={styles.contentHeading}>Session Brief</Text>
          
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
          
        </View>
      )}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {sessionRegisterLoading && <Loading />}
        {!sessionStatus && (
          <Button
            style={styles.acceptButton}
            onPress={() => registerSessionBySessionID(route?.params?.id)}>
            <Text style={styles.acceptButtonText}>RSVP</Text>
          </Button>
        )}
        {sessionStatus && (
          <TouchableOpacity style={styles.registeredButton} disabled>
            <Image
              source={require('../../../assets/img/tick-icon.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={styles.registeredButtonText}>RSVP'd</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
  eventDetails: {
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 13,
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
    backgroundColor: '#A1BA68',
    height: 60,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140,
    borderRadius: 12,
    padding: 20,
    zIndex: 10,
    position: 'absolute',
  },
  topbanner1: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  topbanner2: {
    backgroundColor: 'rgba(128,186,116,1)',
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
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
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 25,
    padding: 10,
    borderColor: '#F26722',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  registeredButtonText: {
    height: 20,
    fontSize: 14,
    color: '#F26722',
    textAlign: 'center',
    width: '90%',
  },
  buttonWrapper: {
    width: 308,
    height: 40,
    backgroundColor: '#ECECEC',
    borderRadius: 15,
  },
  traitWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    flexDirection: 'row',
  },
  traitW: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 5,
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
    left: 5,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default sessionAbout;
