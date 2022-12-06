import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  PanGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');
const {add, block, concat, cond, event, eq, set, Value} = Animated;

const FloatingButton = props => {
  const rotationRef = useRef();
  const panRef = useRef();
  const pinchRef = useRef();

  const offsetX = new Value(width / 2);
  const offsetY = new Value(height / 10 - 50);
  const offsetR = new Value(0);

  const [X] = useState(new Value(0));
  const [Y] = useState(new Value(0));
  const [R] = useState(new Value(0));

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
    <>
      <View style={styles.container}>
        <PanGestureHandler
          minDist={10}
          ref={panRef}
          onGestureEvent={onPan}
          onHandlerStateChange={onPan}
          simultaneousHandlers={[rotationRef, pinchRef]}>
          <Animated.View style={styles.area}>
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
                      {rotate: concat(R, 'rad')},
                    ],
                  },
                ]}>
                <TouchableOpacity>
                  <Ionicons name="add-circle" size={30} color="white" />
                </TouchableOpacity>
              </Animated.View>
            </RotationGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </>
  );
};
export default FloatingButton;
const CIRCLE_SIZE = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 90,
    right: -160,
    height: 70,
    zIndex: 999,
    backgroundColor: 'green',
    borderRadius: 50,
  },

  area: {
    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
});
