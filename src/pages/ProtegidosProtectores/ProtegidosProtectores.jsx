import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import RegularHeader from '../../components/headers/RegularHeader';
import StyleConstants from '../../StyleConstants';
import ProtegidoRow from './ProtegidoRow';
import AddProtector from './AddProtector';
import ProtectorRow from './ProtectorRow';
import contacts from '../../MockContacts';

export default function ProtegidosProtectores({ navigation }) {

  let [protegidos, setProtegidos] = useState([]);

  const fetchProtegidos = useCallback(async () => {
    const data = await fetch("http://localhost:3000/users/protected/1");
    let res = await data.text();
    setProtegidos(JSON.parse(res));
  }, []);

  useEffect(() => {
    fetchProtegidos();
  }, [fetchProtegidos]);

  console.log(protegidos);


  let [protectores, setProtectores] = useState([]);

  const fetchProtectores = useCallback(async () => {
    const data = await fetch("http://localhost:3000/users/protectors/699121787");
    let res = await data.text();
    setProtectores(JSON.parse(res));
  }, []);

  useEffect(() => {
    fetchProtectores();
  }, [fetchProtectores]);

  console.log(protectores)

  const [textoBuscadorContactos, setBuscadorContactos] = useState('')

  console.log(textoBuscadorContactos)

  const contactos = contacts.filter(contact => contact.name.toLowerCase().includes(textoBuscadorContactos.toLowerCase()))

  return (
    <>
      <RegularHeader navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
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
          <TextInput
            onChangeText={setBuscadorContactos}
            placeholder="Buscar contactos"
            value={textoBuscadorContactos}
            style={styles.textoBuscadorContactos}
          />
          <View style={styles.list}>
            {contactos.map((contact) => (
              <AddProtector
                key={contact.id}
                phone={contact.phones[0]}
                id={contact.id}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 40,

    position: "relative",
    left: "10%",

    marginBottom: "2vh",
  },
  textoBuscadorContactos: {
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

    color: StyleConstants.mainColor,
  },
  addContactContainer: {
    width: "100%",
    height: "auto",

    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  }
});
