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

    const user = await AsyncStorage.getItem("userID");
    
    let msg = `Hola! Me gustaría tenrte como protector en caso de emergencia usando Safe and Sound! Si te parece bien, abre este link: ${serverIP}/users/addProtector/${user}/${phone}`

    msg.replace(/\s+/g, "");

    console.log(msg)

    Linking.openURL(`sms:${phone}?body=${msg}`);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={insertProtector} style={styles.container}>
        <View style={styles.btn}>
          <Image
            source={require("../../../assets/Protectoresprotegidos/add.png")}
            style={styles.addImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
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
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    width: "100%",
    height: "100%",
  },
  text: {
    color: StyleConstants.mainColor,
    fontFamily: StyleConstants.font,
    fontSize: 15,
    marginLeft: "3%",
  },
  btn: {
    width: "10%",
    height: "100%",

    marginLeft: "3%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addImage: {
    width: "60%",
    height: "70%",
  },
});
