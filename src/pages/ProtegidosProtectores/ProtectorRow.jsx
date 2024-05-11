import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import StyleConstants from '../../StyleConstants';
import { phonesToNames } from '../../MockContacts';
import { serverIP } from '../../../config';

export default function ProtectorRow({id, phone}) {
  const name = phonesToNames[phone];

    const removeProtector = async (id) => {
      const response = await fetch(
        `${serverIP}/users/removeProtector/1/${phone}`,
        { method: "DELETE" }
      );
    };

  return (
    <View style={protect.row}>
      <Image
        source={require("../../../assets/Protectoresprotegidos/shield.png")}
        style={protect.protectedSwordIcon}
        resizeMode="contain"
      />
      <Text style={protect.text}>{name}</Text>
      <TouchableOpacity
        onPress={removeProtector}
        style={protect.btn}
      >
        <Image
          source={require("../../../assets/Protectoresprotegidos/Trashcan.png")}
          style={protect.protectedTrashIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const protect = StyleSheet.create({
  row: {
    height: 40,
    width: "80%",

    marginTop: "5%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    borderWidth: 1,
    borderColor: "#68C699",
    borderRadius: 5,
  },
  protectedSwordIcon: {
    width: "10%",
    height: "80%",

    marginLeft: "2%",
    marginRight: "2%",
  },
  text: {
    color: StyleConstants.mainColor,
    fontFamily: StyleConstants.font,
    fontSize: 20,
  },
  protectedTrashIcon: {
    position: "relative",
    left: "center",
    top: "center",

    width: "100%",
    height: "100%",
  },
  btn: {
    width: "10%",
    height: "80%",

    marginLeft: "auto"
  },
});
