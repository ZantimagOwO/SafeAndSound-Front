import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ProtegidoRow from '../../components/ProtegidoRow'
import SolicitudProtegido from './SolicitudProtegido';
import StyleConstants from '../../StyleConstants';

export default function Protegidos() {
  return (
    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
      <View style={styles.protegidosList}>
        <ProtegidoRow name="Protegido 1" id="1"></ProtegidoRow>
        <ProtegidoRow name="Protegido 2" id="2"></ProtegidoRow>
        <ProtegidoRow name="Protegido 3" id="3"></ProtegidoRow>
      </View>
      <Text style={styles.text}>Solicitudes de protegido</Text>
      <View style={styles.protegidosList}>
        <SolicitudProtegido name="ProtegidoNuevo" id="1"></SolicitudProtegido>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
        width: '100%',
    },
    protegidosList: {
        width: '100%',
        height: 'auto',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',

        marginBottom: '10vh'
    },
    text: {
        color: StyleConstants.mainColor,
        fontFamily: StyleConstants.font,
        fontSize: '40px',

        position: 'relative',
        left: '10%',
        
        marginBottom: '2vh'
    }

})