import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Colors, Typography} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import {Picker} from '@react-native-picker/picker';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import {BubblesLoader} from 'react-native-indicator';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../../../shared/loading';
import {useFocusEffect} from '@react-navigation/native';

const CriticalIssue = props => {
  const {
    navigation,
    route,
    criticalIssue,
    criticalIssueLoading,
    criticalIssueError,
    fetchCritcalIssue,
    cleanCriticalIssue,
    index,

    profile,
    profileLoading,
    profileError,
    fetchProfile,
    cleanProfile,
    Userregion,

    region,
    regionLoading,
    regionError,
    fetchAllRegions,
    cleanRegion,
  } = props;

  let profileRegion = profile?.user_meta?.region;

  if (typeof profileRegion === 'undefined' || profileRegion === null) {
    profileRegion = 'NORTH-AMERICA';
  } else {
    profileRegion = profile?.user_meta?.region[0];
  }
  //   let profileRegion = profile?.user_meta?.region[0]
  //     ? profile?.user_meta?.region[0]
  //     : 'NORTH-AMERICA';
  let UserRegion =
    profileRegion === 'MEASA'
      ? 'APAC'
      : profileRegion === 'AMERICAS'
      ? 'NORTH-AMERICA'
      : profileRegion;

  const listRef = useRef(null);
  const [regionVisible, setRegionVisible] = useState(false);
  const [mobileRegion, setMobileRegion] = useState(UserRegion);

  useEffect(() => {
    fetchAllRegions();
  }, []);
  //   const countries = {
  //     APAC: 'APAC',
  //     AMERICAS: 'NORTH-AMERICA',
  //     // MEASA: 'MEASA',
  //   };
  useEffect(() => {
    setMobileRegion(UserRegion);
  }, [profile]);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchCritcalIssue();
  }, []);

  useFocusEffect(
    useCallback(() => {
      wait(500).then(() => scrollToIndex());
    }, [criticalIssueLoading]),
  );

  const wait = ms =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });

  const scrollToIndex = () => {
    listRef.current.scrollToIndex({animated: true, index});
  };

  const _renderCritical = ({item, index}) => {
    let lowercaseRegion = '';
    if (mobileRegion) lowercaseRegion = mobileRegion.toLowerCase();
    else console.log("lowercaseRegion doesn't exist, look into it");
    return (
      <>
        {lowercaseRegion === item?.region ? (
          <View style={styles.content}>
            <Image
              style={{
                width: Dimensions.get('window').width - 40,
                height: 120,
                borderRadius: 8,
              }}
              source={{uri: item?.image}}
            />
            <View style={styles.contentWrapper}>
              <Text style={{color: 'black', fontSize: 14, marginBottom: 10}}>
                {item?.heading}
              </Text>
              {item?.areas_of_focus?.map(items => (
                <View
                  style={{
                    marginBottom: 10,
                    paddingRight: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Entypo name="dot-single" size={20} color="black" />

                  <HTMLView
                    value={items.point}
                    textComponentProps={{
                      style: {
                        fontSize: 10,
                        color: 'black',
                      },
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        ) : lowercaseRegion === 'all region' ? (
          <View style={styles.content}>
            <Image
              style={{
                width: Dimensions.get('window').width - 40,
                height: 120,
                borderRadius: 8,
              }}
              source={{uri: item?.image}}
            />
            <View style={styles.contentWrapper}>
              <Text style={{color: 'black', fontSize: 14, marginBottom: 10}}>
                {item?.heading}
              </Text>
              {item?.areas_of_focus?.map(items => (
                <View
                  style={{
                    marginBottom: 10,
                    paddingRight: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Entypo name="dot-single" size={20} color="black" />

                  <HTMLView
                    value={items.point}
                    textComponentProps={{
                      style: {
                        fontSize: 10,
                        color: 'black',
                      },
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <View style={styles.container}>
        {criticalIssueLoading && <Loading />}

        <View>
          <FlatList
            ref={listRef}
            ListHeaderComponent={() => (
              <View style={styles.title}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 24,
                    paddingBottom: 30,
                    fontWeight: '600',
                  }}>
                  {criticalIssue?.critical_issue_mobile_title}
                </Text>
                <View style={styles.titleBorder} />

                <View>
                  <Text style={{fontSize: 16, marginTop: 20}}>
                    Select Region
                  </Text>
                  <TouchableOpacity
                    onPress={() => setRegionVisible(true)}
                    style={{
                      borderWidth: 0.3,
                      paddingVertical: 5,
                      height: 50,
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginTop: 10,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        position: 'absolute',
                        left: 20,
                        top: 10,
                      }}>
                      {mobileRegion
                        ? mobileRegion === 'NORTH-AMERICA'
                          ? 'AMERICAS'
                          : //   : mobileRegion === 'MEASA'
                            //   ? 'APAC'
                            mobileRegion
                        : 'ALL REGION'}
                    </Text>
                    <Ionicons
                      name="chevron-down-outline"
                      size={30}
                      color="black"
                      style={{position: 'absolute', right: 15, top: 8}}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.titleText}>
                  {criticalIssue?.critical_issue_mobile_description}
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            data={criticalIssue?.critical_issue_mobile_lists}
            renderItem={_renderCritical}
          />
        </View>
      </View>

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
                onValueChange={itemValue => {
                  setMobileRegion(
                    itemValue === 'AMERICAS'
                      ? 'NORTH-AMERICA'
                      : //   : itemValue === 'MEASA'
                        //   ? 'APAC'
                        itemValue,
                  );
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
      {/* <Modal transparent visible={regionVisible}>
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
                  setMobileRegion(
                    itemValue === 'AMERICAS'
                      ? 'NORTH-AMERICA'
                      : //   : itemValue === 'MEASA'
                        //   ? 'APAC'
                        itemValue,
                  );
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
      </Modal> */}

      <BottomNav {...props} navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    // padding: 20,
    marginBottom: 60,
  },
  input: {
    height: 45,
    width: '85%',
    marginLeft: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  content: {
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1.5, height: 2},
    shadowRadius: 5,
    elevation: 5,
  },
  contentWrapper: {
    padding: 10,
  },

  title: {
    margin: 20,
  },
  titleText: {
    color: '#666767',
    fontSize: 14,
    marginTop: 30,
  },
  titleBorder: {
    height: 5,
    width: 50,
    backgroundColor: 'rgba(24,56,99,1)',
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
export default CriticalIssue;
