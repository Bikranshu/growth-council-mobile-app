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
} from 'react-native';

import {Button} from 'native-base';
import HTMLView from 'react-native-htmlview';
import {useDispatch, useSelector} from 'react-redux';

import Loading from '../../shared/loading';
import FloatingButton from '../../shared/floatingButton';
import {CommonStyles, Colors, Typography} from '../../theme';
import {fetchGrowthPipeline, resetGrowthPipeline} from './GPDSlice';

const GPDScreen = props => {
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
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#001D3F"
        translucent={false}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.privacy}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Growth Pipeline Dialog</Text>
              <View style={styles.titleBorder}></View>
            </View>
            {GDPLoading && <Loading />}
            <View>
              <HTMLView
                value={content1}
                textComponentProps={{
                  style: {
                    fontSize: 14,
                    paddingBottom: 30,
                    textAlign: 'justify',
                    whiteSpace: 'pre-wrap',
                  },
                }}
              />
              {/* <Text
                style={{
                  
                }}>
                The Growth Innovation Leadership Council`s mission is to enable
                exacutive to achieve transformational growth fo themselves,
                their companies and for industry and society at large through
                enlightened leadership.
                {'\n'}
                {'\n'}
                The Council delivers thought leader and year-round networking
                around a member-defined set of Critical Issues shaping our
                futures
                {'\n'}
                {'\n'}
                Each year, Council Members work together to set the Critical
                Issues Agenda for the year ahead. These issues then guide the
                development of our live events, virtual events and curated
                content on the portal. Setting the Critical Issues Agendais akey
                role in ensuring the content for the Council is driven by its
                members.
              </Text> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatingButton {...props} />
    </View>
  );
};

export default GPDScreen;
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
    paddingBottom: 20,
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
