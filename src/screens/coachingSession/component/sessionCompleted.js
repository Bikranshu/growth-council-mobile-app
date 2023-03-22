import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {DataTable} from 'react-native-paper';
import {fetchProfileByID} from '../../account/slice/profileSlice';
import Loading from '../../../shared/loading';

const SessionCompleted = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {profile, profileLoading, profileError} = useSelector(
    state => state.profile,
  );
  useEffect(() => {
    dispatch(fetchProfileByID());
  }, []);
  return (
    <ScrollView style={{flex: 1, marginBottom: 20}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}>
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
          <Text
            style={{
              fontSize: 20,
              color: '#003061',
              fontWeight: '600',
              justifyContent: 'center',
            }}>
            {/* ALL SESSIONS */}
            You have successfully completed
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: '#003061',
              marginTop: 20,
              fontWeight: '600',
              justifyContent: 'center',
            }}>
            {/* ALL SESSIONS */}
            Your's Score
          </Text>

          <View
            style={{
              borderWidth: 1,
              height: 2,
              width: 40,
              backgroundColor: '#386488',
              marginTop: 20,
            }}
          />
        </View>
        {/* <View
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
      </View> */}
        {profileLoading && <Loading />}
        <View style={styles.container}>
          <View style={styles.tableHeader}>
            <Text style={{width: 250}}>Traits Name</Text>
            <Text style={{width: 100}}>Score</Text>
          </View>
          {profile?.session_score?.map(item => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  borderBottomWidth: 1,
                  height: 60,
                  padding: 5,
                  borderColor: '#D3D3D3',
                }}>
                <Text style={{width: 250, justifyContent: 'center'}}>
                  {item?.trait_1}
                </Text>
                <Text style={{width: 100, justifyContent: 'center'}}>
                  {item?.growth_index}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  borderBottomWidth: 1,
                  height: 60,
                  padding: 5,
                  borderColor: '#D3D3D3',
                }}>
                <Text style={{width: 250, justifyContent: 'center'}}>
                  {item?.trait_2}
                </Text>
                <Text style={{width: 100, justifyContent: 'center'}}>
                  {item?.innovative_index}
                </Text>
              </View>
            </>
          ))}
        </View>
        {/* <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{width: 500}}>Traits Name</DataTable.Title>
            <DataTable.Title style={{width: 200}}> Score</DataTable.Title>
          </DataTable.Header>
          {profile?.session_score?.map(item => (
            <>
              <DataTable.Row>
                <DataTable.Cell style={{fontSize: 12}}>
                  {item?.trait_1}
                </DataTable.Cell>
                <DataTable.Cell>{item?.growth_index}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={{fontSize: 12}}>
                  {item?.trait_2}
                </DataTable.Cell>
                <DataTable.Cell>{item?.innovative_index}</DataTable.Cell>
              </DataTable.Row>
            </>
          ))}
        </DataTable> */}
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
              <Text
                style={{color: 'white', fontSize: 18, paddingHorizontal: 20}}>
                {/* View Frost Radar for Leadership */}
                Dashboard
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    height: 50,
    flexDirection: 'row',
    padding: 10,
  },
});

export default SessionCompleted;
