import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles, Colors, Typography} from '../../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const SignUpNext = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#F5F5F5',
              marginLeft: 50,
              borderRadius: 10,
              marginTop: 40,
            }}
          />
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#F5F5F5',
              marginLeft: 90,
              borderRadius: 10,
              marginTop: 90,
            }}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/img/welcome_profile_image.png')}
          />
        </View>

        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: '#F5F5F5',
            marginLeft: 200,
            borderRadius: 10,
          }}
        />

        <View style={styles.header}>
          <Text style={styles.headingText1}>Welcome John!</Text>
          <Text style={styles.headingText2}>Have you some problem today?</Text>
          <Text style={styles.headingText2}>
            Don't worry, now you are a part of Growth Council. Let's us help
            you.
          </Text>
        </View>

        <View style={styles.arrow}>
          <Ionicons
            name={'arrow-forward'}
            size={50}
            color={Colors.PRIMARY_BACKGROUND_ICON_COLOR}
            onPress={() => navigation.navigate('Dashboard')}
          />
        </View>
        <View style={styles.image}>
          <Image source={require('../../../assets/img/footer_logo.png')} />
          <Image
            source={require('../../../assets/img/footer_company_name_image.png')}
            style={{marginTop: 20}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  header: {
    height: 50,
    width: '60%',
    alignContent: 'center',
    marginLeft: 80,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    marginBottom: 20,
    fontWeight: '700',
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_NORMAL,
    width: 220,
  },

  arrow: {
    marginLeft: 280,
    marginTop: 80,
    color: '#0000CD',
  },
});

export default SignUpNext;
