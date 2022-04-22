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
  StatusBar,
  Dimensions,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Colors} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import {BubblesLoader} from 'react-native-indicator';
import Loading from '../../../shared/loading';

const Content = props => {
  const {
    navigation,
    content,
    contentLoading,
    contentError,
    cleanContent,
    loader,
  } = props;
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(content);
 

  useEffect(() => {
    setFilteredDataSource(content);
  }, [content]);



  const searchFilterFunction = text => {
    if (text) {
      const newData = content?.filter(function (item) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(content);
      setSearch(text);
    }
  };

  

  const _renderContent = ({item, index}) => {
    return (
      <>
        {item?.children_count !== 0 && (
          <TouchableOpacity
            key={index}
            style={[styles.content, styles.shadowProp]}
            onPress={() => {
              if (item.children_count === 0) {
                navigation.navigate('LibraryDetail', {
                  resources: item?.term_id,
                  itemname: item?.name,
                });
              } else {
                navigation.navigate('ContentDetail', {
                  resourceId: item?.term_id,
                  resourcesName: item?.name,
                });
              }
            }}>
            <>
              <Image
                style={{
                  width: '100%',
                  height: 170,
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                }}
                source={require('../../../assets/img/image.png')}
              />
              <View style={styles.contentWrapper}>
                <Text style={{color: 'black'}}>
                  {item?.children_count === 0
                    ? item?.count
                    : item?.children_count}
                  {/* {item?.count} */}
                </Text>
                <Text
                  style={{
                    fontFamily: 'SFProText-Regular',
                    fontSize: 10,
                    color: 'black',
                  }}>
                  Article
                </Text>
              </View>
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
        )}
      </>
    );
  };

  let abc = 0;

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
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
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
          <Text style={{fontSize: 9, color: '#14A2E2'}}>Content Library</Text>
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
          }}
          contentContainerStyle={{paddingBottom: 50}}>
          {contentLoading && (
            <View style={{marginTop: 40}}>
              <Loading />
            </View>
          )}
          {/* {loader} */}

          
            <FlatList
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}
              data={filteredDataSource}
              renderItem={_renderContent}
            />
         

          {/* <View style={{marginVertical:5}}>
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
    backgroundColor: '#F5F5F5',
  },
  content: {
    width: Dimensions.get('window').width - 30,
    borderRadius: 14,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    marginBottom: 20,
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
    padding: 15,
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
