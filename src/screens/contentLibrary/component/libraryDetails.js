import React, {useState, useEffect, useCallback} from 'react';
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
  StatusBar,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Colors, Typography} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {BubblesLoader} from 'react-native-indicator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loading from '../../../shared/loading';

const LibraryDetail = props => {
  const {
    navigation,
    route,
    libraryDetails,
    libraryDetailsLoading,
    libraryDetailsError,
    fetchLibraryDetail,
    cleanLibraryDetail,
  } = props;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(libraryDetails);

  useFocusEffect(
    useCallback(() => {
      fetchLibraryDetail(route.params.resources);

      return () => {
        cleanLibraryDetail();
      };
    }, []),
  );

  useEffect(() => {
    setFilteredDataSource(libraryDetails);
  }, [libraryDetails]);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = libraryDetails.filter(function (item) {
        const itemData = item?.post_title
          ? item?.post_title.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(libraryDetails);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <View style={styles.container}>
        {/* Search Header */}
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
            <Ionicons name="chevron-back-outline" size={30} color="#B2B3B9" />
          </TouchableOpacity>

          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <Searchbar
              style={styles.input}
              inputStyle={{
                height: 38,
                paddingVertical: 0,
              }}
              placeholder="Search"
              placeholderTextColor="#B2B3B9"
              iconColor="#B2B3B9"
              value={search}
              onChangeText={text => searchFilterFunction(text)}
            />
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            margin: 15,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.3,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 9}}>Growth Content</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={15}
              color="#B2B3B9"
            />
          </View>
          {route.params.breadcrumbName !== undefined && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 9}}>{route.params.breadcrumbName} </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={15}
                color="#B2B3B9"
              />
            </View>
          )}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <HTMLView
              value={route.params.itemname}
              textComponentProps={{
                style: {
                  fontSize: 9,
                  color: '#14A2E2',
                },
              }}
            />
          </View>
        </View>

        <ScrollView
          style={{flex: 1, backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}
          contentContainerStyle={{paddingBottom: 50}}>
          {libraryDetailsLoading && (
            <View style={{marginTop: 40}}>
              <Loading />
            </View>
          )}

          <View style={{alignItems: 'center'}}>
            {filteredDataSource.map(item => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ContentLibraryDetail', {
                      id: item?.ID,
                      title: item?.post_title,
                      itemname: route?.params?.itemname,
                      resourceId: route?.params?.resources,
                    })
                  }>
                  <View>
                    <View style={[styles.eventCard, styles.shadowProp]}>
                      <View
                        style={[styles.eventTheme, {borderColor: '#19325A'}]}
                      />
                      <View style={styles.eventDetails}>
                        <View style={styles.eventInfo}>
                          <Text style={styles.eventTitle}>
                            {item?.post_title}
                          </Text>

                          <HTMLView
                            value={'<p>' + item?.post_excerpt + '</p>'}
                            stylesheet={webViewStyle}
                          />
                        </View>
                        <View
                          style={{
                            width: 50,
                            height: 60,
                            backgroundColor: '#EBECF0',
                            borderRadius: 10,
                            padding: 10,
                            alignItems: 'center',
                          }}>
                          {item?.video_url !== null && item?.video_url !== '' && (
                            <Image
                              source={require('../../../assets/img/file-play.png')}
                              style={{
                                width: 20,
                                height: 20,
                                color: '#9B9CA0',
                              }}
                              resizeMode="contain"
                            />
                          )}
                          {item?.video_url === '' && (
                            <FontAwesome5
                              name="file-pdf"
                              size={20}
                              color="#9B9CA0"
                            />
                          )}
                          {item?.video_url === null && (
                            <FontAwesome5
                              name="file-pdf"
                              size={20}
                              color="#9B9CA0"
                            />
                          )}
                          <Text style={{fontSize: 8, marginTop: 2}}>View</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* <View style={{marginTop: 10}}>
            <Footer />
          </View> */}
        </ScrollView>
      </View>
      <BottomNav {...props} navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
  },
  input: {
    flex: 1,
    height: 45,
    marginLeft: 10,
    borderRadius: 19,
    backgroundColor: '#F5F5F5',
  },
  content: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 0.3,
    // backgroundColor: 'red',
  },
  contentWrapper: {
    width: 50,
    height: 60,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    position: 'absolute',
    right: 10,
    top: 20,
    opacity: 0.7,
  },

  eventCard: {
    width: Dimensions.get('window').width - 20,
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,

    // borderWidth: 0.3,
  },
  eventTheme: {
    width: 10,
    borderRadius: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 10,
  },
  eventDetails: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  eventInfo: {
    paddingRight: 5,
    flex: 5,
  },
  eventTitle: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'normal',
    fontWeight: '600',
    color: 'black',
  },
  eventParagraph: {
    fontSize: 8,
    fontWeight: 'regular',
  },
  eventDate: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    fontSize: 18,
    height: 50,
    width: 40,
  },
  eventDateText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'normal',
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
const webViewStyle = StyleSheet.create(
  {p: {fontSize: 10}},
  {h3: {fontSize: 9, color: '#14A2E2'}},
);
export default LibraryDetail;
