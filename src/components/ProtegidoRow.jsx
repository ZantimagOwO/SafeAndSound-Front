import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function ProtegidoRow() {
  return (
    <View style={protect.container}>
      <Image source={require('../../assets/Protectoresprotegidos/sword.png')} style={protect.protectedIcon}/>
      
    </View>
  );
} 


const protect = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: '100%',
        width: '100%',
    },
    protectedIcon: {
      width: '100%',
      height: '100%',
    }
})