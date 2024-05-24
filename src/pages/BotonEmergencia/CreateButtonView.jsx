import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputInformacionPersonal from '../../components/inputs/InputInformacionPersonal';
import { serverIP } from '../../../config';
import ProtectorListCheck from './ProtectorListCheck';
import Button from '../Login-Signup/Button';

export default function CreateButtonView({navigation}) {

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensajeEmergenciaNumero, setMensajeEmergenciaNumero] = useState('');
  const [mensajeEmergenciaProtectores, setMensajeEmergenciaProtectores] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [protectores, setProtectores] = useState([]);
  const [selectedProtectores, setSelectedProtectores] = useState({});

  const colors = [
    '#BF392B', '#DC6154', '#9B59B6', '#A23BCD', '#2A80B9',
    '#F1C40E', '#3FCC71', '#34AE60', '#31A084', '#3498DB',
    '#F39C13', '#D35400', '#95A5A6', '#34495E', '#000000'
  ];

  const fetchProtectores = useCallback(async () => {
    const user = await AsyncStorage.getItem("userID");
    const data = await fetch(`${serverIP}/users/${user}/protectors`);
    let res = await data.text();
    console.log(res)
    setProtectores(JSON.parse(res));
  }, []);

  const handleCreateButton = useCallback(async () => {

    const userID = await AsyncStorage.getItem("userID");

    const requestBody = {
      userID: parseInt(userID),
      nombreBoton: nombre,
      telefonoEmergencia: telefono,
      mensajeEmergenciaNumero,
      mensajeEmergenciaProtectores,
      selectedColor,
      protectores: getSelectedProtectores()
    };

    console.log(requestBody)

    try {
      const response = await fetch(`${serverIP}/button`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Button created successfully:', result);
        navigation.navigate("Main");
      } else {
        console.error('Failed to create button:', result);
      }
    } catch (error) {
      console.error('Error creating button:', error);
    }
  }, [nombre, telefono, mensajeEmergenciaNumero, mensajeEmergenciaProtectores, selectedColor, selectedProtectores]);


  useEffect(() => {
    fetchProtectores();
  }, [fetchProtectores]);

  const renderColorGrid = () => {
    return colors.map((color, index) => (
      <TouchableOpacity key={index} onPress={() => setSelectedColor(color)}>
        <View style={[styles.color, { backgroundColor: color }]}>
          {selectedColor === color && <Text style={styles.iconText}>✔</Text>}
        </View>
      </TouchableOpacity>
    ));
  };

  const handleSelectProtector = (id, isSelected) => {
    setSelectedProtectores(prevState => ({
      ...prevState,
      [id]: isSelected
    }));
  };

  const getSelectedProtectores = () => {
    return Object.keys(selectedProtectores)
    .filter(key => selectedProtectores[key])
    .map(key => parseInt(key));
  };


  return (
    <View style={styles.body}>
      <View style={styles.row}>
        <InputInformacionPersonal name={'Nombre'} width={'80%'} height={50} value={nombre} onChangeText={setNombre}/>
      </View>
      <View style={styles.row}>
        <InputInformacionPersonal name={'Teléfono'} width={'80%'} height={50} value={telefono} onChangeText={setTelefono}/>
      </View>
      <View style={styles.column}>
        <InputInformacionPersonal name={'Mensaje de emergencia'} width={'80%'} height={150} value={mensajeEmergenciaNumero} onChangeText={setMensajeEmergenciaNumero}/>
      </View>
      <View style={styles.column}>
        <InputInformacionPersonal style={styles.inputStyle} name={'Mensaje para tus protectores'} width={'80%'} height={150} value={mensajeEmergenciaProtectores} onChangeText={setMensajeEmergenciaProtectores}/>
      </View>
      <View style={styles.column2}>
        <Text style={styles.green}>Selecciona un color:</Text>
        <View style={styles.colorGrid}>
          <View style={styles.colorRow}>{renderColorGrid().slice(0, 5)}</View>
          <View style={styles.colorRow}>{renderColorGrid().slice(5, 10)}</View>
          <View style={styles.colorRow}>{renderColorGrid().slice(10, 15)}</View>
        </View>
      </View>
      <View style={styles.column2}>
        <Text style={styles.green}>Tus Protectores:  </Text>
        <View style={styles.list}>
        {Array.isArray(protectores) && protectores.length > 0 ? (
            protectores.map((protector) => (
              <ProtectorListCheck
                key={protector.Phone_ID}
                phone={protector.Phone}
                id={protector.Phone_ID}
                onSelect={handleSelectProtector}
              />
            ))
          ) : (
            <Text>No tienes protectores aún.</Text>
          )}
        </View>
      </View>
      <Button text="Crear Botón" onPress={handleCreateButton}></Button>
      <View style={styles.finalSpace}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    marginLeft: 'auto',

    // borderColor: '#68c699',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  row: {
    marginTop: 5,
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    marginTop: 5,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column2: {
    marginTop: 5,
    width: '80%',
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  green: {
    marginTop: 20,
    color: '#68c699',
    fontSize: 16,
  },
  inputStyle: {
    textAlignVertical: 'top',
  },
  colorGrid: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

  },
  colorRow: {
    // backgroundColor: 'blue',
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  color: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 18,
  },
  list: {
    height: "auto",
    width: "100%",
    display: "flex",
    position: "relative",
    marginBottom: "10%",
  },
  finalSpace: {
    height: 80,
  }
  
});