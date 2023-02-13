import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
const screenHeight = Math.round(Dimensions.get('window').height);
const QRScanner = props => {
  const {navigation} = props;
  const [scannedData, setScannedData] = useState('');

  const onSuccess = e => {
    setScannedData(e.data);
    navigation.navigate('selfAssessment', {id: scannedData});
  };

  return (
    <View>
      <RNCamera style={{flexGrow: 1, height: screenHeight}}>
        <QRCodeScanner
          onRead={onSuccess}
          topContent={<Text style={styles.centerText}>Scan QR code</Text>}
          //   bottomContent={
          //     <TouchableOpacity style={styles.buttonTouchable}>
          //       <Text style={styles.buttonText}>OK. Got it!</Text>
          //     </TouchableOpacity>
          //   }
        />
      </RNCamera>
    </View>
  );
};

export default QRScanner;
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
