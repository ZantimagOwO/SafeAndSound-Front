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
            multiline={true}
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
    marginRight: 5,
    marginLeft: 5
  },
  inputStyle: {
    width: '100%',
    height: '100%',
    fontSize: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: '#68C699',
    borderRadius: 4,
    paddingRight: 10,
    paddingLeft: 15,
    textAlignVertical: 'center',
  },
  overlay: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: -10,
    left: 10,
  },
  overlayText: {
    fontSize: 14,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#68C699'
  },
})


