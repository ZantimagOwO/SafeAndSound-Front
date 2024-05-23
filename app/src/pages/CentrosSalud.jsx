import {StyleSheet, View, Text } from 'react-native'
import React from 'react'

export default function CentrosSalud() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Centros de Salud cercanos</Text>
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
