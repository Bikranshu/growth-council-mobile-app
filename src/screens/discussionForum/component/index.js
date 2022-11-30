import {position} from 'native-base/lib/typescript/theme/styled-system';
import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {Button} from 'react-native-paper';
import {useFormik} from 'formik';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../../../shared/loading';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';
import Comments from '../../../shared/comment';
import ToastMessage from '../../../shared/toast';

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

  //   const eventID = 6308;
  const isFocused = useIsFocused();
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [rootComments, setRootComments] = useState([]);

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
        if (response?.payload?.code === 200) {
          console.log(response);
        }
      });
      resetForm(values?.content);
      setBackendComments(discussionForum?.data);
      setRootComments(
        backendComments?.filter(
          backendComment => backendComment?.comment_parent === '0',
        ),
      );
 
    },
  });

  const deleteComment = async commentId => {
    const deleteID = parseInt(commentId);
    const response = await deleteDiscussionByIndentifier({
      comment_id: deleteID,
    });
    console.log('Are you sure that you want to remove', response);
    setBackendComments(discussionForum?.data);
    setRootComments(
      backendComments?.filter(
        backendComment => backendComment?.comment_parent === '0',
      ),
    );
   
  };

  useEffect(() => {
    discussionForumByIdentifier({
      event_id: eventID,
    });
    setBackendComments(discussionForum?.data);
  }, []);

  
  useEffect(() => {
    setBackendComments(discussionForum?.data);
    setRootComments(
      backendComments?.filter(
        backendComment => backendComment?.comment_parent === '0',
      ),
    );
  }, [discussionForum]);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
        <View style={styles.forum}>
          <Text style={styles.heading}>Discussion Forum</Text>
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
                  postDiscussionByEvent={postDiscussionByEvent}
                />
              ))}
            </View>
          </ScrollView>

          {/* //Comment Form */}
          <View>
            <View style={{flexDirection: 'row', margin: 10}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 30}}
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
            </View>
            <Button onPress={handleSubmit}>Write</Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Discussion;

const styles = StyleSheet.create({
  forum: {
    width: Dimensions.get('window').width - 20,
    borderRadius: 10,
    margin: 5,
    marginLeft: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  heading: {
    fontSize: 16,
    color: 'black',
  },
  textarea: {
    width: '80%',
    padding: 5,
    fontSize: 16,
    borderWidth: 0.2,
    borderRadius: 5,
    marginLeft: 10,
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
