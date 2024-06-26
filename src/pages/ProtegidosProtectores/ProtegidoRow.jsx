import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import StyleConstants from "../../StyleConstants";

export default function ProtegidoRow({ phone, id, name }) {

  return (
    <View style={protect.row}>
      <Image
        source={require("../../../assets/Protectoresprotegidos/Sword.png")}
        style={protect.protectedSwordIcon}
        resizeMode="contain"
      />
      <Text style={protect.text}>{name}</Text>
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
    width: "10%",
    height: "70%",

    marginLeft: "auto",
    marginRight: "2%",
  },
});
