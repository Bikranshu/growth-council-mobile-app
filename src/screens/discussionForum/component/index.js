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
  ImageBackground,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useFormik} from 'formik';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Loading from '../../../shared/loading';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Comments from '../../../shared/comment';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COMMUNITY_COLOR} from '../../../theme/colors';

const screenHeight = Math.round(Dimensions.get('window').height);

const Discussion = props => {
  const {
    navigation,
    route,
    discussionForum,
    discussionForumLoading,
    discussionForumError,
    discussionForumByIdentifier,
    cleanForum,

    profile,
    profileLoading,
    profileError,
    fetchProfile,

    postDiscussion,
    postDiscussionLoading,
    postDiscussionByEvent,
    cleanPostDiscussion,

    deleteDiscusssion,
    deleteDiscusssionLoading,
    deleteDiscussionByIndentifier,
  } = props;

  const eventID = route?.params?.eventID;

  const isFocused = useIsFocused();
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments?.filter(
    backendComment => backendComment?.comment_parent === '0',
  );
  const getReplies = replyID => {
    return backendComments.filter(
      backendComments => backendComments?.comment_parent === replyID,
    );
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      event_id: route?.params?.eventID,
      author_name: profile?.user_login,
      author_email: profile?.user_email,
      content: '',
      author_id: profile?.ID,
      parent_id: '0',
    },
    onSubmit: async values => {
      await postDiscussionByEvent(values).then(response => {
        console.log(response);
        if (response?.payload?.code === 200) {
          console.log(response);
          discussionForumByIdentifier({
            event_id: eventID,
          });
        }
      });
      resetForm(values?.content);
    },
  });

  const deleteComment = async commentId => {
    const deleteID = parseInt(commentId);
    const response = await deleteDiscussionByIndentifier({
      comment_id: deleteID,
    });
    if (response?.payload?.code === 200) {
      discussionForumByIdentifier({
        event_id: eventID,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      discussionForumByIdentifier({
        event_id: eventID,
      });

      return () => {
        cleanForum();
      };
    }, []),
  );

  useEffect(() => {
    setInterval(() => {
      rootComments;
    }, 300000);
    setBackendComments(discussionForum);
  }, [discussionForum]);

  //   console.log({discussionForum});
  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfile();
    };
    fetchProfileAsync();
  }, [isFocused]);

  const backgroundColor =
    route?.params?.backgroundColor === undefined
      ? COMMUNITY_COLOR
      : route?.params?.backgroundColor;

  return (
    // <ScrollView contentContainerStyle={{flexGrow: 1}}>
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/img/event_main_image.png')}
        resizeMode="cover"
        imageStyle={{opacity: 0.3}}>
        <View style={{height: '40%'}}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={[styles.topbanner, {backgroundColor: backgroundColor}]}>
              <Text style={{fontSize: 14, color: 'white'}}>
                {route?.params?.title}
              </Text>

              <View
                style={{
                  position: 'absolute',
                  top: 65,
                  left: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name={'event'}
                  size={25}
                  color={'black'}
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    borderRadius: 20,
                    paddingVertical: 5,
                  }}
                />
                <Text style={{fontSize: 10, color: 'white'}}>fhdgsd</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 65,
                  left: 140,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name={'time-outline'}
                  size={25}
                  color={'black'}
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    borderRadius: 20,
                    paddingVertical: 5,
                  }}
                />
                <Text style={{fontSize: 10, color: 'white'}}>fhdgsd</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 65,
                  right: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name={'location-outline'}
                  size={25}
                  color={'black'}
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    borderRadius: 20,
                    paddingVertical: 5,
                  }}
                />
                <Text style={{fontSize: 10, color: 'white'}}>fhdgsd</Text>
              </View>
            </View>
          </View>

          <View>
            <View>
              <Text style={styles.contentHeading}>Growth Coach</Text>
            </View>

            <View style={styles.hostdetail}>
              <View
                style={[styles.hostimage, {backgroundColor: backgroundColor}]}>
                <Image
                  source={{}}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>

              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                  {route?.params?.organizer}
                </Text>
                <Text
                  style={{fontSize: 14, fontStyle: 'italic', color: 'white'}}>
                  gdsdhsdh
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.forum}>
            {/* <Text style={[styles.heading, {color: COMMUNITY_COLOR}]}>
                {route?.params?.title}
              </Text> */}
            <Text
              style={[
                styles.heading,
                {marginHorizontal: 10, marginVertical: 5},
              ]}>
              Welcome to the Discussion Forum
            </Text>

            {postDiscussionLoading && <Loading />}
            {discussionForumLoading && <Loading />}
            {/* comment Data from backend */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
              }}>
              <View>
                {rootComments?.map(rootComment => (
                  <Comments
                    key={rootComment?.comment_ID}
                    comment={rootComment}
                    replies={getReplies(rootComment?.comment_ID)}
                    currentUserId={profile?.ID}
                    deleteComment={deleteComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    profile={profile}
                    eventID={eventID}
                    deleteDiscusssionLoading={deleteDiscusssionLoading}
                    postDiscussionLoading={postDiscussionLoading}
                    postDiscussionByEvent={postDiscussionByEvent}
                    discussionForumByIdentifier={discussionForumByIdentifier}
                  />
                ))}
              </View>
            </ScrollView>

            {/* //Comment Form */}
            <View
              style={{
                height: 70,
                justifyContent: 'center',
                borderTopWidth: 0.2,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  position: 'absolute',
                  bottom: 10,
                  marginTop: 10,
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 100}}
                  source={{
                    uri: profile?.avatar,
                  }}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={2}
                  style={styles.textarea}
                  value={values?.content}
                  placeholder="Write comment"
                  onChangeText={handleChange('content')}
                  onFocus={handleBlur('content')}
                  error={errors.content}
                  touched={touched.content}
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    padding: 10,
                    backgroundColor: COMMUNITY_COLOR,
                    borderRadius: 30,
                  }}>
                  <Ionicons name="send" color="white" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
    // </ScrollView>
  );
};

export default Discussion;

const styles = StyleSheet.create({
  container: {},
  forum: {
    width: Dimensions.get('window').width,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    borderTopRadius: 45,
    height: 440,
  },
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  textarea: {
    width: '70%',
    padding: 5,
    fontSize: 16,
    borderWidth: 0.2,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 5,
  },

  topbanner: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 80,
    width: 318,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 14,
    padding: 10,
    position: 'relative',
  },

  contentHeading: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_MEDIUM,
    color: 'white',
    fontSize: 15,
    marginTop: 65,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  hostdetail: {
    paddingLeft: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    marginTop: 5,
  },
  hostimage: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 60,
    width: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
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
