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
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {useToast} from 'native-base';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import {Searchbar} from 'react-native-paper';
import BottomNav from '../../../layout/BottomLayout';
import Loading from '../../../shared/loading';


const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

const People = props => {
  const {
    navigation,
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

    expertise,
    expertiseLoading,
    expertiseError,
    fetchAllExpertises,
    cleanExperties,
  } = props;

  const toast = useToast();
  const isFocused = useIsFocused();
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [region, setRegion] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [sorting, setSorting] = useState('ASC');
  const [memberConnection, setMemberConnection] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchAllUsersAsync = async () => {
        await fetchAllUsers({
          s: searchKey,
          sort: sorting,
          expertise_areas: category,
          account: account,
          region: region,
        });
      };
      fetchAllUsersAsync();
      return () => {
        cleanUser();
      };
    }, []),
  );

  useEffect(() => {
    setMemberConnection(users);
  }, [users]);

  useEffect(() => {
    fetchAllExpertises();
  }, []);

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
        region: region,
      });
      ToastMessage.show('You have successfully connected.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  const countries = {
    Region: 'Region',
    AMERICAS: 'AMERICAS',
    APAC: 'APAC',
    MEASA: 'MEASA',
  };

  const pillar = {
    'Account Type': 'Account Type',
    'Council Member': 'Council Member',
    'Associate Member': 'Associate Member',
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
        <View style={[styles.wrapper, styles.shadowProp]} key={index}>
          <Image
            source={{uri: item.avatar}}
            style={{
              width: 66,
              height: 66,
              margin: 8,
              borderRadius: 8,
            }}
          />

          <View style={{margin: 10, width: '55%'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Typography.FONT_SF_REGULAR,
                color: '#222B45',
              }}>
              {item?.user_meta?.first_name} {item?.user_meta?.last_name}
            </Text>
            <Text style={{fontSize: 12, color: '#222B45'}}>
              {item?.user_email}
            </Text>
            <Text style={{fontSize: 12, color: '#222B45'}}>
              {item?.company}
            </Text>
          </View>
          {!memberConnection[index]?.connection && (
            <TouchableOpacity
              onPress={() => connectMemberByMemberID(item.ID, index)}>
              <Ionicons
                name="add-circle"
                size={30}
                color="#B2B3B9"
                style={{marginTop: 25}}
              />
            </TouchableOpacity>
          )}
          {memberConnection[index]?.connection && (
            <Material
              name="check-circle"
              size={30}
              color="#14A2E2"
              style={{marginTop: 25}}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const [pickerVisible, setPickerVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [regionVisible, setRegionVisible] = useState(false);

  console.log({users});

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
              onChangeText={async text => {
                setSearchKey(text);
                await fetchAllUsers({
                  s: text,
                  sort: sorting,
                  expertise_areas: category,
                  account: account,
                  region: region,
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
                {region ? region : 'Region'}
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
            {users === null &&  users === [] ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    justifyContent: 'center',
                    fontSize: 16,
                    alignItems: 'center',
					color:'black'
                  }}>
                  No User{' '}
                </Text>
              </View>
            ) : (
              <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                data={users}
                renderItem={_renderItem}
              />
            )}
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
                    region: region,
                  });
                }}>
                {Object.keys(expertise).map(key => {
                  return (
                    <Picker.Item
                      label={expertise[key]}
                      value={expertise[key]}
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
                    region: region,
                  });
                }}>
                {Object.keys(pillar).map(key => {
                  return (
                    <Picker.Item
                      label={pillar[key]}
                      value={pillar[key]}
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
                selectedValue={region}
                mode="dropdown"
                itemTextStyle={{fontSize: 12}}
                onValueChange={async itemValue => {
                  setRegion(itemValue);

                  await fetchAllUsers({
                    s: searchKey,
                    sort: sorting,
                    expertise_areas: category,
                    account: account,
                    region: itemValue,
                  });
                }}>
                {Object.keys(countries).map(key => {
                  return (
                    <Picker.Item
                      label={countries[key]}
                      value={countries[key]}
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
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default People;
