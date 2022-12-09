import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Button,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import moment from 'moment';
import {CommonStyles, Colors, Typography} from '../../../theme';
import {PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR} from '../../../theme/colors';

const win = Dimensions.get('window');

const Quote = props => {
  const {dailyQuote, navigation} = props;
  //   const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState('');
  //   const toggleNumberOfLines = () => {
  //     //To toggle the show text or hide it
  //     setTextShown(!textShown);
  //   };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const longText =
    'Text is also commonly used to refer to a text message or to send a text message. Text has several other senses as a noun. Text refers to the actual words written in a book, newspaper, blog post, or any other written work. Pictures, charts, and other images are not text. Text could be movies, scripts, paintings, songs, political cartoons, advertisements and maps. If we can look at something with words and sentences, explore it, find layers of meaning in it, and draw information and conclusions from it, you`re looking at a text.';

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
            <View style={[styles.quote]}>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={2}
                style={{fontSize: 14, marginTop: 10}}>
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
                  }}>
                  {item?.quote_author}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true), setdata(item);
                }}
                style={{marginTop: 15}}>
                <Text style={{fontSize: 12}}>'See More...' </Text>
              </TouchableOpacity>
            </View>
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
              marginTop: 22,
            }}>
            <View
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
                    padding: 15,
                    fontSize: 18,
                  }}>
                  X
                </Text>
              </TouchableOpacity>
              <Text style={{marginTop: 10}}>{data.daily_quote}</Text>
              <Text
                style={{
                  fontSize: 12,
                  position: 'absolute',
                  right: 10,
                  bottom: 10,
                  fontWeight: 'bold',
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
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  quote: {
    backgroundColor: 'white',
    height: 90,
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
