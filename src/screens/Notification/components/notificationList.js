import {position} from 'native-base/lib/typescript/theme/styled-system';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';

const NotificationList = props => {
  const {navigation, route} = props;

  const data = [
    {
      image: 'https://reactnative.dev/img/tiny_logo.png',
      title: 'Event Notification',
      des: ' Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown',
    },
    {
      image: 'https://reactnative.dev/img/tiny_logo.png',
      title: 'Event Notification',
      des: ' Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown',
    },
  ];
  const _renderItem = ({item, index}) => {
    return (
      <View>
        <View style={[styles.bottomWrapper, styles.shadowProp]}>
          <Image
            source={{
              uri: item?.image,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
            }}
          />
          <View
            style={{
              padding: 5,
              paddingLeft: 15,
              width: Dimensions.get('window').width / 2 + 60,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'bold',
                color: 'black',
              }}>
              {item?.title}
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: '#030303',
                marginTop: 3,
              }}>
              {item?.des}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <View style={{marginTop: 5, padding: 5}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            margin: 5,
            marginVertical: 10,
            color: '#222B45',
          }}>
          Recent Notification
        </Text>
        <FlatList data={data} renderItem={_renderItem} />
      </View>
    </>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  bottomWrapper: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 20,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    height: 100,
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
});
