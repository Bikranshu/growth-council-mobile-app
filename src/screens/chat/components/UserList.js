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
    Linking
} from 'react-native';
import {Searchbar, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN, USER_NAME, USER_AVATAR} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import BottomNav from '../../../layout/BottomLayout';
import ChatCount from '../../../shared/chatCount';
import Loading from '../../../shared/loading';

const UserList = props => {
    const {
        navigation,
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
        const fetchAllUsersAsync = async () => {
            await fetchAllUsers({
                s: searchKey,
            });
        };
        fetchAllUsersAsync();

        return () => {
            cleanUser();
        };
    }, [isFocused]);

    useEffect(() => {
        setMemberConnection(users);
    }, [users]);

    const connectMemberByMemberID = async (memberID, index) => {
        const response = await connectMemberByIdentifier({member_id: memberID});
        if (response?.payload?.code === 200) {
            let items = [...memberConnection];
            let item = {...items[index]};
            item.connection = true;
            items[index] = item;
            setMemberConnection(items);
            fetchAllUsers({
                s: searchKey,
            });
            ToastMessage.show('You have successfully connected.');
        } else {
            toast.closeAll();
            ToastMessage.show(response?.payload?.response);
        }
    };

    const _renderItems = ({item, index}) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Chat', {
                            friendID: item?.ID,
                            friendName: item?.display_name,
                            friendAvatar: item?.avatar,
                            userID: userID,
                            userName: userName,
                            userAvatar: avatarImg,
                        })
                    }>
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
                                <ChatCount item={item} userID={userID}/>
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
                            <Material name="check-circle" size={1} color="#14A2E2"/>
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
                backgroundColor="grey"
                translucent={false}
            />
            <View style={styles.container}>
                <View
                    style={{
                        height: 80,
                        paddingLeft: 4,
                        paddingRight: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        shadowColor: '#000000',
                        shadowOffset: {width: 0, height: 3},
                        shadowRadius: 9,
                        shadowOpacity: 0.1,
                        elevation: 5,
                        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={30} color="#B2B3B9"/>
                    </TouchableOpacity>

                    <Searchbar
                        style={styles.input}
                        placeholder="Search"
                        keyboardType="default"
                        value={searchKey}
                        onChangeText={async text => {
                            setSearchKey(text);
                            await fetchAllUsers({
                                s: text,
                            });
                        }}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity>
                        <Button
                            style={[styles.button]}
                            onPress={() => Linking.openURL('mailto:contact@frost.com')}>
                            <Text style={styles.buttonText}>Contact us</Text>
                        </Button>
                    </TouchableOpacity>
                </View>
                {userLoading && <Loading/>}
                <ScrollView>
                    <View style={{marginTop: 10}}>
                        <FlatList
                            Vertical
                            showsVerticalScrollIndicator={false}
                            data={users.sort((a, b) => a.lastUpdated > b.lastUpdated ? -1 : b.lastUpdated > a.lastUpdated ? 1 : 0)}
                            renderItem={_renderItems}
                        />
                    </View>
                </ScrollView>
            </View>
            {/* <View
        style={{paddingBottom: 20, backgroundColor: 'white', marginTop: 10}}>
        <Footer />
      </View> */}

            <BottomNav {...props} navigation={navigation}/>
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
