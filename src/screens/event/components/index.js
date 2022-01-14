import React, {useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    ImageBackground,
    Image,
} from 'react-native';
import {Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';

const Event = props => {
    const {
        navigation,
        route,
        events,
        eventLoading,
        eventError,
        fetchEventByIdentifier,
        cleanEvent,
    } = props;

    useEffect(() => {
        const fetchEventDetailAsync = async () => {
            await fetchEventByIdentifier(route.params.id);
        };
        fetchEventDetailAsync();
    }, []);

    const isEventLoaded = Object.keys(events).length === 0;
    const actualDate = moment(events?.event_start).format('LLLL').split(',', 6);
    const date = actualDate[1].split(' ', 3);

    console.log('route.params.id:::::::::::::::::', route.params.id);
    console.log('Event Detail:::::::::::::::::', events?.organizer_image);

    let backgroundColor = Colors.COMMUNITY_COLOR;
    const pillarCategory = events?.pillar_categories ? (events?.pillar_categories[0]?.slug) : '';
    switch (pillarCategory) {
        case "growth-coaching":
            backgroundColor = Colors.COACHING_COLOR;
            break;
        case "basic-practices":
            backgroundColor = Colors.PRACTICE_COLOR;
            break;
        case 'growth-community':
            backgroundColor = Colors.COMMUNITY_COLOR;
    }

    return (
        <ScrollView style={styles.scrollBox}>
            <View style={styles.container}>
                <ImageBackground
                    source={{uri: events?.image}}
                    resizeMode="cover"
                    style={{height: '55%'}}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                    />
                    <View
                        style={{
                            alignItems: 'center',
                        }}>

                        <View style={[styles.topbanner, {backgroundColor: backgroundColor}]}>
                            {!isEventLoaded && (
                                <Text style={styles.headingText1}>{events.title}</Text>
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            height: 28,
                            position: 'absolute',
                            top: 90,
                            left: 40,
                            backgroundColor: '#ffff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}>
                        <Text>Megatrend Workshop</Text>
                    </View>
                    <View>
                        <View style={[styles.content, {height: 'auto'}]}>
                            <View style={{height: 150, flexDirection: 'column'}}>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        flexDirection: 'row',
                                    }}>

                                    <View
                                        style={[{
                                            flex: 1,
                                            backgroundColor: 'rgba(54,147,172,1)',
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }, {backgroundColor: backgroundColor}]}>
                                        <MaterialIcons name={'event'} size={35} color={'white'}/>
                                    </View>


                                    <View
                                        style={{
                                            flex: 4,
                                            paddingLeft: 10,
                                        }}>
                                        {!isEventLoaded && (
                                            <Text style={styles.contentHeading}>
                                                {date[2]} {date[1]}, {actualDate[0]}
                                            </Text>
                                        )}

                                        {!isEventLoaded && (
                                            <Text>
                                                {events?.event_meta?._start_hour}:
                                                {events?.event_meta?._start_minute}
                                                {events?.event_meta?._start_ampm} /
                                                {events?.event_meta?._end_hour}:
                                                {events?.event_meta?._end_minute}
                                                {events?.event_meta?._end_ampm} (PDT)
                                            </Text>
                                        )}
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Feather
                                            name={'plus-circle'}
                                            size={35}
                                            color={'rgba(54,147,172,1)'}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        flexDirection: 'row',
                                    }}>


                                    <View
                                        style={[{
                                            flex: 1,
                                            backgroundColor: 'rgba(54,147,172,1)',
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }, {backgroundColor: backgroundColor}]}>
                                        <Ionicons
                                            name={'location-outline'}
                                            size={35}
                                            color={'white'}
                                        />
                                    </View>


                                    {!isEventLoaded && (
                                        <View
                                            style={{
                                                flex: 4,
                                                paddingLeft: 10,
                                            }}>
                                            <Text style={styles.contentHeading}>
                                                {events?.location?.location_city} ,
                                                {events?.location?.location_state} ,
                                                {events?.location?.location_country}
                                            </Text>
                                            <Text>{events?.location?.location_address}</Text>
                                        </View>
                                    )}
                                    {/* <View
                                        style={{
                                            flex: 1,
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            source={require('../../../assets/img/live_image.png')}
                                        />
                                    </View> */}
                                </View>
                            </View>

                            <View style={{height: 150}}>
                                <View style={{marginTop: 25}}>
                                    <Text style={styles.contentHeading}>Hosted By</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}>
                                    <View
                                        style={[{
                                            flex: 1,
                                            backgroundColor: 'rgba(54,147,172,1)',
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }, {backgroundColor: backgroundColor}]}>
                                        <Image source={{uri: events?.organizer_image}} style={{width: 30, height: 60}}/>
                                    </View>

                                    <View
                                        style={{
                                            flex: 3,
                                            paddingLeft: 20,
                                        }}>
                                        <Text style={styles.contentHeading}>
                                            {events?.organizer?.term_name}
                                        </Text>
                                        <Text>{events?.organizer?.description}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 2,
                                            height: 60,
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',
                                        }}>
                                        {/* <Button
                                            style={{
                                                width: '85%',
                                                height: 40,
                                                backgroundColor: '#183863',
                                                borderRadius: 15,
                                            }}
                                            onPress={() => navigation.navigate('SignUp')}>
                                            <Text
                                                style={[
                                                    styles.acceptButtonText,
                                                    {fontWeight: 'bold', fontSize: 15},
                                                ]}>
                                                Follow
                                            </Text>
                                        </Button> */}
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.contentHeading}>Event Info</Text>
                                {!isEventLoaded && (
                                    <HTMLView value={events?.description} stylesheet={styles}/>
                                )}
                            </View>

                            <View>
                                <Button
                                    style={styles.acceptButton}
                                    onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={styles.acceptButtonText}>
                                        Sign Up in One Click
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
				
            </View>
			<View style={{ alignItems:'center', width:'35%',marginLeft:140, marginBottom:10}}>
					<Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
					<Image 
						source={require('../../../assets/img/fristDigi.png')}
						style={{width:"100%", height:20}}
					/>
				</View>
        </ScrollView>
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
        fontSize: 17,
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
    acceptButton: {
        borderRadius: 10,
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(242,103,34,1)',
    },
    acceptButtonText: {
        color: '#ffffff',
    },
    topbanner: {
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
		backgroundColor:Colors.PRIMARY_BACKGROUND_COLOR,
    },
});
export default Event;