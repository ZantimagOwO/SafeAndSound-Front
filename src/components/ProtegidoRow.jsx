import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import StyleConstants from '../StyleConstants';

export default function ProtegidoRow({name, id}) {
  return (
    <View style={protect.row} id={id}>
      <Image source={require('../../assets/Protectoresprotegidos/Sword.png')} style={protect.protectedSwordIcon} resizeMode='contain'/>
      <Text style={protect.text}>{name}</Text>
      <Image source={require('../../assets/Protectoresprotegidos/Trashcan.png')} style={protect.protectedTrashIcon} resizeMode='contain'/>
    </View>
  );
} 


const protect = StyleSheet.create({
  row: {
    height: "6vh",
    width: "80%",

    marginTop: "5%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    border: "1px solid #68C699",
    borderRadius: 5,
  },
  protectedSwordIcon: {
    width: "10%",
    height: "80%",

    marginLeft: "5%",
  },
  text: {
    color: StyleConstants.mainColor,
    fontFamily: StyleConstants.font,
    fontSize: 20,

    marginLeft: '5vw',
  },
  protectedTrashIcon: {
    width: "10%",
    height: "80%",

    marginLeft: "auto",
    marginRight: '5%'
  },
});