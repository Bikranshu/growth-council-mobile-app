import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    ScrollView
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Calendar} from 'react-native-calendars';

import {CommonStyles, Colors} from '../../../theme';

const EventCalendar = (props) => {

    const [region, setRegion] = useState("Region");
    const [timezone, setTimezone] = useState("java");
    const [industry, setIndustry] = useState("java");
    const [pillar, setPillar] = useState("Growth Community");
    const [value, setValue] = useState('2021');

    const [activeYear, setActiveYear] = useState("2021");

    const events = [
        {
            eventType: 'Best Practices',
            eventTitle: 'Executive Coaching Clinic On Goal Setting',
            eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
            eventDay: '01',
            eventMonth: 'AUG',
            eventTime: "9:00"
        },
        {
            eventType: 'Growth Coaching',
            eventTitle: 'Executive Coaching Clinic On Goal Setting',
            eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
            eventDay: '01',
            eventMonth: 'AUG',
            eventTime: "9:00"
        },
        {
            eventType: 'Best Practices',
            eventTitle: 'Executive Coaching Clinic On Goal Setting',
            eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
            eventDay: '01',
            eventMonth: 'AUG',
            eventTime: "9:00"
        },
        {
            eventType: 'Growth Community',
            eventTitle: 'Executive Coaching Clinic On Goal Setting',
            eventHost: 'Michael “Coop” Cooper Founder, Innovators + Influencer',
            eventDay: '01',
            eventMonth: 'AUG',
            eventTime: "9:00"
        },
    ];

    const eventItems = ({item, index}) => {
        return (
            <View style={styles.eventCard}>
                <Text style={{marginTop: 30, marginLeft: 10, marginRight: 10, fontSize: 17}}>{item.eventTime}</Text>
                <View style={styles.eventTheme}/>
                <View style={styles.eventDetails}>
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{item.eventTitle}</Text>
                        <Text style={styles.eventParagraph}>Hosted by {item.eventHost}</Text>
                    </View>
                    <View style={styles.eventDate}>
                        <Text style={styles.eventDateText}>
                            {item.eventDay}
                            {'\n'}
                            {item.eventMonth}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };


    const years = [
        {
            id: 1,
            title: '2020',
        },
        {
            id: 2,
            title: '2021',
        },
        {
            id: 3,
            title: '2022',
        },
    ];

    const renderItem = ({item}) => (
        <Text>{item.title}</Text>
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <View style={styles.yearTab}>
                    {years.map((year, i) => {
                        return (
                            <>
                                <TouchableOpacity key={i} style={activeYear === year.title ? styles.activeWrapper : styles.passiveWrapper} onPress={() => alert(year.title)}>
                                    <Text style={styles.linkText}>{year.title}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    })}
                </View> */}
				{/* <ScrollView horizontal={true} >
                
                    <Picker
                        selectedValue={region}
						mode={'dropdown'}
                        style={{height: 50, width: 130, borderRightWidth:0.2}}
                        onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
                    >
                        <Picker.Item label="Region" value="region" style={{fontSize: 10}}/>
                        <Picker.Item label="Kathmandu" value="kathmandu" style={{fontSize: 10}}/>
                        <Picker.Item label="Bhaktapur" value="bhaktapur" style={{fontSize: 10}}/>
                    </Picker>

                    <Picker
                        selectedValue={timezone}
                        mode={'dropdown'}
                        style={{height: 50, width: 130}}
                        onValueChange={(itemValue, itemIndex) => setTimezone(itemValue)}
                    >
                        <Picker.Item label="Timezone" value="timezone" style={{fontSize: 10}}/>
                        <Picker.Item label="Kathmandu" value="kathmandu" style={{fontSize: 10}}/>
                        <Picker.Item label="Bhaktapur" value="bhaktapur" style={{fontSize: 10}}/>
                    </Picker>
                    <Picker
                        selectedValue={industry}
                        mode={'dropdown'}
                        style={{height: 50, width: 130}}
                        onValueChange={(itemValue, itemIndex) => setIndustry(itemValue)}
                    >
                        <Picker.Item label="Industry" value="industry" style={{fontSize: 10}}/>
                        <Picker.Item label="Kathmandu" value="kathmandu" style={{fontSize: 10}}/>
                        <Picker.Item label="Bhaktapur" value="bhaktapur" style={{fontSize: 10}}/>
                    </Picker>
                    <Picker
                        selectedValue={pillar}
                        mode={'dropdown'}
                        style={{height: 50, width: 130}}
                        onValueChange={(itemValue, itemIndex) => setPillar(itemValue)}
                    >
                        <Picker.Item label="Pillar" value="pillar" style={{fontSize: 10}}/>
                        <Picker.Item label="Growth Community" value="Growth Community" style={{fontSize: 10}}/>
                        <Picker.Item label="Best Practice" value="Best Practice" style={{fontSize: 10}}/>
                        <Picker.Item label="Growth Coaching" value="Growth Coaching" style={{fontSize: 10}}/>
                    </Picker>
               
					</ScrollView> */}

                <View style={styles.calendar}>
                    <Calendar
                        markingType={'period'}
                        markedDates={{
                            '2021-05-15': {marked: true, dotColor: '#50cebb'},
                            '2021-05-16': {marked: true, dotColor: '#50cebb'},
                            '2021-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                            '2021-05-22': {color: '#70d7c7', textColor: 'white'},
                            '2021-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                            '2021-05-24': {color: '#70d7c7', textColor: 'white'},
                            '2021-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
                        }}
                    />
                </View>
                <View style={styles.events}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>August Events</Text>
                    <FlatList
                        Vertical
                        showsVerticalScrollIndicator={false}
                        data={events}
                        renderItem={eventItems}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,

    },
    yearTab: {
        width: "90%",
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2',
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
		marginTop:20,
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
    eventTitle: {
        marginBottom: 5,
    },
    eventParagraph: {
        fontSize: 10,
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
});

export default EventCalendar;