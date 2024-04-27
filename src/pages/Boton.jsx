import {StyleSheet, View, Text } from 'react-native'
import React from 'react'
import RegularHeader from '../components/headers/RegularHeader'

export default function Boton({ navigation }) {
  return (
    <View >
      <RegularHeader navigation={navigation}/>
    </View>
  )
}

const styles=StyleSheet.create({

})
