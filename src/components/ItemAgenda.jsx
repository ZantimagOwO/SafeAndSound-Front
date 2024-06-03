import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import StyleConstants from '../StyleConstants'

export default function ItemAgenda({title, phone}) {
  const llamar = () => {
    Linking.openURL('tel:' + phone);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.line} onPress={llamar}>
        <Text>
          <Text style={styles.text}>
            {title} - 
          </Text>
          <Text>
            { " " + phone}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "80%",

    display: "flex",
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "flex-start",
  },
  line: {
    fontSize: 20,
  },
  text: {
    color: StyleConstants.mainColor,
  },
});