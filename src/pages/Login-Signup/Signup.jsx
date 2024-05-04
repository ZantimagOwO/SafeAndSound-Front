import {StyleSheet, View, Image, Text } from 'react-native'
import Constants from 'expo-constants';
import React from 'react'
import InputLogin from './InputLogin'
import Button from './Button'

export default function Login({ navigation }) {
  return (
    <View style={styles.body}>
      <View style={styles.espacio}></View>
      <Image source={require("../../../assets/login-signup/logoColor.png")} style={styles.logo}/>
      <Image source={require("../../../assets/login-signup/userIcon.png")} style={styles.userIcon}/>
      <InputLogin icon={require("../../../assets/login-signup/userIcon.png")} label='Usuario'/>
      <InputLogin icon={require("../../../assets/login-signup/lockIcon.png")} label='Contraseña'/>
      <InputLogin icon={require("../../../assets/login-signup/lockIcon.png")} label='Repite la contraseña'/>
      <View style={styles.margin}>
        <Text style={styles.textGrey}>¿Ya tienes una cuenta?</Text>
        <Text style={styles.textBlue} onPress={() => navigation.navigate('Login')}>   Click aquí</Text>
      </View>
      <Button text='Registrarse' onPress={console.log('Registro')}/>
    </View>
  )
}

const styles=StyleSheet.create({
  espacio: {
    backgroundColor: '#000000',
    height: Constants.statusBarHeight,
    width: '100%',
  },
  body: {
    backgroundColor: '#fff',
    height: '100%',
  },
  logo: {
    marginTop: '10%',
    resizeMode: 'contain',
    height: 150,
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  userIcon: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  margin: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
    flexDirection: 'row',
  },
  textGrey: {
    color: 'grey',
  },
  textBlue: {
    color: '#00a3ff',
  },
})
