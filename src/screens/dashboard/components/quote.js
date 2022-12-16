import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal
} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const win = Dimensions.get('window');

const Quote = props => {
  const {dailyQuote, navigation, modalVisible, setModalVisible} = props;
  //   const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  //   const [modalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState('');

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const _renderDailyQuoteItem = ({item, index}) => {
    const date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let target_offset = -8; //PST from UTC 7 hours behind right now, will need to fix for daylight
    let los_angles = utc + 3600000 * target_offset;
    const nd = new Date(los_angles);
    const PSTTime = nd.toLocaleString();
    const ActualPSTTime = moment(PSTTime).format('DD/MM/yyyy');

    // console.log(ActualPSTTime);
    return (
      <>
        {ActualPSTTime === item?.quote_date ? (
          <View>
            <LinearGradient
              start={{x: 0.697, y: -0.943}}
              end={{x: 0.413, y: 2.24}}
              colors={['#58AFF6', '#002651']}
              style={styles.quote}>
              <View>
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={2}
                  style={{fontSize: 14, marginTop: 10, color: 'white'}}>
                  {item?.daily_quote}
                </Text>
                <View
                  style={{
                    alignItems: 'flex-end',
                    position: 'absolute',
                    right: 10,
                    bottom: 30,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      position: 'absolute',
                      right: 10,
                      fontWeight: 'bold',
                      color: 'white',
                      marginTop: 5,
                    }}>
                    {item?.quote_author}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true), setdata(item);
                  }}
                  style={{marginTop: 10}}>
                  <Text
                    style={{fontSize: 12, color: 'white', textAlign: 'center'}}>
                    'See More...'{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <ScrollView>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dailyQuote}
            renderItem={_renderDailyQuoteItem}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',

            }}>
            <LinearGradient
              start={{x: 0.697, y: -0.943}}
              end={{x: 0.413, y: 2.24}}
              colors={['#E27741', '#3982C0']}
              style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(false)}
                style={{
                  alignItems: 'flex-end',
                  position: 'absolute',
                  right: 0,
                  margin: 5,
                }}>
                <Text
                  style={{
                    padding: 10,
                    fontSize: 18,
                    color: 'white',
                    textAlign: 'right',
                  }}>
                  X
                </Text>
              </TouchableOpacity>
              <Text style={{marginTop: 10, color: 'white'}}>
                {data.daily_quote}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  position: 'relative',
                  left: 100,
                  textAlign: 'right',
                  bottom: -10,
                  alignItems: 'flex-end',
                  fontWeight: 'bold',
                  color: 'white',
                  padding: 10,
                }}>
                {data?.quote_author}
              </Text>
              {/* {lengthMore ? (
                // <Text
                //   onPress={toggleNumberOfLines}
                //   style={{lineHeight: 21, marginTop: 10}}>
                //   {textShown ? 'Read less...' : 'Read more...'}
                // </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text>'Read less...' </Text>
                </TouchableOpacity>
              ) : null} */}
            </LinearGradient>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  quote: {
    // backgroundColor: 'white',
    height: 80,
    width: Dimensions.get('screen').width - 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 14,
    padding: 10,
    zIndex: 9,
    position: 'relative',
  },


});
export default Quote;
