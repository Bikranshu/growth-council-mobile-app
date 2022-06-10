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
  Dimensions,
  StatusBar,
} from 'react-native';
import {Colors, Typography} from '../../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import HTMLView from 'react-native-htmlview';
import {BubblesLoader} from 'react-native-indicator';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../../../shared/loading';
import { useFocusEffect } from '@react-navigation/native';

const CriticalIssue = props => {
  const {
    navigation,
    route,
    criticalIssue,
    criticalIssueLoading,
    criticalIssueError,
    fetchCritcalIssue,
    cleanCriticalIssue,
    index
  } = props;

  const listRef = useRef(null);


  useEffect(() => {
    fetchCritcalIssue();
  }, []);

  useFocusEffect(useCallback(() => {wait(500).then(() => scrollToIndex())}, [criticalIssueLoading]))

  const wait = (ms) => new Promise(resolve => {
    setTimeout(() => {
       resolve(true);
    }, ms)
  })

  const scrollToIndex = () => {
      listRef.current.scrollToIndex({animated: true, index});
  }


  const _renderCritical = ({item, index}) => {
    return (
      <View style={styles.content} 

	  >
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
