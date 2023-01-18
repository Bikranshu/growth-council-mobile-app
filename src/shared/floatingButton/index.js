import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

import {
  PanGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {Button} from 'native-base';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

import {
  COACHING_COLOR,
  COMMUNITY_COLOR,
  PRACTICE_COLOR,
} from '../../theme/colors';
import Loading from '../loading';
import ToastMessage from '../toast';
import {
  GrowthPipelineEmail,
  resetSendEmail,
} from '../../screens/event/slice/emailButtonSlice';

const {width, height} = Dimensions.get('window');
const {add, block, concat, cond, event, eq, set, Value} = Animated;

const FloatingButton = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [emailStatus, setEmailStatus] = useState(false);
  const {sendEmail, sendEmailLoading, sendEmailError} = useSelector(
    state => state.sendEmail,
  );

  const GDPButton = formData => {
    return dispatch(GrowthPipelineEmail(formData));
  };

  const cleanGDPButton = () => {
    dispatch(resetSendEmail());
  };

  const GrowthPipelineDialogueButton = async () => {
    const response = await GDPButton({});

    if (response?.payload?.code === 200) {
      setModalVisible(false);
      ToastMessage.show('Growth Pipeline Dialog initiated!');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.message);
    }
  };
  const rotationRef = useRef();
  const panRef = useRef();
  const pinchRef = useRef();

  const offsetX = new Value(width / 2);
  const offsetY = new Value(height / 10 - 50);
  const offsetR = new Value(0);

  const [X] = useState(new Value(0));
  const [Y] = useState(new Value(0));
  const [R] = useState(new Value(0));

  const [modalVisible, setModalVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const onPan = event([
    {
      nativeEvent: ({translationX: x, translationY: y, state}) =>
        block([
          set(X, add(x, offsetX)),
          set(Y, add(y, offsetY)),
          cond(eq(state, State.END), [
            set(offsetX, add(offsetX, x)),
            set(offsetY, add(offsetY, y)),
          ]),
        ]),
    },
  ]);

  const onRotate = event([
    {
      nativeEvent: ({rotation: r, state}) =>
        block([
          set(R, add(r, offsetR)),
          cond(eq(state, State.END), [set(offsetR, add(offsetR, r))]),
        ]),
    },
  ]);
  useEffect(() => {
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler
        minDist={10}
        ref={panRef}
        onGestureEvent={onPan}
        onHandlerStateChange={onPan}
        simultaneousHandlers={[rotationRef, pinchRef]}>
        <Animated.View>
          <RotationGestureHandler
            onGestureEvent={onRotate}
            onHandlerStateChange={onRotate}
            ref={rotationRef}
            simultaneousHandlers={[pinchRef, panRef]}>
            <Animated.View
              style={[
                styles.circle,
                {
                  transform: [
                    {translateX: X},
                    {translateY: Y},
                    // {rotate: concat(R, 'rad')},
                  ],
                },
              ]}>
              {isAlertVisible && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 40,
                    right: 50,
                    backgroundColor: PRACTICE_COLOR,
                    marginBottom: 10,
                    width: 190,
                    height: 40,
                    borderRadius: 10,
                    opacity: 0.7,
                  }}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Text style={{color: 'white'}}>
                      Growth Pipeline Dialog.
                    </Text>
                    <Text style={{fontSize: 7, lineHeight: 18, color: 'white'}}>
                      TM
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Growth Pipeline Dialog')
                    }>
                    <Text style={{color: 'white', fontSize: 10}}>
                      Learn More
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{marginLeft: 20}}>
                <Image
                  source={require('../../../src/assets/img/FloatingButton.png')}
                  style={{
                    width: 60,
                    height: 60,
                    marginLeft: 20,
                    opacity: 0.8,
                  }}
                  resizeMode="contain"
                />
                {/* <Ionicons name="add-circle" size={30} color="white" /> */}
              </TouchableOpacity>
            </Animated.View>
          </RotationGestureHandler>
        </Animated.View>
      </PanGestureHandler>

      <Modal transparent visible={modalVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 250,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            {/* <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                  color: PRACTICE_COLOR,
                }}>
                X
              </Text>
            </TouchableOpacity> */}
            <View style={{marginTop: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    lineHeight: 30,
                  }}>
                  Schedule my complimentary Growth Pipeline Dialog
                  <Text
                    style={{
                      fontSize: 8,
                      lineHeight: 25,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      //   backgroundColor: 'red',
                    }}>
                    TM
                  </Text>
                  ?
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  width: 150,
                  backgroundColor: 'grey',
                  marginLeft: 100,
                  marginTop: 20,
                }}
              />

              {sendEmailLoading && <Loading />}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={styles.sendRegisterButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.emailButtonText}>Not Now</Text>
                </TouchableOpacity>

                <View>
                  {/* {!emailStatus && ( */}
                  <Button
                    style={[styles.emailButton]}
                    onPress={async () => {
                      GrowthPipelineDialogueButton();
                    }}>
                    <Text style={styles.acceptButtonText}>Yes</Text>
                  </Button>
                  {/* )} */}
                  {/* {emailStatus && (
                    <TouchableOpacity style={styles.sendRegisterButton}>
                      <Text style={styles.emailButtonText}>Proceed</Text>
                    </TouchableOpacity>
                  )} */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    zIndex: 1011,
    alignItems: 'flex-end',
  },
  circle: {
    // borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    // alignItems: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',

    position: 'absolute',
    bottom: 50,
    right: -160,
    backgroundColor: 'white',
    borderRadius: 50,
    marginBottom: 10,
    width: 60,
    height: 60,
  },
  sendRegisterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 150,
    height: 40,
    backgroundColor: '#EBECF0',
    marginTop: 25,
    borderColor: PRACTICE_COLOR,
    borderWidth: 1,
    position: 'relative',
  },
  emailButton: {
    borderRadius: 20,
    marginRight: 5,
    width: 150,
    height: 40,
    backgroundColor: PRACTICE_COLOR,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailButtonText: {
    color: 'grey',
  },
  acceptButtonText: {
    width: '100%',
    height: 20,
    fontSize: 14,
    color: '#ffffff',
  },
});
