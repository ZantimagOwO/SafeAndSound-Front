import {StyleSheet, View, Text, Image, TextInput, Animated } from 'react-native'
import Constants from 'expo-constants';
import React from 'react'
import { useState } from 'react';

export default function inputLogin({ label, icon, onChangeText, secureTextEntry }) {

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
        <TextInput 
          onChangeText={onChangeText}
          style={styles.inputStyle}
          placeholder={label}
          placeholderTextColor='#aaa'
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}
    
const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    marginVertical: 0,
  },
  iconContainer: {
    position: 'relative',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icon: {
    width: 25,
    height: 25,
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 2,
  },
  inputStyle: {
    width: '100%',
    height: 40,
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    borderColor: '#68C699',
    borderRadius: 4,
    paddingLeft: 50, // Espacio para el icono y margen adicional
    paddingRight: 10,
    textAlignVertical: 'center',
  },
});