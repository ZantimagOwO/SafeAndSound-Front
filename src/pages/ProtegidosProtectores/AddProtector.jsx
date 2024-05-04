import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import StyleConstants from '../../StyleConstants';

export default function AddProtector({id, name}) {
  return (
    <View style={styles.row}>
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
    display: "flex",
    flexDirection: "row",
  },
  addImage: {},
  text: {
    color: StyleConstants.mainColor,
    fontFamily: StyleConstants.font,
    fontSize: 20,
  },
});