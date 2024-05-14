import { StyleSheet, View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import RegularHeader from '../../components/headers/RegularHeader';
import StyleConstants from '../../StyleConstants';
import ProtegidoRow from './ProtegidoRow';
import AddProtector from './AddProtector';
import ProtectorRow from './ProtectorRow';
import { serverIP } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProtegidosProtectores({ navigation }) {

  let [protegidos, setProtegidos] = useState([]);

  const fetchProtegidos = useCallback(async () => {
    const user_id = await AsyncStorage.getItem('userID')
    const data = await fetch(`${serverIP}/users/protected/${user_id}`);
    let res = await data.text();
    setProtegidos(JSON.parse(res));
  }, []);

  useEffect(() => {
    fetchProtegidos();
  }, [fetchProtegidos]);

  let [protectores, setProtectores] = useState([]);

  const fetchProtectores = useCallback(async () => {
    const user = await AsyncStorage.getItem("userID");
    const data = await fetch(`${serverIP}/users/${user}/protectors`);
    let res = await data.text();
    setProtectores(JSON.parse(res));
  }, []);

  useEffect(() => {
    fetchProtectores();
  }, [fetchProtectores]);

  const [textoBuscadorContactos, setBuscadorContactos] = useState('')

  let [contactos, setContactos] = useState([])

  const cargarContactos = async () => {
    let contacts = await AsyncStorage.getItem('contacts')
    
    let d = JSON.parse(contacts).filter(contact => contact.name.toLowerCase().includes(textoBuscadorContactos.toLowerCase()))
    
    setContactos(d)
  }

  useEffect(() => {
    cargarContactos();
  }, [cargarContactos]);

  const handleBuscar = (texto) => {
    setBuscadorContactos(texto)
    cargarContactos()
  }

  return (
    <View style={styles.body}>
      <RegularHeader navigation={navigation} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.text}>Mis protegidos</Text>
        <View style={styles.list}>
          {protegidos.map((protegido) => (
            <ProtegidoRow
              key={protegido.Phone_ID}
              phone={protegido.Phone}
              id={protegido.Phone_ID}
            />
          ))}
        </View>
        <Text style={styles.text}>Mis protectores</Text>
        <View style={styles.list}>
          {protectores.map((protectores) => (
            <ProtectorRow
              key={protectores.Phone_ID}
              phone={protectores.Phone}
              id={protectores.Phone_ID}
            />
          ))}
        </View>
        <Text style={styles.text}>Añadir protectores</Text>
        <View style={styles.addContactContainer}>
          <View style={styles.searchContainer}>
            <Image
              source={require("../../../assets/Search.png")}
              style={styles.searchIcon}
              resize={true}
              resizeMode="contain"
            />
            <TextInput
              onChangeText={setBuscadorContactos}
              placeholder="Buscar contactos"
              value={textoBuscadorContactos}
              style={styles.searchText}
            />
          </View>
          <View style={styles.list}>
            {contactos.map((contact) => (
              <AddProtector
                key={contact.id}
                phone={contact.phoneNumbers[0].number}
                id={contact.id}
                name={contact.name}
              />
            ))}
            <Text style={styles.text}>-----</Text>
            <Text style={styles.text}>-----</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  container: {
    position: "absolute",
    top: "15%",

    width: "100%",
    height: "100%",

    backgroundColor: "#FFF",

    borderWidth: 1,
    borderColor: StyleConstants.mainColor,

    display: "flex",
    flexDirection: "column",

    marginBottom: 45,
  },
  list: {
    height: "auto",
    width: "100%",

    display: "flex",
    position: "relative",
    left: "10%",

    marginBottom: "10%",
  },
  text: {
    color: StyleConstants.mainColor,
    fontFamily: StyleConstants.font,
    fontSize: 25,

    position: "relative",
    left: "10%",

    marginBottom: "2vh",
  },
  addContactContainer: {
    width: "100%",
    height: "auto",

    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: "#68C699",
    borderRadius: 5,

    height: 40,
    width: "80%",

    marginTop: "5%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchText: {
    color: StyleConstants.mainColor,
    width: "90%",
    height: "100%",

    position: "relative",
    left: "10%",
  },
  searchIcon: {
    width: "10%",
    height: "60%",
    position: "relative",
    left: "10%",
  },
});
