import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';

import {Searchbar} from 'react-native-paper';
import {Button, useToast} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import analytics from '@react-native-firebase/analytics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

import Loading from '../../../shared/loading';
import ToastMessage from '../../../shared/toast';
import {Colors, Typography} from '../../../theme';
import {PRACTICE_COLOR} from '../../../theme/colors';
import BottomNav from '../../../layout/BottomLayout';
import FloatingButton from '../../../shared/floatingButton';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

const People = props => {
  const {
    navigation,
    route,
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

    deleteConnections,
    deleteConnectionLoading,
    deleteConnectionError,
    deleteMemberByIdentifier,
    cleanDeleteMember,

    expertise,
    expertiseLoading,
    expertiseError,
    fetchAllExpertises,
    cleanExperties,

    region,
    regionLoading,
    regionError,
    fetchAllRegions,
    cleanRegion,

    profile,
    profileLoading,
    profileError,
  } = props;

  let profileRegion = profile?.user_meta?.region;
  if (
    typeof profileRegion === 'undefined' ||
    profileRegion === null ||
    profileRegion === ''
  ) {
    profileRegion = 'ALL REGION';
  } else {
    profileRegion = profile?.user_meta?.region[0];
  }

  const toast = useToast();
  const isFocused = useIsFocused();
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [mobileRegion, setMobileRegion] = useState(profileRegion);
  const [searchKey, setSearchKey] = useState('');
  const [sorting, setSorting] = useState('ASC');
  const [memberConnection, setMemberConnection] = useState([]);
  const [deleteConnect, setDeleteConnect] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useFocusEffect(
    useCallback(() => {
      //   const fetchAllUsersAsync = async () => {
      fetchAllUsers({
        s: searchKey,
        sort: sorting,
        expertise_areas: category,
        account: account,
        region: mobileRegion,
      });
      //   };
      //   fetchAllUsersAsync();
      return () => {
        cleanUser();
      };
    }, [isFocused]),
  );

  useEffect(() => {
    setMemberConnection(users);
    setDeleteConnect(users);
  }, [users]);

  useEffect(() => {
    fetchAllExpertises();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllRegions();
    }, [isFocused]),
  );

  useEffect(() => {
    setMobileRegion(mobileRegion);
  }, [region]);

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
        sort: sorting,
        expertise_areas: category,
        account: account,
        region: mobileRegion,
      });
      ToastMessage.show('You have successfully connected.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  const deleteMemberByMemberID = async (memberID, index) => {
    const response = await deleteMemberByIdentifier({member_id: memberID});
    if (response?.payload?.code === 200) {
      let items = [...deleteConnect];
      let item = {...items[index]};
      item.connection = true;
      items[index] = item;
      setDeleteConnect(items);
      fetchAllUsers({
        s: searchKey,
        sort: sorting,
        expertise_areas: category,
        account: account,
        region: mobileRegion,
      });
      ToastMessage.show('You have successfully deleted.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  let memberExpertise = expertise?.data?.choices;
  if (typeof memberExpertise === 'undefined') {
    memberExpertise = 'Expertise Area';
  } else {
    memberExpertise = expertise?.data?.choices;
  }

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
        <View style={[styles.wrapper, styles.shadowProp]} key={index}>
          <Image
            source={{uri: item.profile_image}}
            style={{
              width: 66,
              height: 66,
              margin: 8,
              borderRadius: 8,
            }}
          />

          <View style={{margin: 10, width: '50%'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Typography.FONT_SF_REGULAR,
                color: '#222B45',
              }}>
              {item?.display_name}
            </Text>
            {/* <Text style={{fontSize: 11, color: '#222B45'}}>
              {item?.user_email}
            </Text> */}
            <Text style={{fontSize: 11, color: '#222B45', marginTop: 5}}>
              {item?.user_meta?.Title === undefined
                ? item?.user_meta?.title
                : item?.user_meta?.Title}
            </Text>
          </View>
          {!memberConnection[index]?.connection && (
            <View>
              <TouchableOpacity
                onPress={async () => {
                  connectMemberByMemberID(item.ID, index);
                  await analytics().logEvent('add_button_clicked', {
                    member_ID: item?.ID,
                    page_name: 'Member Connection',
                  });
                }}>
                <Ionicons
                  name="add-circle"
                  size={30}
                  color="#B2B3B9"
                  style={{marginTop: 25}}
                />
              </TouchableOpacity>
            </View>
          )}
          {memberConnection[index]?.connection && (
            <View style={{flexDirection: 'row'}}>
              <Material
                name="check-circle"
                size={25}
                color="#14A2E2"
                style={{marginTop: 25, marginRight: 5}}
              />

              <TouchableOpacity
                // onPress={async () => {
                //   deleteMemberByMemberID(item.ID, index);
                // }}

                onPress={() => {
                  setModalVisible(true), setDeleteId(item.ID);
                }}>
                <AntDesign
                  name="deleteuser"
                  size={25}
                  color="#14A2E2"
                  style={{marginRight: 15, marginTop: 25}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const [pickerVisible, setPickerVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [regionVisible, setRegionVisible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <Searchbar
              style={styles.input}
              placeholder="Search"
              keyboardType="default"
              value={searchKey}
              iconColor="black"
              onChangeText={async text => {
                setSearchKey(text);
                await fetchAllUsers({
                  s: text,
                  sort: sorting,
                  expertise_areas: category,
                  account: account,
                  region: mobileRegion,
                });
              }}
            />
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              style={{
                flex: 1,
                alignItems: 'center',
                borderWidth: 0.3,
                paddingVertical: 5,
                borderColor: 'gray',
                height: 60,
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 11, color: '#222B45'}}>
                {category ? category : 'Expertise Areas'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAccountVisible(true)}
              style={{
                flex: 1,
                alignItems: 'center',
                borderWidth: 0.3,
                paddingVertical: 5,
                borderColor: 'gray',
                height: 60,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 11, color: '#222B45'}}>
                {account ? account : 'Account Type'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRegionVisible(true)}
              style={{
                flex: 1,
                alignItems: 'center',
                borderWidth: 0.3,
                paddingVertical: 5,
                borderColor: 'gray',
                height: 60,
                justifyContent: 'center',
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <Text style={{fontSize: 11, color: '#222B45'}}>
                {mobileRegion}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {userLoading && <Loading />}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,

            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
            paddingBottom: 50,
          }}>
          <View style={{marginTop: 10}}>
            {memberConnectionLoading && <Loading />}
            {deleteConnectionLoading && <Loading />}

            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={users}
              renderItem={_renderItem}
            />
            {/* )} */}
          </View>
          {/* <Footer /> */}
        </ScrollView>
      </View>

      <Modal transparent visible={pickerVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 300,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPickerVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Picker
                selectedValue={category}
                mode="dropdown"
                itemTextStyle={{fontSize: 12}}
                onValueChange={async itemValue => {
                  setCategory(itemValue);

                  await fetchAllUsers({
                    s: searchKey,
                    sort: sorting,
                    expertise_areas: itemValue,
                    account: account,
                    region: mobileRegion,
                  });
                }}>
                {Object.keys(memberExpertise).map(key => {
                  return (
                    <Picker.Item
                      label={memberExpertise[key]}
                      value={memberExpertise[key]}
                      key={key}
                      style={{fontSize: 14}}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={accountVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 300,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setAccountVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Picker
                selectedValue={account}
                mode="dropdown"
                itemTextStyle={{fontSize: 12}}
                onValueChange={async itemValue => {
                  setAccount(itemValue);

                  await fetchAllUsers({
                    s: searchKey,
                    sort: sorting,
                    expertise_areas: category,
                    account: itemValue,
                    region: mobileRegion,
                  });
                }}>
                {/* {Object.keys(pillar).map(key => {
                  return (
                    <Picker.Item
                      label={pillar[key]}
                      value={pillar[key]}
                      key={key}
                      style={{fontSize: 14}}
                    />
                  );
                })} */}
                {expertise?.data?.account_type?.map(item => {
                  return (
                    <Picker.Item
                      label={item?.account_type}
                      value={item?.account_type}
                      //   key={key}
                      style={{fontSize: 14}}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={regionVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 300,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setRegionVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Picker
                selectedValue={mobileRegion}
                mode="dropdown"
                itemTextStyle={{fontSize: 12}}
                onValueChange={async itemValue => {
                  setMobileRegion(itemValue);

                  await fetchAllUsers({
                    s: searchKey,
                    sort: sorting,
                    expertise_areas: category,
                    account: account,
                    region: itemValue,
                  });
                }}>
                {region?.region_options?.map(item => {
                  return (
                    <Picker.Item
                      label={item?.mobile_region}
                      value={item?.mobile_region}
                      //   key={key}
                      style={{fontSize: 14}}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: '#E5E4E2',
                borderRadius: 50,
              }}>
              <Image
                source={require('../../../assets/img/bin.png')}
                style={{
                  width: 60,
                  height: 40,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginRight: 'auto',
                }}
                resizeMode="contain"
              />
            </View> */}

            {/* <Text style={styles.topText}>Are you sure? {deleteId}</Text> */}
            <Text style={styles.modalText}>
              Do you want to delete this member from your connection?
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Button
                type="button"
                style={{marginRight: 10}}
                onPress={() => setModalVisible(!modalVisible)}>
                Cancel
              </Button>
              <Button
                type="button"
                onPress={async () => {
                  deleteMemberByMemberID(deleteId),
                    setModalVisible(!modalVisible);
                  await analytics().logEvent('delete_button_clicked', {
                    member_ID: deleteId,
                    page_name: 'Member Connection',
                  });
                }}
                style={{marginLeft: 10, backgroundColor: '#FF5733'}}>
                Confirm
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <FloatingButton {...props} navigation={navigation} />

      <BottomNav {...props} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
    marginBottom: 20,
  },
  input: {
    height: 45,
    width: '90%',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  wrapper: {
    height: 88,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 70,
  },
  icon: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#707070',
  },
  textWrapper: {
    marginLeft: 5,
    fontSize: 14,
    color: '#7E7F84',
  },
  //delete modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //   topText: {
  //     marginBottom: 10,
  //     marginTop: 10,
  //     textAlign: 'center',
  //     fontSize: 20,
  //     color: 'black',
  //   },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
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
  loading1: {
    top: 0,
    left: 0,
    right: 50,
    bottom: 0,
    // justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default People;
