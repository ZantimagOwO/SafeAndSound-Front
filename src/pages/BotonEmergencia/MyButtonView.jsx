import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader';
import Button from '../Login-Signup/Button';
import { serverIP } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyButtonView({setReload,id, name, number, numberMessage, protectorMessage, color, phones = [], setEditButtonData }) {

  console.log("MyButtonView initial: ", phones)

  const [contacts, setContactos] = useState({});

  const getContactsAsync = useCallback(async () => {
    let t = await AsyncStorage.getItem("contacts");
    setContactos(JSON.parse(t));
  }, []);

  useEffect(() => {
    getContactsAsync();
  }, [getContactsAsync]);

  const handleEdit = () => {
    const editData = {
      id,
      name,
      number,
      numberMessage,
      protectorMessage,
      color,
      phones
    };
    console.log(editData);
    setEditButtonData(editData);
  };

  const handleDelete =  () => {
    Alert.alert(
      'Eliminar',
      '¿Estás seguro de que quieres eliminar este contacto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
            const response = await fetch(`${serverIP}/button/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              throw new Error('Error en la eliminación');
            }
            let data;
            try {
              const text = await response.text();
              data = text ? JSON.parse(text) : {};
            } catch (error) {
              data = null;
            }
            Alert.alert('Botón eliminado');
            setReload(prev => !prev);
            } catch (error) {
              console.error("Error:", error);
              Alert.alert("Error", "Ha ocurrido un error al intentar conectar con el servidor.");
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  console.log("Protectores de este boton: " + phones);

  return (
    <View style={styles.body}>
      <View style={styles.row}>
        <Text style={styles.green}>Nombre:  </Text>
        <Text style={styles.grey}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.green}>Número:  </Text>
        <Text style={styles.grey}>{number}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.green}>Mensaje de emergencia:  </Text>
        <Text style={styles.grey}>{numberMessage}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.green}>Mensaje para tus protectores:  </Text>
        <Text style={styles.grey}>{protectorMessage}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.green}>Color:  </Text>
        <Text style={[styles.buttonColor, { backgroundColor: color }]}>               </Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.green}>Tus Protectores:  </Text>
        {phones.length > 0 ? (
          phones.map((phone, index) => (
            <View key={index} style={styles.protectorContainer}>
              <Image source={require('../../../assets/Protectoresprotegidos/shield.png')} style={styles.protectorIcon} />
              <Text style={styles.protectorName}>{contacts[phone] || phone}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.grey}>No tienes protectores asociados</Text>
        )}
        <View style={styles.column}>
          <Button onPress={handleEdit} text="Editar"></Button>
          <Button onPress={handleDelete} text="Eliminar"></Button>
        </View>
      </View>
      <View style={styles.finalSpace}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: '100%',
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // borderColor: '#68c699',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  row: {
    marginTop: 5,
    width: '100%',
    flexDirection: 'row',
  },
  column: {
    marginTop: 5,
    width: '100%',
    flexDirection: 'column',
  },
  green: {
    color: '#68c699',
    fontWeight: 'bold',
    fontSize: 16,
  },
  grey: {
    color: 'grey',
    fontSize: 16,
  },
  buttonColor: {
    backgroundColor: 'red',
    borderColor: '#grey',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  protectorContainer: {
    marginTop: 10,
    width: '100%',
    height: 50,
    borderColor: '#68c699',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  protectorIcon: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  protectorName: {
    color: 'grey',
    fontSize: 16,
    marginLeft: 10,
  },
  finalSpace: {
    height: 80,
  },
});
