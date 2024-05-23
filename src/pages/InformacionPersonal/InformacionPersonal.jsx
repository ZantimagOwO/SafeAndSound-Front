import {StyleSheet, View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { serverIP } from "../../../config";
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader'
import Button from "../Login-Signup/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function InformacionPersonal({navigation}) {

  const handleEdit = () => {
    navigation.navigate('InformacionPersonalEdit', {personalInfo});
  }

  const [personalInfo, setPersonalInfo] = useState({
    Ailments: [],
    Alergies: [],
    Blood_Type: null,
    DNI: '',
    Name: '',
    Password: '',
    Phone: null,
    Surname: '',
    User_ID: 0,
    Username: '',
    Diabetes: null,
    anyoNac: 0,
    diaNac: 0,
    mesNac: 0,
  });

  const getRHText = (rh) => {
    if(rh ===  true){
      return "Positivo";
    }else{
      return "Negativo";
    }
  };

  const getDiabetesText = (diabetes) => {
    if (diabetes === null || diabetes === '{}') {
      return "Sin diabetes";
    }else{
      return diabetes.Diabetes;
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const jsonString = await AsyncStorage.getItem('user');
        if (jsonString !== null) {
          const userData = JSON.parse(jsonString);
          setPersonalInfo(userData);
        }
        console.log(personalInfo)
        console.log(JSON.parse(await AsyncStorage.getItem('user')))
      } catch (e) {
        console.error('Error al leer los datos de AsyncStorage', e);
      }
    };

    loadUserInfo();

    
  }, []);

  return (
    
    <View style={styles.container}>
      <RegularHeader navigation={navigation}/>
      <View>
        <Text style={styles.center}>INFORMACIÓN PERSONAL</Text>
      </View>
      <View style={styles.flexStart}>
        <View style={styles.row}>
          <Text style={styles.green}>Nombre: </Text>
          <Text>{personalInfo.Name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.green}>Apellidos: </Text>
          <Text>{personalInfo.Surname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.green}>DNI: </Text>
          <Text>{personalInfo.DNI}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.green}>Fecha de nacimiento: </Text>
          <Text>{personalInfo.diaNac}/{personalInfo.mesNac}/{personalInfo.anyoNac}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.green}>Grupo Sanguíneo: </Text>
          <Text> {personalInfo.Blood_Type ? `${personalInfo.Blood_Type.Blood_Group} ${getRHText(personalInfo.Blood_Type.RH)}` : "Sin información"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.green}>Diabetes: </Text>
          <Text>{getDiabetesText(personalInfo.Diabetes)}</Text>
        </View>
        <View>
          <Text style={styles.green}>Alergias: </Text>
          <View style={styles.array}>
          {personalInfo.Alergies.map((alergia, index) => (
              <Text key={index}>- {alergia.Alergy}</Text>
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.green}>Otras afecciones graves: </Text>
          <View style={styles.array}>
          {personalInfo.Ailments.map((afeccion, index) => (
              <Text key={index}>- {afeccion.Ailment}</Text>
            ))}
          </View>
        </View>
      </View>
      <Button text="Editar" onPress={handleEdit}/>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  center: {
    marginTop: Constants.statusBarHeight+60,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    color: '#68c699',
    marginLeft: "auto",
    marginRight: "auto",
  },
  flexStart: {
    color: 'grey',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',  
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  green: {
    color: '#68c699',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  row: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    marginBottom: 16,
    color: '#68c699',

  },
  array: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
  },

})
