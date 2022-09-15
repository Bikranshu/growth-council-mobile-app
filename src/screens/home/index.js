import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllPillarSliders,
  resetPillarSlider,
} from './slice/pillarSliderSlice';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Button} from 'native-base';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../theme';
// import Home from './components';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const win = Dimensions.get('window');
const buttonContainerWidth = win.width - 80;

const HomeScreen = props => {
  const {navigation, route} = props;

  const dispatch = useDispatch();
  const [activeSlider, setActiveSlider] = useState(1);
  const sliderRef = useRef(null);

  const sliderWidth = viewportWidth;

  const {pillarSliders, pillarSliderLoading, pillarSliderError} = useSelector(
    state => state.pillarSliders,
  );

  useEffect(() => {
    console.log('aab', new Date());
    dispatch(fetchAllPillarSliders());
  }, []);

  /**
   * Fetch all pillar slider data.
   *
   */
  //   const fetchAllPillarSlider = () => {
  //     dispatch(fetchAllPillarSliders());
  //   };

  /**
   * Clear pillar slider data.
   *
   */
  const cleanPillarSlider = () => {
    dispatch(resetPillarSlider());
  };

  const _renderItem = ({item, index}, navigation) => {
    let borderColor = Colors.PRIMARY_BACKGROUND_COLOR;
    switch (item?.slug) {
      case 'community':
        borderColor = Colors.COMMUNITY_COLOR;
        break;
      case 'growth-content':
        borderColor = Colors.PRACTICE_COLOR;
        break;
      case 'growth-coaching':
        borderColor = Colors.COACHING_COLOR;
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate('CouncilDetail', {id: item?.term_id});
        }}>
        <View style={[styles.ImageWrapper, {borderColor: borderColor}]}>
          <Image
            source={{uri: item?.image}}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
          <Text style={styles.sliderText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <Home
    //   {...props}
    //   pillarSliders={pillarSliders}
    //   pillarSliderLoading={pillarSliderLoading}
    //   pillarSliderError={pillarSliderError}
    //   fetchAllPillarSlider={fetchAllPillarSlider}
    //   cleanPillarSlider={cleanPillarSlider}

    // />
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={{width: '70%'}}
            source={require('../../assets/img/GILCouncil.jpg')}
            resizeMode="contain"
          />
        </View>
        <View styyle={styles.sliderView}>
          {!pillarSliderLoading ? (
            <View>
              <FeatherIcon
                name={'chevron-right'}
                style={styles.carouselRight}
                size={36}
                color={'#00000099'}
                onPress={() => {
                  sliderRef.current.snapToNext();
                }}
              />
              <FeatherIcon
                name={'chevron-left'}
                style={styles.carouselLeft}
                size={36}
                color={'#00000099'}
                onPress={() => {
                  sliderRef.current.snapToPrev();
                }}
              />
              <Carousel
                ref={sliderRef}
                layout={'default'}
                data={pillarSliders}
                sliderWidth={sliderWidth}
                itemWidth={viewportWidth - 150}
                renderItem={item => _renderItem(item, navigation)}
                firstItem={1}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContent}
                loop={true}
                loopClonesPerSide={3}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                hasParallaxImages={true}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.5}
                onSnapToItem={index => setActiveSlider(index)}
              />

              <Pagination
                dotsLength={pillarSliders?.length}
                activeDotIndex={activeSlider}
                dotStyle={{
                  width: 16,
                  height: 6,
                  borderRadius: 3,
                }}
                inactiveDotScale={1}
                inactiveDotOpacity={1}
                inactiveDotColor="#DDDCFF"
                dotColor={'#1580B7'}
              />
            </View>
          ) : (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          style={styles.signupbutton}
          onPress={() => {
            console.log('hlo', new Date()), navigation.navigate('HomeDetail');
          }}>
          <Text style={styles.signupbuttonText}>Get Started</Text>
        </Button>
        <Button
          style={styles.signinbutton}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.signinbuttonText]}>Member Login</Text>
        </Button>
      </View>

      <View style={styles.footer}>
        <Text style={{fontSize: 6, marginTop: 10, marginBottom: 10}}>
          Powered By
        </Text>
        <Image
          source={require('../../assets/img/splashFooter.png')}
          style={styles.footerlogo1}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  ImageWrapper: {
    backgroundColor: 'floralwhite',
    height: viewportWidth - 120,
    marginLeft: 20,
    marginRight: 20,
    position: 'relative',
    borderRadius: 10,
    borderWidth: 4,
    overflow: 'hidden',
  },
  wrapper: {
    top: '20%',
  },

  slider: {
    marginTop: 30,
    overflow: 'visible',
  },
  sliderContent: {
    paddingVertical: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ACACAC',
    fontSize: 30,
    fontFamily: Typography.FONT_NORMAL,
    marginTop: 30,
  },
  text1: {
    color: Colors.NONARY_TEXT_COLOR,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    fontFamily: Typography.FONT_NORMAL,
    margin: 30,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  signupbutton: {
    ...CommonStyles.button,
    width: buttonContainerWidth,
    marginBottom: Platform.OS === 'ios' ? 10 : 20,
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRACTICE_COLOR,
  },
  signupbuttonText: {
    ...CommonStyles.buttonText,
    fontSize: 16,
    fontFamily: Typography.FONT_SF_BOLD,
    color: '#ffffff',
  },
  signinbutton: {
    width: buttonContainerWidth,
    borderRadius: 25,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    borderWidth: 2,
    borderColor: '#1580B7',
  },
  signinbuttonText: {
    ...CommonStyles.buttonText,
    fontFamily: Typography.FONT_SF_BOLD,
    fontSize: 16,
    color: '#1580B7',
  },
  iconImage: {
    width: 300,
    height: 350,
    borderRadius: 10,
  },

  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headingText1: {
    fontFamily: Typography.FONT_SF_BOLD,
    fontSize: 30,
    lineHeight: 30,
    fontWeight: 'bold',
    color: '#183863',
    textAlign: 'center',
    marginTop: 10,
  },
  headingText2: {
    fontFamily: Typography.FONT_SEMI_BOLD,
    fontSize: 18,
    lineHeight: 18,
    color: '#6F8BA4',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: Platform.OS === 'ios' ? 15 : 10,
  },

  footer: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerlogo: {
    height: 22,
    resizeMode: 'contain',
    opacity: 2,
  },
  footerlogo1: {
    width: 80,
    height: 35,
    opacity: 0.75,
    marginBottom: 10,
  },
  sliderView: {
    position: 'relative',
    marginTop: 10,
  },
  sliderText: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    color: '#ffffff',
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 13,
  },
  carouselLeft: {
    position: 'absolute',
    left: 15,
    top: '45%',
    zIndex: 99,
  },
  carouselRight: {
    position: 'absolute',
    right: 15,
    top: '45%',
    zIndex: 99,
  },
  loading1: {
    top: 180,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default HomeScreen;
