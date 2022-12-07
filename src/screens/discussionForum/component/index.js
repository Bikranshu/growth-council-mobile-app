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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COMMUNITY_COLOR} from '../../../theme/colors';

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
  console.log({eventID});
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
      setInterval(() => {
        discussionForumByIdentifier({
          event_id: eventID,
        });
      }, 9000);

      return () => {
        cleanForum();
      };
    }, []),
  );

  useEffect(() => {
    setBackendComments(discussionForum);
  }, [discussionForum]);

  //   console.log({discussionForum});
  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfile();
    };
    fetchProfileAsync();
  }, [isFocused]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      {/* <ScrollView
      // style={{backgroundColor: Colors.COACHING_COLOR}}
      // directionalLockEnabled={false}
      > */}
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/img/splash-screen.png')}
          resizeMode="cover">
          <View style={{height: '30%'}} />

          <View>
            <View style={styles.forum}>
              {/* <Text style={[styles.heading, {color: COMMUNITY_COLOR}]}>
					{route?.params?.title}
				</Text> */}
              <Text style={[styles.heading, {marginTop: 10, marginBottom: 20}]}>
                Welcome to the Discussion Forum
              </Text>

              {postDiscussionLoading && <Loading />}
              {/* comment Data from backend */}
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
                  paddingBottom: 10,
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
                    <Ionicons name="person-outline" color="white" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* </ScrollView> */}
    </>
  );
};

export default Discussion;

const styles = StyleSheet.create({
  container: {
    // ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
    marginBottom: 10,
  },
  forum: {
    width: Dimensions.get('window').width,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 18,
    height: 510,
  },
  heading: {
    fontSize: 16,
    color: 'black',
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
