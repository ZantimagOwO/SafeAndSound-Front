import {StyleSheet, View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { serverIP } from "../../../config";
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader'
import Button from "../Login-Signup/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function InformacionPersonal({navigation}) {

  const handleEdit = () => {
    navigation.navigate('InformacionPersonalEdit')
  }

  const [personalInfo, setPersonalInfo] = useState({
    Ailments: [],
    Alergies: [],
    Bloof_Type: null,
    DNI: '',
    Name: '',
    Password: '',
    Phone: null,
    Surname: '',
    User_ID: 0,
    Username: '',
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const jsonString = await AsyncStorage.getItem('user');
        if (jsonString !== null) {
          const userData = JSON.parse(jsonString);
          setPersonalInfo(userData);
          console.log(personalInfo)
        }
      } catch (e) {
        console.error('Error al leer los datos de AsyncStorage', e);
      }
    };

    loadUserInfo();
  }, []);

  return (
    <View >
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
          <Text>asdfa</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.green}>DNI: </Text>
          <Text>asdf</Text>
          <Text style={styles.green}>Edad: </Text>
          <Text>28</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.green}>Grupo Sanguíneo: </Text>
          <Text>AB Negativo</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.green}>Diabetes: </Text>
          <Text>Sin diabetes</Text>
        </View>
        <View>
          <Text style={styles.green}>Alergias: </Text>
          <View style={styles.array}>
            <Text>- Alergia 1</Text>
            <Text>- Alergia 2</Text>
            <Text>- Alergia 3</Text>
          </View>
        </View>
        <View>
          <Text style={styles.green}>Otras afecciones graves: </Text>
          <View style={styles.array}>
            <Text>- Asma</Text>
            <Text>- Epilepsia</Text>
          </View>
        </View>
      </View>
      <Button text="Editar" onPress={() => navigation.navigate("InformacionPersonalEdit")}/>
    </View>
  )
}

const styles=StyleSheet.create({
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
