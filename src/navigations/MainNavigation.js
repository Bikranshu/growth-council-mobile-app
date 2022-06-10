import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator detachInactiveScreens={false} screenOptions={() => ({})}>
      <Stack.Group>
        {/*         
        <Stack.Screen
          name="SignUpNext"
          component={SignUpNextScreen}
          options={{
            headerLeft: () => null,
            headerTitle: '',
            headerTransparent: true,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        /> */}

        {/* <Stack.Screen
          name="contentLibrary"
          component={ContentScreen}
          options={() => ({
            header: ({navigation}) => (
              <SubHeader
                title="content Library"
                image={require('../assets/img/Rectangle.png')}
                navigation={navigation}
                noDrawer={true}
              />
            ),
          })}
        /> */}
      </Stack.Group>

      <Stack.Group></Stack.Group>
    </Stack.Navigator>
  );
};

export default MainNavigation;
