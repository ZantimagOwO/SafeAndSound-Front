import {StyleSheet, View, Text } from 'react-native'
import React from 'react'
import RegularHeader from '../components/headers/RegularHeader'

export default function InformacionPersonal({navigation}) {
  return (
    <View >
      <RegularHeader navigation={navigation}/>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: 'red',
  }
})
