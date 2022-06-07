import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {Button} from 'native-base';
import HTMLView from 'react-native-htmlview';
import Loading from '../../../shared/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';
const screenHeight = Math.round(Dimensions.get('window').height);

const Detail = props => {
  const {
    navigation,
    route,
    details,
    detailLoading,
    detailError,
    fetchAllDetail,
    cleanDetail,
  } = props;

  useEffect(() => {
    fetchAllDetail();
  }, []);

  let description = details?.content1;
  if (description !== undefined) {
    description = details?.content1;
  } else {
    description = '';
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../../assets/img/splash-screen.png')}
          resizeMode="cover">
          <View style={{height: 142}} />

          <View style={styles.content}>
            <View>
              <Text style={styles.headingText1}>{details?.heading1}</Text>
              <View style={styles.titleBorder}></View>
              <HTMLView
                value={description}
                textComponentProps={{
                  style: {
                    fontFamily: Typography.FONT_NORMAL,
                    fontSize: Typography.FONT_SIZE_MEDIUM,
                    lineHeight: 20,
                    marginTop: 1,
                    marginBottom: 25,
                    color: Colors.TERTIARY_TEXT_COLOR,
                    textAlign: 'justify',
                  },
                }}
              />
			   {detailLoading && <Loading />}
              <Button
                style={styles.acceptButton}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.acceptButtonText}>
                  Join Growth Innovation Leadership Council
                </Text>
              </Button>
            </View>

            <View></View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    flex: 1,
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 25,
    flexGrow: 1,
    height: '100%',
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  paragraph: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 20,
    marginTop: 1,
    marginBottom: 25,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  acceptButton: {
    borderRadius: 10,
    height: 50,
    backgroundColor: Colors.PRACTICE_COLOR,
    marginTop: 10,
  },
  acceptButtonText: {
    color: 'white',
  },
  titleBorder: {
    marginTop: 30,
    marginBottom: 30,
    height: 5,
    width: 50,
    backgroundColor: 'rgba(24,56,99,1)',
  },
});
export default Detail;
