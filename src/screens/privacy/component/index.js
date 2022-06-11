import React, {useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Button} from 'native-base';
import {Linking} from 'react-native';
import Footer from '../../../shared/footer';
import HTMLView from 'react-native-htmlview';

import {CommonStyles, Colors, Typography} from '../../../theme';

const privacy = props => {
  const {
    navigation,
    privacy,
    privacyLoading,
    privacyError,
    fetchPrivacyPolicy,
  } = props;

  const win = Dimensions.get('window');

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  let description = privacy.content1;
  if (description !== undefined) {
    description = privacy.content1;
  } else {
    description = '';
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.privacy}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{privacy.heading1}</Text>
              <View style={styles.titleBorder}></View>
            </View>
            <HTMLView
              value={description}
              textComponentProps={{
                style: {
                  color: 'black',
                  fontSize: 16,
                  paddingBottom: 30,
                  textAlign: 'justify',
                },
              }}
            />
          </View>
          <View style={styles.cta}>
            <Button
              style={[
                styles.button,
                styles.plainButton,
                {backgroundColor: Colors.SECONDARY_BUTTON_COLOR},
              ]}
              onPress={() => navigation.navigate('Gmail')}>
              <Text style={[styles.buttonText, styles.plainButtonText]}>
                Contact Our Program Team
              </Text>
            </Button>
          </View>
          {/* <Footer /> */}
        </View>
      </ScrollView>
    </>
  );
};
export default privacy;
const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    paddingBottom: 20,
  },
  header: {
    ...CommonStyles.header,
    marginTop: Platform.OS === 'ios' ? 120 : 62,
    width: '100%',
    marginLeft: 32,
    marginRight: 32,
  },
  privacy: {
    padding: 30,
  },
  title: {
    marginBottom: 30,
  },
  titleText: {
    color: '#000',
    fontSize: 24,
    paddingBottom: 30,
    fontWeight: '600',
  },
  titleBorder: {
    height: 5,
    width: 50,
    backgroundColor: 'rgba(24,56,99,1)',
  },
  aboutImage: {
    marginBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  backgroundText: {
    padding: 30,
    flex: 1,
    backgroundColor: '#1f71cc',
  },
  backgroundTitle: {
    paddingBottom: 30,
  },
  backgroundTitleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 30,
  },
  backgroundTitleBorder: {
    height: 5,
    width: 50,
    backgroundColor: '#fff',
  },
  backgroundParagraph: {
    color: '#fff',
  },
  cta: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    ...CommonStyles.button,
    height: 60,
    width: 380,
    backgroundColor: Colors.SECONDARY_BUTTON_COLOR,
  },
  buttonText: {
    ...CommonStyles.buttonText,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 15,
  },
  iconImage: {
    width: 300,
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
  },
  paragraph: {
    fontSize: 14,
  },
  plainButton: {
    width: '70%',
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  plainButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
  },
  poweredBy: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
});
