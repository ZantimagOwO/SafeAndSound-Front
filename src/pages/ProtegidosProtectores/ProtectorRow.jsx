import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import StyleConstants from '../../StyleConstants';
import { serverIP } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { contacts } from '../../../App';

export default function ProtectorRow({ id, phone, protectores, setProtectores }) {
  let name = contacts[phone] || phone;

  const removeProtector = async (id) => {

    setProtectores((protectores) =>
      protectores.filter((protector) => protector.Phone !== phone)
    );

    const user = await AsyncStorage.getItem("userID");
    const response = await fetch(
      `${serverIP}/users/removeProtector/${user}/${phone}`,
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
      <TouchableOpacity onPress={removeProtector} style={protect.btn}>
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
    fontSize: 15,
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
    height: "70%",

    marginLeft: "auto",
    marginRight: "2%",
  },
});
