import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  PanGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'native-base';

const {width, height} = Dimensions.get('window');
const {add, block, concat, cond, event, eq, set, Value} = Animated;

const FloatingButton = props => {
  const {navigation} = props;
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
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Ionicons name="add-circle" size={30} color="white" />
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
              height: 500,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Text
                style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>
                Growth Pipeline Dialogue
              </Text>

              <View>
                <Button
                  type="button"
                  onPress={async () => {}}
                  style={{
                    marginLeft: 10,
                    backgroundColor: '#FF5733',
                    marginTop: 20,
                  }}>
                  Growth Pipeline Dialogue
                </Button>
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
	alignItems: 'flex-end'
  },
  circle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    // alignItems: 'center',
	alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 50,
    right: -150,
    backgroundColor: 'green',
    borderRadius: 50,
    marginBottom: 10,
  },
});
