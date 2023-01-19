import React, {useCallback, useState, useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  ImageBackground,
  FlatList,
} from 'react-native';

import {Button} from 'native-base';
import HTMLView from 'react-native-htmlview';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from '../../shared/loading';
import FloatingButton from '../../shared/floatingButton';
import {CommonStyles, Colors, Typography} from '../../theme';
import {fetchGrowthPipeline, resetGrowthPipeline} from './GPDSlice';
import {emptyContainerRenderData} from '../../utils/flatlistRenderData';

const win = Dimensions.get('window');
const contentContainerWidth = win.width / 2;

const GPDScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {GDP, GDPLoading, GDPError} = useSelector(state => state.GDP);

  // fetch about data
  useEffect(() => {
    dispatch(fetchGrowthPipeline());
  }, []);

  let content1 = GDP?.content1;
  if (content1 !== undefined) {
    content1 = GDP?.content1;
  } else {
    content1 = '';
  }

  console.log(Dimensions.get('screen').height / 9);
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />

      <FlatList
        data={emptyContainerRenderData}
        scrollEventThrottle={16}
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.y;
          if (offset >= 70) {
            navigation.setOptions({
              headerShown: false,
            });
          } else {
            navigation.setOptions({
              headerShown: true,
            });
          }
        }}
        contentContainerStyle={{
          backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        }}
        ListHeaderComponent={() => {
          return (
            <View>
              <ImageBackground
                source={require('../../assets/img/appBG.png')}
                style={{
                  height: (Dimensions.get('screen').height - 200) / 2,
                  paddingTop:
                    Platform.OS === 'ios'
                      ? Dimensions.get('screen').height / 7
                      : Dimensions.get('screen').height / 9,
                  width: win.width,
                }}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  {/* <Text
                    style={{
                      color: 'white',
                      fontSize: 32,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      lineHeight: 40,
                    }}>
                    Growth is a Journey.{`\n`} We are your guide.
                  </Text> */}

                  <HTMLView
                    value={GDP?.top_heading_first}
                    textComponentProps={{
                      style: {
                        color: 'white',
                        fontSize: 32,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        lineHeight: 40,
                      },
                    }}
                  />
                  <HTMLView
                    value={GDP?.top_heading_second}
                    textComponentProps={{
                      style: {
                        color: 'white',
                        fontSize: 32,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        lineHeight: 40,
                      },
                    }}
                  />

                  <HTMLView
                    value={GDP?.top_content}
                    textComponentProps={{
                      style: {
                        color: 'white',
                        fontSize: 14,
                        // textAlign: 'center',
                        marginTop: 20,
                        lineHeight: 20,
                        width: 300,
                        textAlign: 'justify',
                      },
                    }}
                  />
                </View>
              </ImageBackground>
              <View>
                <Image
                  source={{uri: GDP?.image}}
                  style={{
                    width: '100%',
                    height: 250,
                  }}
                  resizeMode={'cover'}
                />
                <View style={{padding: 25}}>
                  <HTMLView
                    value={GDP?.botton_heading}
                    textComponentProps={{
                      style: {
                        fontSize: 20,
                        color: 'darkblue',
                        marginBottom: 20,
                        fontWeight: 'bold',
                      },
                    }}
                  />

                  <HTMLView
                    value={GDP?.bottom_content}
                    textComponentProps={{
                      style: {
                        color: 'black',
                        fontSize: 14,
                        textAlign: 'center',

                      },
                    }}
                  />
                  {GDP?.gpd_features?.map(item => {
                    console.log({item});
                    return (
					
                      <View style={[styles.wrapper, styles.shadowProp]}>
                        <Ionicons name="arrow-forward" size={30} color="blue" />
                        <Text
                          style={{
                            marginLeft: 20,
                            lineHeight: 20,
                            width: '80%',
                          }}>
                          {item?.feature}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          );
        }}
        renderItem={() => {
          return null;
        }}
        keyExtractor={index => index.toString()}
      />
      <FloatingButton {...props} />
    </View>
  );
};

export default GPDScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  icon: {
    width: 110,
    height: 110,
    borderColor: Colors.PRIMARY_BACKGROUND_COLOR,
    borderRadius: 16,
    borderWidth: 3,
    overflow: 'hidden',
    position: 'absolute',
    top: -35,
  },
  text: {
    color: '#343537',
    marginLeft: 5,
    fontFamily: Typography.FONT_SF_REGULAR,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
    color: '#222B45',
  },
  profileWrapper: {
    padding: 20,
    alignItems: 'center',
    width: 328,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    borderRadius: 12,
    position: 'relative',
    paddingTop: 100,
    borderWidth: 1,
    borderColor: '#707070',
  },
  middle: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    padding: contentContainerWidth / 4 - 30,
    marginTop: 20,
    backgroundColor: 'white',
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
