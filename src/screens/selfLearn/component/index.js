import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SelfAbout from './selfAbout';
import SelfAssessment from '../../coachingSession/component/selfAssessment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {
  fetchSelfLearnById,
  resetSelfLearnById,
} from '../slice/selfLearnByIdSlice';

const SelfLearn = props => {
  const {navigation, route,
	traits,
    traitsLoading,
    traitsError,
    fetchAllTraits,
    fetchAllTraitBySession,
    cleanTraits,} = props;



  const [value, setValue] = useState('About');
  const [modalVisible, setModalVisible] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [answers, setAnswers] = useState({
    totalScore: 0,
    questions: [],
    yellowBenchmarkQuestions: [],
  });

  const [display, setDisplay] = useState(true);
  const ref = useRef();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <ScrollView style={styles.scrollBox}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={"#001D3F"}
        />

        <View>
          <View style={[styles.content, {height: 'auto'}]}>

            <View style={{marginTop: 15}}>
              <SelfAbout {...props} />
            
            </View>
          </View>
        </View>
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  headingTitle: {
    ...CommonStyles.headingTitle,
    textAlign: 'left',
  },
  content: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderRadius: 20,
    borderTopStartRadius: 20,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffff',
  },
  contentHeading: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    color: Colors.NONARY_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 17,
  },
  contentText: {
    fontFamily: Typography.FONT_NORMAL,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 25,
    color: Colors.TERTIARY_TEXT_COLOR,
    textAlign: 'left',
  },
  acceptButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(242,103,34,1)',
  },
  acceptButtonText: {
    color: '#ffffff',
  },
  topbanner: {
    backgroundColor: '#A1BA68',
    height: 60,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140,
    borderRadius: 12,
    padding: 20,
    zIndex: 10,
    position: 'absolute',
  },
  topbanner1: {
    backgroundColor: 'rgba(54,147,172,1)',
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  topbanner2: {
    backgroundColor: 'rgba(128,186,116,1)',
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  scrollBox: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  hostdetail: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  hostimage: {
    flex: 1,
    backgroundColor: '#A1BA68',
    height: 64,
    width: 62,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#F26722',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 25,
    borderColor: '#F26722',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  registeredButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#F26722',
    paddingLeft: 110,
  },
  buttonWrapper: {
    width: 308,
    height: 40,
    backgroundColor: '#ECECEC',
    borderRadius: 15,
  },
});
export default SelfLearn;
