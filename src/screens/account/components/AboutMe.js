import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import moment from 'moment';

import {CommonStyles, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import {BubblesLoader} from 'react-native-indicator';
import * as Colors from '../../../theme/colors';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../../../shared/loading';

const AboutMe = props => {
  const isFocused = useIsFocused();
  const {
    navigation,
    profile,
    profileLoading,
    profileError,
    fetchProfileByIdentifier,
    cleanProfile,
  } = props;

  useEffect(() => {
    fetchProfileByIdentifier();
  }, [isFocused]);

  let title = profile?.user_meta?.title;

  let company = profile?.user_meta?.company;

  let Location = profile?.user_meta?.Location;

  let favorite_quote = profile?.user_meta?.favorite_quote;

  const expertise_areas1 = profile?.expertise_areas1
    ? profile?.expertise_areas1?.join(',')
    : [];

  let professional_summary = profile?.user_meta?.professional_summary;

  let initatives = profile?.user_meta?.initatives;

  let insights = profile?.user_meta?.insights;
  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.middle}>
            <View style={styles.wrapper}>
              {/* {profileLoading && <Loading />} */}

              <View style={styles.TextWrapper}>
                <Text
                  style={{
                    size: 7,
                    marginLeft: 10,
                    fontSize: 10,
                    color: '#8F9BB3',
                  }}>
                  Title
                </Text>
                <TextInput
                  style={styles.input}
                  value={typeof title === 'undefined'
				  ? ''
				  : profile?.user_meta?.title[0]}
                  editable={false}
                />

                <Text
                  style={{
                    size: 7,
                    marginLeft: 10,
                    fontSize: 10,
                    color: '#8F9BB3',
                  }}>
                  Company
                </Text>
                <TextInput
                  style={styles.input}
                  value={
					typeof company === 'undefined'
					? ''
					: profile?.user_meta?.company[0]}
                  editable={false}
                />

                {/* <Text
                  style={{
                    size: 7,
                    marginLeft: 10,
                    fontSize: 10,
                    color: '#8F9BB3',
                  }}>
                  Last Name
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={profile?.user_meta?.last_name[0]}
                  editable={false}
                /> */}

                <Text style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                  Email Address
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={profile?.user_email}
                  editable={false}
                />

                <Text style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                  Region
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  value={
                    typeof Location === 'undefined'
                      ? ''
                      : profile?.user_meta?.Location[0]
                  }
                  editable={false}
                />

                {/* <Text style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                  Favorite Quote
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={
                    typeof favorite_quote === 'undefined'
                      ? ''
                      : profile?.user_meta?.favorite_quote[0]
                  }
                  editable={false}
                /> */}

                <Text style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                  Professional Summary
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={
                    typeof professional_summary === 'undefined'
                      ? ''
                      : profile?.user_meta?.professional_summary[0]
                  }
                  editable={false}
                />

                <Text style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                  Areas of Expertise
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={expertise_areas1}
                  editable={false}
                />

                {/* <Text style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                  Most Recent Growth/Innovation Initative
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={
                    typeof initatives === 'undefined'
                      ? ''
                      : profile?.user_meta?.initatives[0]
                  }
                  editable={false}
                /> */}

                {/* <Text style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                  I'm Seeking Insights On
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textarea}
                  keyboardType="default"
                  value={
                    typeof insights === 'undefined'
                      ? ''
                      : profile?.user_meta?.insights[0]
                  }
                  editable={false}
                /> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    color: '#808080',
  },
  textarea: {
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    color: '#808080',
  },

  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  middle: {},
  wrapper: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F7',
  },
  middleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#EDF1F7',
    position: 'relative',
  },
  TextWrapper: {
    marginTop: 10,
  },

  loading1: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default AboutMe;
