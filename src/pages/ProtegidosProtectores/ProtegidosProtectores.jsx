import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import RegularHeader from '../../components/headers/RegularHeader';
import StyleConstants from '../../StyleConstants';
import ProtegidoRow from './ProtegidoRow';
import AddProtector from './AddProtector';
import ProtectorRow from './ProtectorRow';

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


  return (
    <>
      <RegularHeader navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
          <Text style={styles.text}>Mis protegidos</Text>
          <View style={styles.list}>
            {protegidos.map((protegido) => <ProtegidoRow key={protegido.Phone_ID} name={protegido.Phone} id={protegido.Phone_ID} />)
            }
          </View>
          <Text style={styles.text}>Mis protectores</Text>
          <View style={styles.list}>
            <ProtectorRow name="Protectores 1" id="1"></ProtectorRow>
          </View>
          <Text style={styles.text}>Añadir protectores</Text>
          <View style={styles.list}>
            <AddProtector name="nuevoProtector" id="nuevoProtector"/>
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
});
