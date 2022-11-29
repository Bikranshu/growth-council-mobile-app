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

const Discussion = props => {
  const {
    navigation,
    route,
    discussionForum,
    discussionForumLoading,
    discussionForumError,
    discussionForumByIdentifier,

    profile,
    profileLoading,
    profileError,
    fetchProfile,
  } = props;

  //   const eventID = route.params.eventID;

  const eventID = 6308;
  const isFocused = useIsFocused();
  const [backendComments, setBackendComments] = useState([]);
  //   const [replyID, setReplyId] = useState('');
  const rootComments = backendComments?.filter(
    backendComment => backendComment?.comment_parent === '0',
  );

  const getReplies = replyID => {
    return backendComments.filter(
      backendComments => backendComments?.comment_parent === replyID,
    );
  };


  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      initialValues: {
        avatar: profile?.avatar,
        comment_author: profile?.user_login,
        comment_content: '',
      },
      onSubmit: async values => {
        console.log(values);
      },
    });

  useEffect(() => {
    discussionForumByIdentifier({
      event_id: eventID,
    });
    setBackendComments(discussionForum?.data);
  }, []);

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
      <View style={styles.forum}>
        <Text style={styles.heading}>Discussion Forum</Text>
        {discussionForumLoading && <Loading />}
        {/* comment Data from backend */}
        <View>
          {rootComments?.map(rootComment => (
            <Comments
              key={rootComment?.comment_ID}
              comment={rootComment}
              replies={getReplies(rootComment?.comment_ID)}
            />
          ))}
        </View>

        {/* //Comment Form */}
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
      </View>
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
