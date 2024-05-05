import {StyleSheet, View, Image, Text } from 'react-native'
import Constants from 'expo-constants';
import React, { useState } from 'react'
import InputLogin from './InputLogin'
import Button from './Button'
import { serverIP } from '../../../config';

export default function Login({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch(`http://${serverIP}:3000/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if(data==0){
        alert("Incorrecto")
      }else{
        navigation.navigate('Main');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <View style={styles.body}>
      <View style={styles.espacio}></View>
      <Image source={require("../../../assets/login-signup/logoColor.png")} style={styles.logo}/>
      <Image source={require("../../../assets/login-signup/userIcon.png")} style={styles.userIcon}/>
      <InputLogin icon={require("../../../assets/login-signup/userIcon.png")} label='Usuario' value={username} onChangeText={setUsername}/>
      <InputLogin icon={require("../../../assets/login-signup/lockIcon.png")} label='Contraseña' value={password} onChangeText={setPassword}/>
      <View style={styles.margin}>
        <Text style={styles.textGrey}>¿Has olvidado tu contraseña?</Text>
        <Text style={styles.textBlue} onPress={console.log('Contraseña olvidada')}>   Click aquí</Text>
      </View>
      <View style={styles.margin2}>
        <Text style={styles.textGrey}>¿No tienes una cuenta?</Text>
        <Text style={styles.textBlue} onPress={() => navigation.navigate('Signup')}>   Registrate aquí</Text>
      </View>
      <Button text='Login' onPress={handleLogin}/>
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
