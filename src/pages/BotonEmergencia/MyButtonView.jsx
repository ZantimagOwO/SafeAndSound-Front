import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader';

export default function MyButtonView({ name, number, numberMessage, protectorMessage, color, protectors }) {

  return (
    <View style={styles.body}>
      <View style={styles.row}>
        <Text style={styles.green}>Nombre:  </Text>
        <Text style={styles.grey}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.green}>Número:  </Text>
        <Text style={styles.grey}>{number}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.green}>Mensaje de emergencia:  </Text>
        <Text style={styles.grey}>{numberMessage}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.green}>Mensaje para tus protectores:  </Text>
        <Text style={styles.grey}>{protectorMessage}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.green}>Color:  </Text>
        <Text style={[styles.buttonColor, { backgroundColor: color }]}>               </Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.green}>Tus Protectores:  </Text>
        {protectors.map(protector => (
          <View key={protector.ProtectorID} style={styles.protectorContainer}>
            <Image source={require('../../../assets/Protectoresprotegidos/shield.png')} style={styles.protectorIcon}/>
            <Text style={styles.protectorName}>{protector.ProtectorName}</Text>
          </View>
        ))}
      </View>
      <View style={styles.finalSpace}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: '100%',
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // borderColor: '#68c699',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  row: {
    marginTop: 5,
    width: '100%',
    flexDirection: 'row',
  },
  column: {
    marginTop: 5,
    width: '100%',
    flexDirection: 'column',
  },
  green: {
    color: '#68c699',
    fontWeight: 'bold',
    fontSize: 16,
  },
  grey: {
    color: 'grey',
    fontSize: 16,
  },
  buttonColor: {
    backgroundColor: 'red',
    borderColor: '#grey',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  protectorContainer: {
    marginTop: 10,
    width: '100%',
    height: 50,
    borderColor: '#68c699',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  protectorIcon: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  protectorName: {
    color: 'grey',
    fontSize: 16,
    marginLeft: 10,
  },
  finalSpace: {
    height: 80,
  }
});
