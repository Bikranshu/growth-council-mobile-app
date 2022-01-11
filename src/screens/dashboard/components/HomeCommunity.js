import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';

const HomeCommunity = props => {
  const {
    navigation,
    communities,
    communityLoading,
    communityError,
    fetchAllCommunity,
    cleanCommunity,
    pointOfEngagements,
    pointOfEngagementLoading,
    pointOfEngagementError,
    fetchAllPointOfEngagement,
    cleanPointOfEngagement,
    communityMemberContents,
    communityMemberContentLoading,
    communityMemberContentError,
    fetchAllCommunityMemberContent,
    cleanCommunityMemberContent,
  } = props;

  console.log('Communities :::::::::::::::::', communities);
  console.log('Members :::::::::::::::::', communityMemberContents);

    const _renderItem = ({item, index}) => {
        return (
			<View style={styles.bottomWrapper}>
			<Image source={{uri:item.avatar}}
				style={{
					width: 83,
					height: 83,
					borderRadius:10,
				}}/>
			<View style={{padding:10, paddingBottom:20}}>
				<Text style={{fontSize: 10, fontWeight:"semi-bold", color:Colors.TERTIARY_TEXT_COLOR}}>{item?.display_name}</Text>
				<Text style={{fontSize: 6}}>Frost and Sullivan</Text>
			</View>
			
			<View
			  style={styles.chatIcon}>
			  <Ionicons
				name={'chatbox'}
				size={10}
				color="#B1AFAF"
			
			
			  />
			</View>
		  </View>
        );
    };

  const data1 = [
    {
      icon: 'brain',
      text: 'Executive MindChange',
    },
    {
      icon: 'location-arrow',
      text: 'Megatrends Workshop',
    },
    {
      icon: 'window-maximize',
      text: 'Annual Council Meeting',
    },
    {
      icon: 'clipboard',
      text: 'BrainStorming Strategy Discussion',
    },
  ];

  // const _renderMiddleItem = ({item, index}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => navigation.navigate('CommunityDetail', {id: item.ID})}>
  //       <View style={styles.middleWrapper}>
  //         <View style={styles.middleW}>
  //           <Font name={item.icon} size={30} color="skyblue" />
  //         </View>
  //         <Text style={{marginTop: 10, fontSize: 12}}>{item.text}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const _renderTopItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    console.log(date[1]);
    return (
      <View style={styles.topWrapper} key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
          <ImageBackground
            style={{
              width: '100%',
              height:'100%',
              borderRadius: 20,
            }}
            source={require('../../../assets/img/Rectangle2.png')}>
            <View
              style={{
                width:40,
                height: 50,
                marginTop: 10,
				marginLeft:200,
                backgroundColor: '#EBECF0',
                borderRadius: 10,
                padding: 5,
                alignItems: 'center',
              }}>
              <Text>{date[1]}</Text>
              <Text>{date[0]}</Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.headingText1}>{item.title}</Text>
              <Text style={styles.headingText2}>Hosted by {item?.organizer?.term_name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const pic = [
    {
      uri: require('../../../assets/img/welcome_screen_info_image.png'),
    },
    {
      uri: require('../../../assets/img/image.png'),
    },
    {
      uri: require('../../../assets/img/contactus.png'),
    },
  ];

  const _renderContentItem = ({item, index}) => {
    return (
      <View style={styles.ContentWrapper}>
        <ImageBackground
          style={{
            width: '100%',
            height:"100%",
           
          }}
          source={item?.uri}
        />
      </View>
    );
  };

  useEffect(() => {
    const fetchAllCommunityAsync = async () => {
      await fetchAllCommunity();
    };
    fetchAllCommunityAsync();
  }, []);

  useEffect(() => {
    const fetchAllCommunityMemberContentAsync = async () => {
      await fetchAllCommunityMemberContent();
    };
    fetchAllCommunityMemberContentAsync();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>
            {' '}
            Growth Community Events
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
			  marginTop:10
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={communities}
              renderItem={_renderTopItem}
            />
          </View>
        </View>

        {/* <View style={styles.middle}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        Points of Engagement
                    </Text>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={data1}
                            renderItem={_renderMiddleItem}
                        />
                    </View>
                </View> */}

        <View style={styles.bottom}>
          <Text style={styles.title}>
            Growth Community Member
          </Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={communityMemberContents.members}
              renderItem={_renderItem}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {' '}
            Growth Coaching Content
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pic}
              renderItem={_renderContentItem}
            />
          </View>
        </View>
		<View style={{ alignItems:'center'}}>
			<Text style={{fontSize: 10, marginTop: 10}}>Powered By</Text>
			<Image 
				source={require('../../../assets/img/footer_company_name_image.png')}
				style={{width: '60%', marginTop: 10, marginBottom: 15}}
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
    width: '100%',
  },
  	top: {
    height: 200,
    marginTop: 20,
    justifyContent: 'center',
	marginLeft:5
  },
  title:{
	fontWeight: '700',
	fontSize: 14,
	color:Colors.PRIMARY_TEXT_COLOR,
	marginLeft:15, 
	marginRight:15
  },

    topWrapper: {
		height: 144,
		width: 256,
		marginTop: 10,
		marginLeft: 15,
		borderRadius:20,
    },
    header: {
        margin: 10,
    },
    headingText1: {
        fontSize: 16,
        fontFamily: Typography.FONT_NORMAL,
        marginTop: 10,
        fontWeight: '800',
        color: 'white',
		fontSize: 12,
    },
    headingText2: {
        ...CommonStyles.headingText2,
        fontFamily: Typography.FONT_NORMAL,
        fontWeight: '700',
        color: 'white',
		fontSize:8,
    },
    middle: {
        width: 400,
        height: 200,
        marginLeft: 10,
        marginTop: 10,
    },
    middleWrapper: {
        height: 150,
        width: 90,
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleW: {
        backgroundColor: 'white',
        width: 80,
        height: 80,
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
		height: 172,
		margin:5,
		marginTop:25,
	  },
	  bottomWrapper: {
	   position:'relative',
		borderRadius: 10,
		marginTop:15,
		marginLeft: 15,
		backgroundColor: 'white',
		overflow:"hidden"
	  },
	  chatIcon:{
		borderRadius: 50,
		backgroundColor: '#F1F1F1',
		padding:6,
		justifyContent: 'center',
		position:'absolute',
		right:4,
		bottom:4
	  },
    bottomImage: {
        width: '100%',
        height: 100,
        borderRadius: 20,
    },
    content: {
        height: 250,
		marginLeft: 5,
		justifyContent: 'center',
		borderRadius: 20,
    },
    ContentWrapper: {
		height: 206,
		width: 364,
		marginTop: 20,
		marginLeft: 15,
	   borderRadius:20,
	   overflow:"hidden"
    },
});

export default HomeCommunity;
