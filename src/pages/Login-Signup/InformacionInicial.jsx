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
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState(0);
  const [anyo, setAnyo] = useState(0);
  const [grupoSanguineo, setGrupoSanguineo] = useState(0);
  const [rh, setRh] = useState(0);
  const [diabetes, setDiabetes] = useState(3);
  const [alergias, setAlergias] = useState([]);
  const [otrasAfecciones, setOtrasAfecciones] = useState([]);

  const [error, setError] = useState("");

  const validarDia = (dia) => {
    return dia >= 1 && dia <= 31;
  };
  
  const validarMes = (mes) => {
    return mes >= 1 && mes <= 12;
  };
  
  const validarAno = (anyo) => {
    const currentYear = new Date().getFullYear();
    return anyo >= 1900 && anyo <= currentYear;
  };

  const validarTelefono = (telefono) => {
    return /^\d{9}$/.test(telefono);
  };
  
  const validarDNI = (dni) => {
    return /^\d{8}[a-zA-Z]$/.test(dni);
  };
  
  const validarCamposRequeridos = ({ nombre, apellidos, telefono, dni, dia, mes, anyo }) => {
    return nombre && apellidos && telefono && dni && dia && mes && anyo;
  };

  const handleLogin = () => {

    if (
      !validarCamposRequeridos({
        nombre,
        apellidos,
        telefono,
        dni,
        dia,
        mes,
        anyo,
      })
    ) {
      setError("Por favor, completa todos los campos requeridos.");
      return;
    }
  
    if (!validarTelefono(telefono)) {
      setError('El teléfono debe tener exactamente 9 dígitos.');
      return;
    }
  
    if (!validarDNI(dni.trim())) {
      setError('El DNI debe tener 8 dígitos seguidos de una letra.');
      return;
    }
    
    if (!validarDia(dia) || !validarMes(mes) || !validarAno(anyo)) {
      setError('Por favor, introduce una fecha de imiento válida.');
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
      DNI: dni.trim(),
      Username: username,
      Name: nombre,
      Surname: apellidos,
      Password: password,
      Phone: telefono,
      Ailments: otrasAfecciones,
      Alergies: alergias,
      RH: rh,
      Blood_Group: grupoSanguineo,
      Diabetes: diabetes + 1,
      dia: dia,
      mes: mes,
      anyo: anyo
    };
    

    fetch(`${serverIP}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((data) => {
        console.log("Respuesta signup:", data);
        fetchData();
        navigation.navigate("Main");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Ha ocurrido un error al intentar conectar con el servidor.");
      });
  };

  const saveInfo = async (userToken) => {
    try {
      await AsyncStorage.setItem("userID", userToken.User_ID + "");
      await AsyncStorage.setItem("userPhone", userToken.Phone.Phone + "");
      const jsonValue = JSON.stringify(userToken);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.error("Error al guardar el token de login", e);
    }
  };

  const fetchData = () => {

    fetch(`${serverIP}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        saveInfo(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Ha ocurrido un error al intentar conectar con el servidor.");
      });

  }

  return (
    <ScrollView style={styles.body}>
      <RegularHeader navigation={navigation}/>
      <View style={styles.column}>
        <InputInformacionPersonal name={'Nombre'} width={'80%'} height={50} value={nombre} onChangeText={setNombre}/>
        <InputInformacionPersonal name={'Apellidos'} width={'80%'} height={50} value={apellidos} onChangeText={setApellidos}/>
        <View style={styles.row}>
          <InputInformacionPersonal name={'Teléfono'} width={'40%'} height={50} value={telefono} onChangeText={setTelefono}/>
          <InputInformacionPersonal name={'DNI'} width={'40%'} height={50} value={dni} onChangeText={setDni}/>
        </View>  
        <Text style={styles.fecha}>Fecha de nacimiento</Text>
        <View style={styles.row}>
          <InputInformacionPersonal name={'Día'} width={'20%'} height={50} value={dia} onChangeText={setDia}/>
          <InputInformacionPersonal name={'Mes'} width={'20%'} height={50} value={mes} onChangeText={setMes}/>
          <InputInformacionPersonal name={'Año'} width={'35%'} height={50} value={anyo} onChangeText={setAnyo}/>
        </View> 
        <View style={styles.row2}>
          <InputRadioButton onChange={setGrupoSanguineo} initial={0} name={'Grupo sanguineo'} width={'45%'} height={120} radio_props={radio_props = [
    {label: 'A', value: 0 },
    {label: 'B', value: 1 },
    {label: 'AB', value: 2 },
    {label: 'O', value: 3 }
  ]}/>
          <InputRadioButton onChange={setRh} name={'Rh'} width={'35%'} height={80} initial={0} radio_props={radio_props = [
    {label: 'Negativo', value: 0 },
    {label: 'Positivo', value: 1 }
  ]}/>
        </View>
        <InputRadioButton onChange={setDiabetes} name={'Diabetes'} width={'80%'} height={120} initial={3} radio_props={radio_props = [
    {label: 'Diabetes tipo 1', value: 0 },
    {label: 'Diabetes tipo 2', value: 1 },
    {label: 'Diabetes gestacional', value: 2 },
    {label: 'Sin diabetes', value: 3 },
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
fecha: {
  color: '#68C699',
  fontSize: 18
},
errorText: {
  color: 'red',
  marginTop: 20
},
})
