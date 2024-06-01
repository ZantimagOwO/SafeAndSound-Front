import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import StyleConstants from '../../StyleConstants';
import { serverIP } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProtectorListCheck({id, phone, onSelect, isSelected: initialIsSelected }) {

  const [isSelected, setIsSelected] = useState(initialIsSelected || false);
  const [contacts, setContactos] = useState({});

  const getContactsAsync = useCallback(async () => {
    let t = await AsyncStorage.getItem("contacts");
    setContactos(JSON.parse(t));
  }, []);

  useEffect(() => {
    getContactsAsync();
  }, [getContactsAsync]);

  const name = contacts[phone] || phone;

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    onSelect(id, !isSelected);
  };

  useEffect(() => {
    setIsSelected(initialIsSelected);
  }, [initialIsSelected]);

  return (
    <View style={[protect.row, isSelected && protect.selectedRow]}>
      <Image
        source={isSelected 
            ? require("../../../assets/Protectoresprotegidos/whiteShield.png") 
            : require("../../../assets/Protectoresprotegidos/shield.png")}
        style={protect.protectedSwordIcon}
        resizeMode="contain"
      />
      <Text style={[protect.text, isSelected && protect.selectedText]}>{name}</Text>
      <TouchableOpacity
        style={protect.btn}
        onPress={toggleSelection}
      >
        <Image
           source={isSelected 
            ? require("../../../assets/Protectoresprotegidos/RedX.png") 
            : require("../../../assets/Protectoresprotegidos/GreenCheck.png")}
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
    width: "100%",
    marginTop: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#68C699",
    borderRadius: 5,
  },
  selectedRow: {
    backgroundColor: "#68C699",
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
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
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
