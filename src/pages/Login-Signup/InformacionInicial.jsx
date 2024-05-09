import {StyleSheet, View, Text } from 'react-native'
import React from 'react'
import RegularHeader from '../../components/headers/RegularHeader'
import Constants from 'expo-constants';
import InputInformacionPersonal from './InputInformacionPersonal'

export default function InformacionInicial({navigation}) {
  return (
    <View style={styles.body}>
      <RegularHeader navigation={navigation}/>
      <View style={styles.grid}>
        <InputInformacionPersonal/>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        height: '100%',
    },
    grid: {
        marginTop: Constants.statusBarHeight+50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
})
