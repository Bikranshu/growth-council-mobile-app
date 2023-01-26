import React from 'react';
import {
  Platform,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {CommonStyles, Colors, Typography} from '../../theme';

const screenHeight = Math.round(Dimensions.get('window').height);

const ContactUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, height: screenHeight}}>
      <View style={styles.container}>
        <View style={styles.topContent}></View>

        <View style={styles.middleContent}>
          <View style={styles.middleCircleWrapper}>
            <View style={styles.circleEnvelope}>
              <Icon
                name="envelope"
                size={20}
                color={Colors.UNDENARY_TEXT_COLOR}
              />
            </View>
            <View style={{marginRight: 60}} />
            <View style={styles.circleMessage}>
              <MaterialCommunityIcons
                name="message-text"
                color={Colors.DUODENARY_TEXT_COLOR}
                size={20}
              />
            </View>
            <View style={{marginRight: 60}} />
            <View style={styles.circlePhone}>
              <MaterialCommunityIcons
                name="phone"
                color={Colors.THRIODENARY_TEXT_COLOR}
                size={20}
              />
            </View>
          </View>

          <View style={styles.contentWrapper}>
            <Text style={styles.headingText1}>About Us</Text>
            <ScrollView style={{height: Platform.OS === 'ios' ? 260 : 200}}>
              <Text style={styles.paragraph}>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum has
                been the industry’s standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
              </Text>
            </ScrollView>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <View style={styles.circleLocation}>
            <Ionicons
              name="location-outline"
              size={25}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          </View>
          <Text style={styles.locationText}>
            Financial Center Street, Along Sheikh Zayed Road, Next to Burj
            Khalifa - United Arab Emirates
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    color: Colors.QUINARY_TEXT_COLOR,
  },
  topContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 90 : 50,
    marginLeft: 32,
    marginRight: 32,
    paddingTop: 40,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  momeLogo: {
    width: 100,
    height: 109,
  },
  middleContent: {
    backgroundColor: Colors.TERTIARY_BACKGROUND_COLOR,
    padding: 32,
    marginTop: 10,
    height: '45%',
  },
  middleCircleWrapper: {
    ...CommonStyles.circleListItem,
    flexDirection: 'row',
    position: 'absolute',
    top: '-18%',
    left: 32,
    right: 32,
    width: '100%',
    height: 93,
    backgroundColor: Colors.TERTIARY_BACKGROUND_COLOR,
    borderRadius: 4,
    borderColor: 'rgba(1,1,1,0.10)',
    paddingTop: 15,
    paddingBottom: 15,
    zIndex: 1,
  },
  circleEnvelope: {
    ...CommonStyles.circleFixed,
    backgroundColor: 'rgba(107,89,237,0.10)',
    borderColor: 'rgba(107,89,237,0.10)',
  },
  circleMessage: {
    ...CommonStyles.circleFixed,
    backgroundColor: 'rgba(11,142,254,0.10)',
    borderColor: 'rgba(11,142,254,0.10)',
  },
  circlePhone: {
    ...CommonStyles.circleFixed,
    backgroundColor: 'rgba(83,213,116,0.10)',
    borderColor: 'rgba(83,213,116,0.10)',
  },
  contentWrapper: {
    paddingTop: 50,
    paddingBottom: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontSize: Typography.FONT_SIZE_EXTRA_LARGE,
    fontFamily: Typography.FONT_MEDIUM,
    lineHeight: 27,
    textAlign: 'left',
  },
  paragraph: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    color: Colors.TERTIARY_TEXT_COLOR,
    lineHeight: 21,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  bottomContent: {
    height: '100%',
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 0,
    paddingLeft: 32,
    paddingRight: 32,
    flexDirection: 'row',
  },
  circleLocation: {
    ...CommonStyles.circleFixed,
    backgroundColor: 'rgba(0,0,255,0.10)',
    borderColor: 'rgba(0,0,255,0.10)',
    marginTop: 20,
  },
  locationText: {
    width: '75%',
    marginTop: 13,
    paddingLeft: 15,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 21,
    color: Colors.TERTIARY_TEXT_COLOR,
    fontFamily: Typography.FONT_MEDIUM,
    alignItems: 'center',
  },
});

export default ContactUsScreen;
