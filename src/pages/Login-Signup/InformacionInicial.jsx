import {StyleSheet, View, ScrollView, Text } from 'react-native'
import React, {useState} from 'react'
import RegularHeader from '../../components/headers/RegularHeader'
import Constants from 'expo-constants';
import InputInformacionPersonal from '../../components/inputs/InputInformacionPersonal';
import InputRadioButton from '../../components/inputs/InputRadioButton';
import InputArray from '../../components/inputs/InputArray';
import Button from './Button';
import { serverIP } from "../../../config";

export default function InformacionInicial({navigation, route }) {

  const { username, password } = route.params;

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
  const [edad, setEdad] = useState('');
  const [grupoSanguineo, setGrupoSanguineo] = useState(0);
  const [rh, setRh] = useState(0);
  const [diabetes, setDiabetes] = useState(3);
  const [alergias, setAlergias] = useState([]);
  const [otrasAfecciones, setOtrasAfecciones] = useState([]);

  const [error, setError] = useState("");

  const validarTelefono = (telefono) => {
    return /^\d{8}$/.test(telefono);
  };
  
  const validarDNI = (dni) => {
    return /^\d{8}[a-zA-Z]$/.test(dni);
  };
  
  const validarCamposRequeridos = ({ nombre, apellidos, telefono, dni, edad }) => {
    return nombre && apellidos && telefono && dni && edad;
  };

  const handleLogin = () => {

    if (!validarCamposRequeridos({ nombre, apellidos, telefono, dni, edad })) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }
  
    if (!validarTelefono(telefono)) {
      setError('El teléfono debe tener exactamente 8 dígitos.');
      return;
    }
  
    if (!validarDNI(dni.trim())) {
      setError('El DNI debe tener 8 dígitos seguidos de una letra.');
      return;
    }

  //   {
  //   "DNI": "dndfgsi",
  //   "Username": "useargdfgdname",
  //   "Name": "nofmbrecbcb",
  //   "Surname": "apefllivbndos",
  //   "Password": "pasgswdfdgord",
  //   "Phone":  "htjykj",
  //   "RH": "1",
  //   "Blood_Group": "AB",
  //   "Diabetes": 1,
  //   "Ailments": [
  //     "Cosa"
  //     ],
  //   "Alergies": [
  //     "cosica"
  //     ]
  // }

    const requestBody = {
    "DNI": dni.trim(),
    "Username": username,
    "Name": nombre,
    "Surname": apellidos,
    "Password": password,
    "Phone":  telefono,
    "Ailments": otrasAfecciones,
    "Alergies": alergias,
    "RH": rh,
    "Blood_Group": grupoSanguineo,
    "Diabetes": diabetes
  }
    

    fetch(`${serverIP}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((data) => {
        console.log("Success:", data);
        if (data == 0) {
          setError("Usuario o contraseña incorrectos");
        } else {
          setError("");
          // saveLogin(data);
          navigation.navigate("Main");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Ha ocurrido un error al intentar conectar con el servidor.");
      });
    console.log(requestBody)
  };

  return (
    <ScrollView style={styles.body}>
      <RegularHeader navigation={navigation}/>
      <View style={styles.column}>
        <InputInformacionPersonal name={'Nombre'} width={'80%'} height={50} value={nombre} onChangeText={setNombre}/>
        <InputInformacionPersonal name={'Apellidos'} width={'80%'} height={50} value={apellidos} onChangeText={setApellidos}/>
        <InputInformacionPersonal name={'Teléfono'} width={'80%'} height={50} value={telefono} onChangeText={setTelefono}/>
        <View style={styles.row}>
          <InputInformacionPersonal name={'DNI'} width={'40%'} height={50} value={dni} onChangeText={setDni}/>
          <InputInformacionPersonal name={'Edad'} width={'40%'} height={50} value={edad} onChangeText={setEdad}/>
        </View>  
        <View style={styles.row2}>
          <InputRadioButton onChange={setGrupoSanguineo} name={'Grupo sanguineo'} width={'45%'} initial={0} height={120} radio_props={radio_props = [
    {label: 'A', value: 'A' },
    {label: 'B', value: 'B' },
    {label: 'AB', value: 'AB' },
    {label: 'O', value: 'O' }
  ]}/>
          <InputRadioButton onChange={setRh} name={'Rh'} width={'35%'} height={80} initial={0} radio_props={radio_props = [
    {label: 'Positivo', value: 1 },
    {label: 'Negativo', value: 0 }
  ]}/>
        </View>
        <InputRadioButton onChange={setDiabetes} name={'Diabetes'} width={'80%'} height={120} initial={3} radio_props={radio_props = [
    {label: 'Diabetes tipo 1', value: 1 },
    {label: 'Diabetes tipo 2', value: 2 },
    {label: 'Diabetes gestacional', value: 3 },
    {label: 'Sin diabetes', value: 4 },
  ]}/>
        <InputArray name={'Alergias'} width={'80%'} height={50} placeholder={"Introduce alergia"} items={alergias} setItems={setAlergias}/>
        <InputArray name={'Otras afecciones graves'} width={'80%'} height={50} placeholder={"Introduce afección grave"} items={otrasAfecciones} setItems={setOtrasAfecciones}/>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button text="Terminar registro" onPress={handleLogin}/>
        <View style={styles.espacioBlanco}/>
      </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        height: '100%',
    },
    column: {
        marginTop: Constants.statusBarHeight+50,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignContent: 'center',
      alignItems: 'center',
      padding: 10,
  },
    row2: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      padding: 10,
      height: 140
  },
  espacioBlanco: {
    height: 60
},
errorText: {
  color: 'red',
  marginTop: 20
},
})
