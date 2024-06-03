import {StyleSheet, View, Text, Linking } from 'react-native'
import React from 'react'
import RegularHeader from '../components/headers/RegularHeader'
import ItemAgenda from '../components/ItemAgenda'
import { ScrollView } from 'react-native'

export default function Agenda({navigation}) {

  const emergencias = [
    ["Emergencias", "112"],
    ["Policia", "091"],
    ["Guardia Civil", "062"],
    ["Bomberos", "080"],
    ["Emergencias Médicas", "061"],
    ["Accidentes, información sobre el clima y congestión del tráfico", "900 123 505"],
    ["Instituto nacional de toxicología", "915 62 04 20"],
    ["Violencia de género", "016"],
    ["Información a la mujer", "900 191 010"],
    ["Atención ciudadana", "060"],
    ["Protección civil", "1006"]
  ]

  const informacion = [
    ["Información locla", "010"],
    ["Información nacional", "11818"],
    ["Páginas amarillas", "11888"],
    ["Operadora nacional", "1009"],
    ["Operadora europea", "1008"],
    ["Operador internacional", "1005"]
  ]

  const cancelacion = [
    ["Visa España", "915 192 100"],
    ["Visa internacional", "900 991 216"],
    ["American Express", "902 375 637"],
    ["Cajamadrid", "915 193 800"],
    ["4B", "902 114 400"],
    ["Eurocard-Mastercard", "915 192 100"],
    ["Dinner's Club", "902 401 112"],
    ["Sistema 6000", "913 553 000"],
  ]

  return (
    <View>
      <RegularHeader navigation={navigation}></RegularHeader>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>EMERGENCIAS:</Text>
        <View style={styles.list}>
          {emergencias.map((emergencia) => (
            <ItemAgenda
              key={emergencia[0]}
              phone={emergencia[1]}
              title={emergencia[0]}
            />
          ))}
        </View>
        <Text style={styles.title}>INFORMACIÓN:</Text>
        <View style={styles.list}>
          {informacion.map((emergencia) => (
            <ItemAgenda
              key={emergencia[0]}
              phone={emergencia[1]}
              title={emergencia[0]}
            />
          ))}
        </View>
        <Text style={styles.title}>CANCELACIÓN DE TARJETAS DE CRÉDITO:</Text>
        <View style={styles.list}>
          {cancelacion.map((emergencia) => (
            <ItemAgenda
              key={emergencia[0]}
              phone={emergencia[1]}
              title={emergencia[0]}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "10%",
  },
  list: {
    height: "auto",

    display: "flex",
    position: "relative",
  },
  title: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "5%",
    marginTop: "5%",
  },
});
