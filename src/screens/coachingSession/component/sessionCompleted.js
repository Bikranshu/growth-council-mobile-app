import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import {ScrollView} from 'native-base';
import {RadioButton} from 'react-native-paper';

const SessionCompleted = props => {
  const {navigation} = props;
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', paddingTop: 50}}>
      <View
        style={{
          width: '70%',
        }}>
        <View
          style={{
            padding: 15,
            backgroundColor: '#053A68',
            width: '100%',
            borderRadius: 24,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 25}}>Congratulations</Text>
        </View>
        {/* <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: '#053A68',
              marginTop: 10,
            }}>
            You have successfully completed
          </Text>
        </View> */}
      </View>

      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',

          marginTop: 30,
        }}>
        <Text style={{fontSize: 20, color: '#003061', fontWeight: '600'}}>
          {/* ALL SESSIONS */}
          You have successfully completed
        </Text>

        <View
          style={{
            borderWidth: 1,
            height: 2,
            width: 40,
            backgroundColor: '#386488',
            marginTop: 10,
          }}
        />
      </View>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          width: '90%',
          marginTop: 20,
        }}>
        <Image
          source={require('../../../assets/img/congrat.png')}
          style={{
            width: '100%',
            height: 250,
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          width: '90%',
          marginTop: 30,
        }}>
        {/* <Text style={{fontSize: 12, marginBottom: 10}}>View your Score</Text> */}
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Radar');
			navigation.navigate('Dashboard');
          }}>
          <View
            style={{
              padding: 10,
              backgroundColor: '#A1BD6F',
              width: '100%',
              borderRadius: 24,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 18, paddingHorizontal: 20}}>
              {/* View Frost Radar for Leadership */}
              Dashboard
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default SessionCompleted;
