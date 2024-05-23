import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomButton({ onPress, text }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: '10%',
    width: '60%',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: '#68C699', 
    paddingVertical: 10,        
    paddingHorizontal: 20,      
    shadowColor: 'black', 
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 10,
    shadowRadius: 20,
    elevation: 6,
    borderRadius: 5,
  },
  text: {
    color: 'white',        
    fontSize: 16,              
    textAlign: 'center',      
  }
});
