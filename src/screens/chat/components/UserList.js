import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Linking,
} from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import {Searchbar, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';

import Loading from '../../../shared/loading';
import ChatCount from '../../../shared/chatCount';
import {decodeUserID} from '../../../utils/jwtUtil';
import BottomNav from '../../../layout/BottomLayout';
import {getAsyncStorage} from '../../../utils/storageUtil';
import FloatingButton from '../../../shared/floatingButton';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {JWT_TOKEN, USER_NAME, USER_AVATAR} from '../../../constants';

const UserList = props => {
  const {
    route,
    connection,
    connectionLoading,
    connectionError,
    fetchAllConnection,
    cleanConnection,

    users,
    userLoading,
    userError,
    fetchAllUsers,
    cleanUser,

    memberConnections,
    memberConnectionLoading,
    memberConnectionError,
    connectMemberByIdentifier,
    cleanConnectMember,
  } = props;

  const [userID, setUserID] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [avatarImg, setAvatarImg] = useState(null);
  const [userName, setUserName] = useState(null);
  const [memberConnection, setMemberConnection] = useState([]);
  const isFocused = useIsFocused();
  const [_users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [text, setText] = useState('');
  const navigation = useNavigation();

  // getActualUsersFromFirebase
  const getFirebaseUsers = async () => {
    try {
      if (!userID) console.log('USER ID NOT FOUND');

      const fbUsers = await firestore().collection('rooms').get();
      //   console.log('FB USERS');
      //   console.log(fbUsers);
      //   console.log('*****************');

      const docs = fbUsers.docs.filter(doc => doc.id.includes(userID));
      //   console.log('DOC USERS');
      //   console.log(docs);
      //   console.log('*****************');

      const data = docs.map(doc => ({id: doc.id, ...doc.data()}));
      //   console.log('MAP USERS');
      //   console.log(data);
      //   console.log('*****************');

      let __users = [];
      for (let i = 0; i < data.length; i++) {
        const id = data[i].id;
        const arr = id.split('_');
        const user_id = arr[0] == userID ? arr[1] : arr[0];
        const user = users.find(usr => usr.ID == user_id);
        __users.push({...user, ...data[i]});
      }

      //   console.log('ACTUAL USERS');
      //   console.log(__users);
      //   console.log('*****************');

      setUsers(__users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      setText('');
      setReload(!reload);
    });
  }, []);

  useEffect(() => {
    if (userID && users.length) {
      getFirebaseUsers();
    }
  }, [userID, users, reload]);

  useEffect(() => {
    const setLoggedInUserInfoAsync = async () => {
      let token = await getAsyncStorage(JWT_TOKEN);
      setUserID(decodeUserID(token));
      let avatar = await getAsyncStorage(USER_AVATAR);
      setAvatarImg(avatar);
      let username = await getAsyncStorage(USER_NAME);
      setUserName(username);
    };
    setLoggedInUserInfoAsync();
  }, [isFocused]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      const fetchAllUsersAsync = async () => {
        await fetchAllUsers({
          s: searchKey,
        });
      };
      fetchAllUsersAsync();

      return () => {
        cleanUser();
      };
    });
  }, []);

  useEffect(() => {
    setMemberConnection(users);
  }, [users]);

  useEffect(() => {
    if (text.length)
      setUsers(prev =>
        users.filter(
          user =>
            user.display_name.toLowerCase().includes(text.toLowerCase()) ||
            user.ID.includes(text),
        ),
      );
    else setReload(!reload);
  }, [text]);

  const _renderItems = ({item, index}) => {
    let chat = item?.user_meta?.chat_notification;
    if (typeof chat === 'undefined') {
      chat = '';
    } else {
      chat = item?.user_meta?.chat_notification[0];
    }

    return (
      <View>
        <TouchableOpacity
          onPress={async () => {
            await analytics().logEvent('Userlist', {
              item: item?.display_name,
              description: 'click user to chat',
            });
            navigation.navigate('Chat', {
              friendID: item?.ID,
              friendName: item?.display_name,
              friendAvatar: item?.avatar,
              userID: userID,
              userName: userName,
              userAvatar: avatarImg,
              userChat: chat,
            });
          }}>
          <View style={[styles.wrapper, styles.shadowProp]} key={index}>
            <Image
              source={{uri: item?.avatar}}
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                margin: 14,
              }}
            />
            <View style={{margin: 10, width: '65%'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Typography.FONT_SF_REGULAR,
                  color: 'black',
                }}>
                {item?.display_name}
              </Text>
              <Text style={{fontSize: 12, marginTop: 10}}>
                {item?.user_email}
              </Text>
              <Text style={{fontSize: 12, color: '#222B45'}}>
                {item?.company}
              </Text>
              <View
                style={{
                  top: 20,
                  right: 10,
                  backgroundColor: 'red',
                  zIndex: 101,
                  position: 'absolute',
                }}>
                <ChatCount item={item} userID={userID} />
              </View>
            </View>
            {/* {!memberConnection[index]?.connection && (
              <TouchableOpacity
                onPress={() => connectMemberByMemberID(item.ID, index)}>
                <Ionicons
                  name="add-circle"
                  size={10}
                  color="#B2B3B9"
                  style={{marginTop: 25}}
                />
              </TouchableOpacity>
            )} */}
            {memberConnection[index]?.connection && (
              <Material name="check-circle" size={1} color="#14A2E2" />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <View style={styles.container}>
        <View
          style={{
            height: 110,
            paddingLeft: 4,
            paddingRight: 20,

            alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: 3},
            shadowRadius: 9,
            shadowOpacity: 0.1,
            elevation: 5,
            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
          }}>
          <View style={{marginVertical: 15}}>
            <Text>Search for membership by name and begin chatting</Text>
          </View>
          <View
            style={{
              paddingLeft: 4,
              paddingRight: 20,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 3},
              shadowRadius: 9,
              shadowOpacity: 0.1,
              elevation: 5,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={30} color="#B2B3B9" />
            </TouchableOpacity>

            <Searchbar
              style={styles.input}
              placeholder="Search"
              keyboardType="default"
              value={text}
              onChangeText={async text => {
                setSearchKey(text);
                setText(text);
              }}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity>
            <Button
              style={[styles.button]}
              onPress={async () => {
                navigation.navigate('Gmail');
                await analytics().logEvent('userlistGmail', {
                  item: 'userlist',
                });
              }}>
              <Text style={styles.buttonText}>Contact us</Text>
            </Button>
          </TouchableOpacity>
        </View>
        {userLoading && <Loading />}
        <ScrollView>
          <View style={{marginTop: 10}}>
            <FlatList
              Vertical
              showsVerticalScrollIndicator={false}
              data={_users
                .filter(user => !!user.display_name)
                .sort((a, b) =>
                  a.lastUpdated > b.lastUpdated
                    ? -1
                    : b.lastUpdated > a.lastUpdated
                    ? 1
                    : 0,
                )}
              renderItem={_renderItems}
            />
          </View>
        </ScrollView>
      </View>
      {/* <View
        style={{paddingBottom: 20, backgroundColor: 'white', marginTop: 10}}>
        <Footer />
      </View> */}
      <FloatingButton {...props} navigation={navigation} />
      <BottomNav {...props} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    paddingBottom: 70,
  },
  wrapper: {
    height: 88,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 35,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    height: 38,
    marginTop: 8,
    backgroundColor: 'white',
    borderColor: '#F26722',
    borderWidth: 1,
  },
  buttonText: {
    color: '#F26722',
    fontSize: 12,
  },
  input: {
    flex: 1,
    height: 45,
    marginLeft: 10,
    borderRadius: 19,
    backgroundColor: '#F5F5F5',
    marginRight: 15,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  loading1: {
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default UserList;
