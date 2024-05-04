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
      <View style={styles.margin}>
        <Text style={styles.textGrey}>¿Has olvidado tu contraseña?</Text>
        <Text style={styles.textBlue} onPress={console.log('Contraseña olvidada')}>   Click aquí</Text>
      </View>
      <View style={styles.margin2}>
        <Text style={styles.textGrey}>¿No tienes una cuenta?</Text>
        <Text style={styles.textBlue} onPress={() => navigation.navigate('Signup')}>   Registrate aquí</Text>
      </View>
      <Button text='Login' onPress={console.log('Login')}/>
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
  margin2: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1%',
    flexDirection: 'row',
  },
  textGrey: {
    color: 'grey',
  },
  textBlue: {
    color: '#00a3ff',
  },
})
