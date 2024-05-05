import { View, Text, Image, StyleSheet, Button } from 'react-native'
import React from 'react'
import StyleConstants from '../../StyleConstants';
import { phonesToNames } from '../../MockContacts';

function insertProtector(phone){
  
}

export default function AddProtector({id, phone}) {
    const name = phonesToNames[phone];

  return (
    <View style={styles.row}>
      <Button onPress={insertProtector(phone)}></Button>
      <Image
        source={require("../../../assets/Protectoresprotegidos/add.png")}
        style={styles.addImage}
        resizeMode="contain"
      />
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
  addImage: {
    width: "10%",
    height: "60%",

    marginRight: "2%",
    marginLeft: "2%",
  },
  text: {
    color: StyleConstants.mainColor,
    fontFamily: StyleConstants.font,
    fontSize: 20,
  },
});