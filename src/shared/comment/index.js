import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useFormik} from 'formik';
import {Button} from 'react-native-paper';
import Loading from '../loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {getFCMTOkenForUser} from '../../utils/httpUtil';
import {sendNotification} from '../../utils/sendNotification';
// import useOutsideClick from './useOutsideClick';
import {COMMUNITY_COLOR} from '../../theme/colors';

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
  backgroundColor,
  setHideInput,
  hideInput,
}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment?.comment_date) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canDelete = currentUserId === comment?.user_id && !timePassed;
  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === comment?.comment_ID;

  const againReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.parent === '0';

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

  useEffect(() => {
    setparentUserId(
      replyId === comment?.comment_ID
        ? comment?.comment_parent === '0'
          ? comment?.user_id
          : ''
        : '',
    );
  }, []);
  useEffect(() => {
    getFCMTOkenForUser(parentUserId)
      .then(res => {
        const token = res.data.data;
        if (token == null) {
          console.log(res.data?.message);
        }
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
        if (response?.payload?.code === 200) {
          discussionForumByIdentifier({
            event_id: eventID,
          });
          setHideInput(false);
        }
      });
      resetForm(values?.content);

      sendNotification(
        friendToken,
        `${profile?.user_login} has replied to your comment`,
        values?.content,
        {
          type: 'chat',
          friendID: profile?.ID,
          friendName: profile?.user_login,
          userID: replyId,
          userName: parentName,
        },
      );
    },
  });

  const ref = useRef();

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
        accessible={false}>
        <View style={{flexDirection: 'row'}}>
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
                  paddingBottom: 15,
                  height: 'auto',
                  minHeight: 50,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#00008B', fontSize: 16}}>
                    {comment?.comment_author}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 8,
                      position: 'absolute',
                      right: 1,
                    }}>
                    {comment?.comment_date}
                  </Text>
                </View>

                <Text style={{color: 'black', fontSize: 12}}>
                  {comment?.comment_content}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  position: 'relative',
                  right: 0,
                  borderTopWidth: 1,
                  borderTopColor: '#EDF1F7',
                }}>
                {canReply && (
                  <TouchableOpacity
                    style={{marginLeft: '50%'}}
                    onPress={() =>
                      setActiveComment({
                        id: comment?.comment_ID,
                        type: 'replying',
                        parent: comment?.comment_parent,
                      })
                    }>
                    {comment?.comment_parent === '0' && (
                      <View style={{flexDirection: 'row'}}>
                        <Entypo
                          name="reply"
                          size={15}
                          color="grey"
                          style={{marginVertical: 10}}
                        />
                        <Text
                          style={{
                            color: 'grey',
                            marginVertical: 10,
                            fontSize: 10,
                          }}>
                          Reply
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
                {canDelete && (
                  <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={() => deleteComment(comment?.comment_ID)}>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons
                        name="trash-bin"
                        size={15}
                        color="grey"
                        style={{marginVertical: 10}}
                      />
                      <Text
                        style={{
                          color: 'grey',
                          marginVertical: 10,
                          fontSize: 10,
                        }}>
                        Delete
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {deleteDiscusssionLoading && <Loading />}
            {postDiscussionLoading && <Loading />}
            {isReplying && (
              <View>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <Image
                    style={{width: 50, height: 50, borderRadius: 30}}
                    source={{
                      uri: profile?.avatar,
                    }}
                  />
                  <TouchableOpacity
                    ref={ref}
                    onPress={setHideInput(true)}
                    style={styles.textarea}>
                    <TextInput
                      multiline={true}
                      numberOfLines={2}
                      value={values?.content}
                      placeholder="Write comment"
                      onChangeText={handleChange('content')}
                      onFocus={handleBlur('content')}
                      error={errors.content}
                      touched={touched.content}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: backgroundColor,
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="send" color="white" size={25} />
                  </TouchableOpacity>
                </View>
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
      </TouchableWithoutFeedback>
    </>
  );
};

export default Comments;
const styles = StyleSheet.create({
  textarea: {
    width: '50%',
    padding: 5,
    fontSize: 16,
    borderWidth: 0.2,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
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
