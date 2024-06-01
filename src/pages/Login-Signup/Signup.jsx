import {StyleSheet, View, Image, Text, } from 'react-native'
import Constants from 'expo-constants';
import React, {useState} from 'react'
import InputLogin from './InputLogin'
import Button from './Button'

export default function Signup({ navigation }) {

  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [error, setError] = useState('');
  

  const handleSignUp = () => {
    try {
      const hasLowerCase = password.match(/[a-z]/);
      const hasUpperCase = password.match(/[A-Z]/);
      const hasNumber = password.match(/\d/);

      if(username.length === 0) {
        setError("Rellena el usuario");
      }else if(password.length === 0) {
        setError("Rellena la contraseña");
      }else if(passwordAgain.length === 0) {
        setError("Repite la contraseña");
      }else if(!hasLowerCase || !hasUpperCase || !hasNumber || password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
      }else if(password !== passwordAgain) {
        setError("Las contraseñas no coinciden");
      }else if(username.length < 5) {
        setError("El usuario debe tener al menos 5 caracteres");
      }else{
        navigation.navigate('InformacionInicial', {
          username: username.trim(),
          password: password,
        });
      }
    } catch (e) {
      setError("Rellena todos los campos");
    }
    
  };
  return (
    <View style={styles.body}>
      <View style={styles.espacio}></View>
      <Image source={require("../../../assets/login-signup/logoColor.png")} style={styles.logo}/>
      <Image source={require("../../../assets/login-signup/userIcon.png")} style={styles.userIcon}/>
      <InputLogin icon={require("../../../assets/login-signup/userIcon.png")} secureTextEntry={false} label='Usuario' onChangeText={setUser}/>
      <InputLogin icon={require("../../../assets/login-signup/lockIcon.png")} secureTextEntry={true} label='Contraseña' onChangeText={setPassword}/>
      <InputLogin icon={require("../../../assets/login-signup/lockIcon.png")} secureTextEntry={true} label='Repite la contraseña' onChangeText={setPasswordAgain}/>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.margin}>
        <Text style={styles.textGrey}>¿Ya tienes una cuenta?</Text>
        <Text style={styles.textBlue} onPress={() => navigation.navigate('Login')}>   Click aquí</Text>
      </View>
      <Button text='Registrarse' onPress={handleSignUp}/>
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
    height: 100,
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
  errorText: {
    color: 'red',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 16,
    marginTop: '5%',
  },
})
