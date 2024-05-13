import {StyleSheet, View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'

export default function InputInformacionPersonal({navigation, width, height, name, onChangeText, setValue, value}) {


  return (
    <View style={styles.iconContainer} width={width} height={height}>
      <View>
        <TextInput 
            onChangeText={onChangeText}
            style={styles.inputStyle}
            value={value}
          />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>{name}</Text >
      </View>
    </View>
  )
}

const styles=StyleSheet.create({

  iconContainer: {
    marginTop: '5%',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginRight: 10,
    marginLeft: 10
  },
  inputStyle: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    borderColor: '#68C699',
    borderRadius: 4,
    paddingRight: 10,
    paddingLeft: 30,
    textAlignVertical: 'center',
  },
  overlay: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: -10,
    left: 10,
  },
  overlayText: {
    paddingRight: 10,
    paddingLeft: 10,
    color: '#68C699'
  },
})


