import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import addIcon from '../../../assets/Protectoresprotegidos/add.png'

export default function InputArray({navigation, width, height, name, placeholder, items, setItems}) {

  const [inputText, setInputText] = useState('');  

  const handleAddItem = () => {
    if (inputText !== '') {
      setItems([...items, inputText]);  // Añade el texto actual al array
      setInputText('');  // Limpia el input
    }
  };
  
  var containerHeight = height + items.length * 23;

  return (
    <View style={styles.iconContainer} width={width} height={containerHeight}>
      <View style={styles.inputStyle}>
        <View style={styles.row} height={height}>
          <TouchableOpacity onPress={handleAddItem}>
            <Image source={addIcon} style={styles.icon} />
          </TouchableOpacity>
          <TextInput placeholder={placeholder} style={styles.input} value={inputText} onChangeText={setInputText}/>
        </View>
        {items.map((item, index) => (
          <Text key={index} style={styles.itemText}>{"- " + item}</Text>  
        ))}
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
    paddingRight: 15,
    paddingLeft: 15,
    textAlignVertical: 'center',
    flexDirection: 'column',
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
  row: {
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: 1,
    height: '80%',
    resizeMode: 'contain',
  },
  input: {
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: 1,
    height: '80%',
    width: '90%',
    paddingLeft: 10,
  },

})


