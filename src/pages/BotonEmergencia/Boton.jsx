import {StyleSheet, View, Text } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader'

export default function Boton({ navigation }) {
  return (
    <View >
      <RegularHeader navigation={navigation}/>
      <View style={styles.buttonHeader}>

      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  buttonHeader: {
    marginTop: Constants.statusBarHeight + 60,
    flexDirection: 'row',
    height: '20%',
    backgroundColor: '#68c699',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
