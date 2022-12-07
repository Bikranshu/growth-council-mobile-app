import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useFormik} from 'formik';
import {Button} from 'react-native-paper';
import Loading from '../loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getFCMTOkenForUser} from '../../utils/httpUtil';
import {sendNotification} from '../../utils/sendNotification';

const Comments = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
  parentName,
  profile,
  eventID,
  deleteDiscusssionLoading,
  postDiscussionByEvent,
  postDiscussionLoading,
  discussionForumByIdentifier,
}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment?.comment_date) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canDelete = currentUserId === comment?.user_id && !timePassed;
  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === comment?.comment_ID;

  const replyId = parentId ? parentId : comment?.comment_ID;
  const [friendToken, setFriendToken] = useState('');
  const [parentDetails, setParentDetails] = useState();
  const [parentUserId, setparentUserId] = useState(
    replyId === comment?.comment_ID
      ? comment?.comment_parent === '0'
        ? comment?.user_id
        : ''
      : '',
  );

  const discussion_board =
    comment?.comment_ID.includes(parentDetails) === true
      ? comment?.comment_parent === '0'
        ? comment?.user_data?.discussion_board_notification[0]
        : ''
      : '';

  console.log(discussion_board);
  console.log({parentUserId});
  useEffect(() => {
    getFCMTOkenForUser(parentUserId)
      .then(res => {
        const token = res.data.data;
        if (token == null) {
          console.log(res.data?.message);
        }
        console.log('token', token);
        setFriendToken(typeof token == 'string' ? token : token?.[0]);
      })

      .catch(error => {
        console.log(error);
      });
  }, []);

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
      event_id: eventID,
      author_name: profile?.user_login,
      author_email: profile?.user_email,
      content: '',
      author_id: profile?.ID,
      parent_id: replyId,
    },
    onSubmit: async values => {
      await postDiscussionByEvent(values).then(response => {
        console.log('aewa', response.meta.arg.parent_id);
        setParentDetails(response.meta.arg.parent_id);
        if (response?.payload?.code === 200) {
          discussionForumByIdentifier({
            event_id: eventID,
          });
        }
      });
      resetForm(values?.content);

      sendNotification(
        friendToken,
        `${profile?.user_login} has replied to your comment`,
        values?.content,
        {
          type: 'forum',
          friendID: profile?.ID,
          friendName: profile?.user_login,
          userID: replyId,
          userName: parentName,
        },
      );
    },
  });

  return (
    <>
      {deleteDiscusssionLoading && <Loading />}
      {postDiscussionLoading && <Loading />}
      <View style={{flexDirection: 'row', margin: 10}}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            marginVertical: 10,
          }}
          source={{
            uri: comment?.avatar,
          }}
        />
        <View style={{margin: 5, width: '100%', padding: 5}}>
          <View style={[styles.commentSection, styles.shadowProp]}>
            <View
              style={{
                marginBottom: 40,
                height: 'auto',
                minHeight: 20,
              }}>
              <Text style={{color: '#00008B', fontSize: 16}}>
                {comment?.comment_author}
              </Text>
              <Text style={{color: 'black', fontSize: 12}}>
                {comment?.comment_content}
              </Text>
            </View>
            {/* <View
              style={{
                height: 1,
                borderWidth: 0.2,
                marginTop: 10,
                borderBottomColor: '#EDF1F7',
              }}
            /> */}
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                right: 10,
                bottom: 0,
              }}>
              {canReply && (
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() =>
                    setActiveComment({
                      id: comment?.comment_ID,
                      type: 'replying',
                    })
                  }>
                  <Text style={{color: '#77C3ED', marginVertical: 10}}>
                    Reply
                  </Text>
                </TouchableOpacity>
              )}
              {canDelete && (
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => deleteComment(comment?.comment_ID)}>
                  <Text style={{color: 'red', marginVertical: 10}}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {isReplying && (
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
              <TouchableOpacity
                onPress={handleSubmit}
                style={{padding: 5, backgroundColor: 'blue'}}>
           
              </TouchableOpacity>
            </View>
          )}

          <View>
            {replies?.length > 0 && (
              <View>
                {replies?.map(reply => (
                  <Comments
                    comment={reply}
                    key={reply.id}
                    replies={[]}
                    currentUserId={currentUserId}
                    deleteComment={deleteComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    parentId={comment?.comment_ID}
                    parentName={comment?.comment_author}
                    profile={profile}
                    eventID={eventID}
                    // deleteDiscusssionLoading={deleteDiscusssionLoading}
                    postDiscussionByEvent={postDiscussionByEvent}
                    discussionForumByIdentifier={discussionForumByIdentifier}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default Comments;
const styles = StyleSheet.create({
  textarea: {
    width: '70%',
    padding: 5,
    fontSize: 16,

    borderRadius: 5,
    marginLeft: 10,
  },
  commentSection: {
    width: '70%',
    // borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,

    backgroundColor: 'white',
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
