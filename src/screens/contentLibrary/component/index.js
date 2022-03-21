import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Colors, Typography} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import {BubblesLoader} from 'react-native-indicator';
import SearchBox from '../../../shared/header/SearchHeader';

const Content = props => {
  const {
    navigation,
    content,
    contentLoading,
    contentError,
    fetchContent,
    cleanContent,

    searchContent,
    searchContentLoading,
    searchContentError,
    searchContentByIdentifier,
    cleanContentSearch,
  } = props;
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const fetchContentAsync = async () => {
      await fetchContent({
        s: searchKey,
      });
    };
    fetchContentAsync();
  }, []);

  const onChangeSearch = text => {
    setSearchKey(text);
    searchContentByIdentifier({s: text});
  };
  const onCleanSearch = () => {
    searchContentByIdentifier({s: ''});
  };

  const _renderContent = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ContentDetail', {
            resourceId: item?.term_id,
            resourcesName: item?.name,
          })
        }>
        <View style={[styles.content, styles.shadowProp]}>
          <ImageBackground
            style={{width: '100%', height: 190, borderRadius: 16}}
            source={{uri: item?.image}}>
            <View style={styles.contentWrapper}>
              <Text>{item?.count}</Text>
            </View>
            <View style={styles.wrapper}>
              <HTMLView
                value={item?.name}
                style={{fontSize: 14, color: 'black'}}
              />
              {/* <Text style={{color: 'black', fontSize: 14}}>{item.name}</Text> */}
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 20,
              alignContent: 'center',
              marginLeft: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={30}
                color="#B2B3B9"
                style={{marginTop: 5}}
              />
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 10,
                width: '90%',
                borderRadius: 10,
              }}>
              {/* <Searchbar
			  style={styles.input}
                placeholder="Search"
                keyboardType="default"
                value={searchKey}
                onChangeText={onChangeSearch}

              /> */}
			  {/* <SearchBox searchContentByIdentifier={searchContentByIdentifier}/> */}
              <Searchbar
                style={styles.input}
                placeholder="Search"
                keyboardType="default"
                value={searchKey}
                onChangeText={async text => {
                  setSearchKey(text);
                  await fetchContent({
                    s: text,
                  });
                }}
              />
            </View>
          </View>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={{fontSize: 9, color: '#14A2E2', marginBottom: 10}}>
              Content Library
            </Text>
            <View style={{borderWidth: 0.2}} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
          }}>
          {contentLoading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
            </View>
          )}
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={content}
            renderItem={_renderContent}
          />
          <View style={{marginTop: 10}}>
            <Footer />
          </View>
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
    height: 45,
    width: '70%',
    marginLeft: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  content: {
    width: '98%',
    marginLeft: 5,
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
    // borderWidth: 0.3,
    backgroundColor: 'white',
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
  wrapper: {
    padding: 10,
    zIndex: 30,

    bottom: 0.3,
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: 'white',
    position: 'absolute',
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
export default Content;
