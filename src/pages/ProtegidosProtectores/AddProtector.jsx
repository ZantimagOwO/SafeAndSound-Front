import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import StyleConstants from "../../StyleConstants";
import { serverIP } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddProtector({phone, name, setProtectores, protectores }) {

  const insertProtector = async () => {

    Linking.openURL()

    const user = await AsyncStorage.getItem("userID");
    const response = await fetch(
      `${serverIP}/users/addProtector/${user}/${phone}`,
      { method: "POST" }
    );
  };

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
    fontSize: 15,
    marginLeft: "3%",
  },
  btn: {
    width: "10%",
    height: "60%",

    marginLeft: "3%",
  },
  addImage: {
    position: "relative",
    left: "center",
    top: "center",

    width: "100%",
    height: "100%",
  },
});
