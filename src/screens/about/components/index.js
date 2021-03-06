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
  useWindowDimensions,
} from 'react-native';
import {Button} from 'native-base';
import {Linking} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Footer from '../../../shared/footer';

import {CommonStyles, Colors, Typography} from '../../../theme';

const About = props => {
  const {navigation, about, aboutLoading, aboutError, fetchAbout} = props;
  const {width} = useWindowDimensions();

  const win = Dimensions.get('window');
  const imageContainerWidth = win.width - 40;

  const tagsStyles = {
    whiteSpace: 'normal',
    color: 'white',
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  let heading1 = about?.heading1;
  if (heading1 !== undefined) {
    heading1 = about?.heading1;
  } else {
    heading1 = '';
  }

  let content1 = about?.content1;
  if (content1 !== undefined) {
    content1 = about?.content1;
  } else {
    content1 = '';
  }

  let heading2 = about?.heading2;
  if (heading2 !== undefined) {
    heading2 = about?.heading2;
  } else {
    heading2 = '';
  }

  let content2 = about?.content2;
  if (content2 !== undefined) {
    content2 = about?.content2;
  } else {
    content2 = '';
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: Platform.OS === 'ios' ? 400 : 350,
        }}>
        <View style={styles.container}>
          <View style={styles.about}>
            <View style={styles.title}>
              <HTMLView
                value={heading1}
                textComponentProps={{
                  style: {
                    color: 'black',
                    fontSize: 24,
                    paddingBottom: 30,
                    fontWeight: '600',
                  },
                }}
              />

              <View style={styles.titleBorder}></View>
            </View>
            {/* <RenderHtml contentWidth={width} source={{html: content1}} /> */}

            <HTMLView
              value={content1}
              textComponentProps={{style: {fontSize: 14, color: '#666767'}}}
            />
          </View>
          <View style={styles.aboutImage}>
            <Image
              source={{uri: about.image}}
              style={{
                width: imageContainerWidth,
                height: 220,
                borderRadius: 16,
                marginTop: 20,
              }}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.backgroundText}>
            <View style={styles.backgroundTitle}>
              <HTMLView
                value={heading2}
                textComponentProps={{
                  style: {
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: '600',
                    paddingBottom: 30,
                  },
                }}
              />

              <View style={styles.backgroundTitleBorder}></View>
            </View>

            <HTMLView
              value={content2}
              textComponentProps={{style: {color: 'white', fontSize: 14}}}
            />
          </View>
          <View style={styles.cta}>
            <Button
              style={[
                styles.button,
                styles.plainButton,
                {backgroundColor: Colors.SECONDARY_BUTTON_COLOR},
              ]}
              onPress={() => Linking.openURL('mailto:contact@frost.com')}>
              <Text style={[styles.buttonText, styles.plainButtonText]}>
                Contact Us
              </Text>
            </Button>
          </View>
          {/* <View style={{ alignItems:'center', width:'35%',marginLeft:140, marginBottom:10}}>
					<Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
					<Image 
						source={require('../../../assets/img/fristDigi.png')}
						style={{width:"100%", height:20}}
					/>
					
				</View> */}
          <Footer />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  header: {
    ...CommonStyles.header,
    marginTop: Platform.OS === 'ios' ? 120 : 62,
    width: '100%',
    marginLeft: 32,
    marginRight: 32,
  },
  about: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
  },
  titleText: {
    color: '#000',
    fontSize: 24,
    paddingBottom: 10,
    fontWeight: '600',
  },
  titleBorder: {
    height: 5,
    width: 50,
    backgroundColor: 'rgba(24,56,99,1)',
  },
  aboutImage: {
    marginBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
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
    color: 'white',
    fontSize: 14,
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
  paragraph: {
    fontSize: 14,
  },
});

const htmlStyles = StyleSheet.create({
  a: {
    color: 'white',
  },
});

export default About;
