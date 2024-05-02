import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import StyleConstants from '../../StyleConstants';

export default function SolicitudProtegido({ name, id }) {
  return (
    <View style={styles.row} id={id}>
      <Text style={styles.text}>{name}</Text>
      <Image
        source={require('../../../assets/Protectoresprotegidos/GreenCheck.png')}
        style={styles.check}
        resizeMode='contain'
      />
      <Image
        source={require('../../../assets/Protectoresprotegidos/RedX.png')}
        style={styles.cross}
        resizeMode='contain'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: '6vh',
    width: '80%',

    marginBottom: '5%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    border: '1px solid #68C699',
    borderRadius: 5,

  },
  text: {
    color: StyleConstants.mainColor,
    fontFamily: StyleConstants.font,
    fontSize: 20,

    marginLeft: '5%',
  },
  check: {
    width: '10%',
    height: '80%',

    marginLeft: 'auto',
    marginRight: '5%',
  },
  cross: {
    width: '10%',
    height: '80%',

    marginRight: '5%',
  },
});
