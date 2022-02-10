import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
	Modal
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import {Picker} from '@react-native-picker/picker';
import {useToast} from 'native-base';
import {CommonStyles, Colors} from '../../../theme';

const EventCalendar = props => {
    const {
        navigation,
        route,
        calendarEvents,
        calendarEventLoading,
        calendarEventError,
        fetchAllCalendarEvent,
        cleanCalendarEvent,
    } = props;

    const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
    const [currentEvents, setCurrentEvents] = useState([]);
	const [allEvents, setAllEvents] = useState( );
	const [pickerVisible, setPickerVisible] = useState(false);

    useEffect(() => {
        const fetchCalendarEventAsync = async () => {
            await fetchAllCalendarEvent({
                year: moment().format('YYYY'),
                month: moment().format('MM'),
				// all_events:allEvents,
				
            }).then(response => {
                if (response?.payload?.code === 200) {
                    setCurrentEvents(response?.payload);
                }
            });
        };
        fetchCalendarEventAsync();
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
        const startDate = moment(item.event_start).format('YYYY-MM-DD');
        const endDate = moment(item.event_end).format('YYYY-MM-DD');
        if (moment(startDate).isSame(endDate)) {
            markedDay[startDate] = {
                color: 'green',
                textColor: 'white',
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
                        color: 'green',
                        textColor: 'white',
                    };
                } else if (dates?.length - 1 === index) {
                    markedDay[moment(item).format('YYYY-MM-DD')] = {
                        endingDay: true,
                        color: 'green',
                        textColor: 'white',
                    };
                } else {
                    markedDay[moment(item).format('YYYY-MM-DD')] = {
                        color: 'green',
                        textColor: 'white',
                    };
                }
            });
        }
		
    });
	
	console.log({calendarEvents})


    const renderItem = ({item, index}) => {
        //date
        const actualDate = moment(item.event_start).format('ll').split(',', 3);
        const date = actualDate[0].split(' ', 3);

        //time
        let dt = item.event_start;
        dt = dt.split(' ');
        let [date1, time] = [
            dt[0].split('-').map(Number),
            dt[1].split(':').map(Number),
        ];

        return (
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
                    <View style={[styles.eventCard, styles.shadowProp]} key={index}>
                        <Text
                            style={{
                                marginTop: 30,
                                marginLeft: 10,
                                marginRight: 10,
                                fontSize: 17,
                            }}>
                            {time[0]}:{time[1]}
                        </Text>

                        <View style={styles.eventDetails}>
                            <View style={styles.eventInfo}>
                                <Text style={styles.eventTitle}>{item?.title}</Text>
                                <Text style={styles.eventParagraph}>
                                    Hosted by {item?.organizer?.term_name}{' '}
                                    {item?.organizer?.description}
                                </Text>
                            </View>
                            <View style={styles.eventDate}>
                                <Text style={styles.eventDateText}>
                                    {date[1]}
                                    {'\n'}
                                    {date[0]}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (

        <View style={styles.container}>
			<View style={styles.iconWrapper}>
				<TouchableOpacity
					onPress={() => setPickerVisible(true)}
					style={{
					flex: 1,
					alignItems: 'center',
					borderWidth: 1,
					paddingVertical: 10,
					borderRadius: 10,
					borderColor: 'gray',
					marginRight: 30,
					}}>
					<Text style={{fontSize: 12}}>
					{/* {allEvents === 'Select Events' ? 'Select Events' : allEvents} */}
					</Text>
				</TouchableOpacity>
			</View>
				<View style={[styles.calendar, styles.shadowProp]}>
                <Calendar
                    markingType={'period'}
                    onMonthChange={async month => {
                        cleanCalendarEvent();
                        setCurrentMonth(moment(month?.dateString).format('MMMM'));
                        await fetchAllCalendarEvent({
                            year: moment(month?.dateString).format('YYYY'),
                            month: moment(month?.dateString).format('MM'),
							// all_events:allEvents,
                        }).then(response => {
                            if (response?.payload?.code === 200) {
                                setCurrentEvents(response?.payload);
                            }
                        });
                    }}
                    markedDates={markedDay}
                  
                />
            </View>
            <View style={styles.events}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {currentMonth} Events
                </Text>
                {calendarEventLoading && (
                    <View style={styles.loading1}>
                        <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={60}/>
                    </View>
                )}
                {!calendarEventLoading && (
                    <FlatList
                        Vertical
                        showsVerticalScrollIndicator={false}
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
            <View >
              <Picker
                // selectedValue={allEvents}
                mode="dropdown"
                itemTextStyle={{fontSize: 14}}
                onValueChange={async (itemValue, itemIndex) => {
                //   setAllEvents(itemValue);
                  await fetchAllCalendarEvent({
					year: moment().format('YYYY'),
					month: moment().format('MM'),
					// all_events:allEvents,	
					})
                }}>
                <Picker.Item label="All Events" value="All Events" />
        		<Picker.Item label="My Events" value="My Events" />
                  
               
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
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
		justifyContent:'center',
		alignItems: 'center',
		marginTop:20,
		marginLeft:20,
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
        width: '98%',
        padding: 5,
        marginLeft: 5,
        marginTop: 30,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
    },
    events: {
        padding: 20,
        borderWidth: 0.1,
    },
    eventCard: {
        height: 82,
        marginTop: 15,
        marginLeft: 2,
        marginRight: 2,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
    eventTheme: {
        height: '100%',
        width: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(128,186,116,1)',
    },
    eventDetails: {
        flex: 1,
        height: 80,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderLeftWidth: 10,
        borderColor: '#80BA74',
    },
    eventInfo: {
        paddingRight: 5,
        flex: 5,
    },
    eventTitle: {
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
    },
    eventDateText: {
        textAlign: 'center',
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
