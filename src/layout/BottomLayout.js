import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomLayout = ({focused, navigation}) => {
  return (
    <View style={[styles.NavContainer, styles.shadow]}>
      <View style={styles.NavBar}>
        <Pressable onPress={() => navigation.navigate('Dashboard')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
              }}>
              <Ionicons
                name="home-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? 'black' : '#FFFFFF'}}
              />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Calendar')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
              }}>
              <Ionicons
                name="calendar-outline"
                color={focused ? 'black' : 'red'}
                size={30}
                style={{color: focused ? 'black' : '#FFFFFF'}}
              />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('UserList')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
              }}>
              <Ionicons
                name="chatbox-outline"
                color={'#000'}
                size={30}
                style={{color: focused ? 'black' : '#FFFFFF'}}
              />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('People')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 8 : 0,
              }}>
              <Ionicons
                name="people-outline"
                color={'#000'}
                size={35}
                style={{color: focused ? 'black' : '#FFFFFF'}}
              />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Account')}>
          <View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 3,
              }}>
              <Ionicons
                name="person-outline"
                color={'#000'}
                size={28}
                style={{color: focused ? 'black' : '#FFFFFF'}}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  NavContainer: {
    position: 'absolute',
    bottom: 5,
    // backgroundColor: '#0C336C',
    backgroundColor: 'rgba(12,51,108,0.98)',
    height: 60,
    alignContent: 'center',
    left: 10,
    right: 10,
    borderRadius: 15,
    opacity: 1.2,
  },
  shadow: {
    shadowColor: 'rgba(200, 200, 200, 0.33)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2.5,
    shadowRadius: 3.5,
    elevation: 3,
  },
  NavBar: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    borderRadius: 40,
  },
  IconBehave: {
    padding: 14,
  },
});

export default BottomLayout;
