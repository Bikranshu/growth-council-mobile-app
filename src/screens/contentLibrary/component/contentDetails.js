import React, {useEffect, useState, useCallback} from 'react';
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
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Colors, Typography} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import {BubblesLoader} from 'react-native-indicator';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Loading from '../../../shared/loading';
import { GROWTH_CONTENT_FALLBACK_IMAGE } from '../../../constants';

const ContentLibrary = props => {
  const {
    navigation,
    route,
    contentLibrary,
    contentLibraryLoading,
    contentLibraryError,
    fetchContentLibrary,
    cleanContentLibrary,
  } = props;
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(contentLibrary);

  useFocusEffect(
    useCallback(() => {
      fetchContentLibrary(route.params.resourceId);
      return () => {
        cleanContentLibrary();
      };
    }, []),
  );

  useEffect(() => {
    setFilteredDataSource(contentLibrary);
  }, [contentLibrary]);

  const breadcrumbName = route.params.resourcesName;

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      const newData = contentLibrary.filter(function (item) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(contentLibrary);
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
        </View>

        <View
          style={{
            margin: 15,
            paddingBottom: 10,
            borderBottomWidth: 0.3,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 9}}>Content Library</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={15}
                color="#B2B3B9"
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 9, color: '#14A2E2'}}>
                {breadcrumbName}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
          }}
          contentContainerStyle={{paddingBottom: 50}}>
          {contentLibraryLoading && (
            <View style={{marginTop: 40}}>
              <Loading />
            </View>
          )}

          <View style={{alignItems: 'center'}}>
            {filteredDataSource.map((item, key) => {
              const itemname = item?.name;
              return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.content, styles.shadowProp]}
                    onPress={() =>
                      navigation.navigate('LibraryDetail', {
                        breadcrumbName,
                        resources: item?.term_id,
                        itemname,
                      })
                    }>
                    <>
                      <Image
                        style={{
                          width: '100%',
                          height: 170,
                          borderTopLeftRadius: 14,
                          borderTopRightRadius: 14,
                        }}
                        source={{uri: item?.image||null}}
                        resizeMode="stretch"
                      />
                      <View style={styles.wrapper}>
                        <HTMLView
                          value={item?.name}
                          textComponentProps={{
                            style: {
                              color: 'black',
                              fontWeight: '600',
                            },
                          }}
                        />
                      </View>
                    </>
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
    flex: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  input: {
    flex: 1,
    height: 45,
    marginLeft: 10,
    borderRadius: 19,
    color: 'black',
    backgroundColor: '#F5F5F5',
  },
  content: {
    width: Dimensions.get('window').width - 30,
    marginBottom: 20,
    borderRadius: 14,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: 'white',
  },
  contentWrapper: {
    position: 'absolute',
    width: 55,
    height: 60,
    top: 10,
    right: 10,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    backgroundColor: '#ECECEC',
  },
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
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
export default ContentLibrary;
