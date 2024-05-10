import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect } from 'react'
import StyleConstants from '../../StyleConstants';
import { phonesToNames } from '../../MockContacts';
import { serverIP } from '../../../config';


export default function AddProtector({id, phone}) {

  const name = phonesToNames[phone];

  const insertProtector = async () => {
    const response = await fetch(serverIP + "/users/addProtector/1/" + phone, { method: 'POST' });
  }
  
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={insertProtector} style={styles.btn}>
        <Image
          source={require("../../../assets/Protectoresprotegidos/add.png")}
          style={styles.addImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  text: {
    color: StyleConstants.mainColor,
    fontFamily: StyleConstants.font,
    fontSize: 20,
  },
  btn: {
    width: "10%",
    height: "80%",
  },
  addImage: {
    position: "relative",
    left: "center",
    top: "center",

    width: "100%",
    height: "100%",
  }
});