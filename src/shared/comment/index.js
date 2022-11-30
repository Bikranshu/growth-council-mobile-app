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

const Comments = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
  profile,
}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment?.comment_date) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canDelete = currentUserId === comment?.user_id && !timePassed;
  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === comment.comment_ID;

  const replyId = parentId ? parentId : comment?.comment_ID;
  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      initialValues: {
        avatar: profile?.avatar,
        comment_author: profile?.user_login,
        comment_content: '',
        comment_parent: replyId,
      },
      onSubmit: async values => {
        console.log(values);
      },
    });

  return (
    <View style={{flexDirection: 'row', margin: 10}}>
      <Image
        style={{width: 50, height: 50, borderRadius: 30}}
        source={{
          uri: 'https:reactnative.dev/img/tiny_logo.png',
        }}
      />
      <View style={{margin: 5}}>
        <View>
          <Text style={{color: '#00008B', fontSize: 16}}>
            {comment?.comment_author}
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>
            {comment?.comment_content}
          </Text>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          {canReply && (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() =>
                setActiveComment({id: comment?.comment_ID, type: 'replying'})
              }>
              <Text style={{color: '#77C3ED'}}>Reply</Text>
            </TouchableOpacity>
          )}
          {canDelete && (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => deleteComment(comment?.comment_ID)}>
              <Text style={{color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
        {isReplying && (
          <View>
            <View style={{flexDirection: 'row', margin: 10}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 30}}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
              <TextInput
                multiline={true}
                numberOfLines={2}
                style={styles.textarea}
                value={values?.comment_content}
                placeholder="Write comment"
                onChangeText={handleChange('comment_content')}
                onFocus={handleBlur('comment_content')}
                error={errors.comment_content}
                touched={touched.comment_content}
              />
            </View>
            <Button onPress={handleSubmit}>Write</Button>
          </View>
        )}
        <View>
          {replies?.length > 0 && (
            <View style={{marginLeft: 0}}>
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
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Comments;
const styles = StyleSheet.create({});
