import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader';

export default function Preview({ navigation, route }) {
  const { buttonData } = route.params;
  const [fillOrder, setFillOrder] = useState(0);
  const [location, setLocation] = useState(null);

  const sendMessages = () => {
    console.log('Enviando mensajes...');
  };


  const buttonShow = () => {
    setFillOrder(prevOrder => {
      const newOrder = (prevOrder + 1) % 5;
      if (newOrder === 4) {
        sendMessages();
      }
      return newOrder;
    });
  };

  const getColor = (index) => {
    if (fillOrder >= index) {
      return 'red';
    }
    return 'grey';
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'No se concedieron los permisos para acceder a la ubicación');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log(location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.body}>
      <RegularHeader navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={[styles.cell,styles.topLeft, { backgroundColor: getColor(1) }]} />
          <View style={[styles.cell,styles.topRight, { backgroundColor: getColor(2) }]} />
          <View style={[styles.cell,styles.bottomLeft, { backgroundColor: getColor(4) }]} />
          <View style={[styles.cell,styles.bottomRight, { backgroundColor: getColor(3) }]} />
          <View style={styles.centerWhiteCircle} />
          <TouchableOpacity style={styles.centerButtonContainer} onPress={buttonShow}>
            <View style={[styles.buttonColor, { backgroundColor: buttonData.color }]}>
              <Text style={styles.buttonText}>{buttonData.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    borderRadius: 100,
    position: 'relative',
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 100,
    height: 100,
  },
  topLeft: {
    borderTopLeftRadius: 100,
  },
  topRight: {
    borderTopRightRadius: 100,
  },
  bottomLeft: {
    borderBottomLeftRadius: 100,
  },
  bottomRight: {
    borderBottomRightRadius: 100,
  },
  centerWhiteCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 175,
    height: 175,
    backgroundColor: 'white',
    borderRadius: 87.5,
    transform: [{ translateX: -87.5 }, { translateY: -87.5 }],
  },
  centerButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
  },
  buttonColor: {
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
