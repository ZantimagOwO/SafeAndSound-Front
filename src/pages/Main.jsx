import React from "react";
import MainHeader from "../components/headers/MainHeader";
import Constants from "expo-constants";
import MainPageButton from "../components/buttons/MainPageButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { registerRootComponent } from 'expo';
import * as Contacts from "expo-contacts";


const Main = ({ navigation }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {

      // AsyncStorage.clear()
      // console.log("AsyncStorage borradowo")

      cargarContactos()
      
      try {
        const usuarioToken = await AsyncStorage.getItem("userID");
        console.log("User ID: " + usuarioToken)
        if (usuarioToken !== null) {
          setUser(true);
        } else {
          navigation.navigate("Login");
        }
      } catch (e) {
        console.error("Error al recuperar el token de login", e);
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.body}>
      <MainHeader navigation={navigation} />
      <View style={styles.grid}>
        <MainPageButton
          mode="on"
          icon={require("../../assets/Main/ambulance.png")}
          text="Botón de emergencia"
          onPress={() => navigation.navigate("Boton")}
        />
        <MainPageButton
          mode="on"
          icon={require("../../assets/Main/shield.png")}
          text="Protegidos y Protectores"
          onPress={() => navigation.navigate("ProtegidosProtectores")}
        />
        <MainPageButton
          mode="off"
          icon={require("../../assets/Main/legalinfo.png")}
          text="Información Legal"
        />
        <MainPageButton
          mode="off"
          icon={require("../../assets/Main/agenda.png")}
          text="Agenda"
        />
        <MainPageButton
          mode="off"
          icon={require("../../assets/Main/extinguisher.png")}
          text="Guía de supervivencia"
        />
        <MainPageButton
          mode="off"
          icon={require("../../assets/Main/wiki.png")}
          text="Wiki"
        />
        <MainPageButton
          mode="off"
          icon={require("../../assets/Main/closecenters.png")}
          text="Centros de Salud cercanos"
        />
        <MainPageButton
          mode="off"
          icon={require("../../assets/Main/medinator.png")}
          text="Medinator"
        />
        <MainPageButton
          mode="on"
          icon={require("../../assets/Main/personalinfo.png")}
          text="Información personal"
          onPress={() => navigation.navigate("InformacionPersonal")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    height: "100%",
  },
  grid: {
    marginTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  button: {
    width: "20%",
    aspectRatio: 1,
    marginVertical: 10,
    wordWrap: "wrap",
  },
});

export default Main;

export const cargarContactos = async () => {
  const { status } = await Contacts.requestPermissionsAsync();

  let contacts = {};

  if (status === "granted") {
    const data = (
      await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        sort: "firstName",
      })
    ).data;

    data.forEach((c) => {
      let phon = c.phoneNumbers[0].number.replace(/\s+/g, "").replace("+", "");
      contacts[phon] = c.name;
    });

    console.log(contacts);

    AsyncStorage.setItem("contacts", JSON.stringify(contacts));
  }
};