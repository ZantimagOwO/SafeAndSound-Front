import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/pages/Main';
import Boton from './src/pages/BotonEmergencia/Boton';
import ProtegidosProtectores from './src/pages/ProtegidosProtectores/ProtegidosProtectores';
import InformacionLegal from './src/pages/InformacionLegal';
import Agenda from './src/pages/Agenda';
import Supervivencia from './src/pages/Supervivencia';
import Wiki from './src/pages/Wiki';
import CentrosSalud from './src/pages/CentrosSalud';
import Medinator from './src/pages/Medinator';
import InformacionPersonal from './src/pages/InformacionPersonal/InformacionPersonal';
import InformacionPersonalEdit from './src/pages/InformacionPersonal/InformacionPersonalEdit';
import InformacionInicial from './src/pages/Login-Signup/InformacionInicial';
import Login from './src/pages/Login-Signup/Login';
import Signup from './src/pages/Login-Signup/Signup';
import { Linking, NativeModules } from "react-native";
import * as Contacts from "expo-contacts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerRootComponent } from "expo";

const Stack = createNativeStackNavigator();

AppRegistry.registerComponent("main", () => App);

export let contacts = {}

export default function App() {

    // const [fontsLoaded, setFontsLoaded] = useState(false);

    // async function loadFonts() {
    //   await Font.loadAsync({
    //     Inter: require('./assets/Fonts/Inter.ttf'), // Asegúrate de tener la ruta correcta
    //   });
    //   setFontsLoaded(true);
    // }

    // useEffect(() => {
    //   loadFonts();
    // }, []);

    // if (!fontsLoaded) {
    //   return <AppLoading />;
    // }


    
  return (
    <View style={styles.body}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName='Main'
        >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='InformacionInicial' component={InformacionInicial}/>
          <Stack.Screen name='Main' component={Main} />
          <Stack.Screen name='Boton' component={Boton} />
          <Stack.Screen name='ProtegidosProtectores' component={ProtegidosProtectores}/>
          <Stack.Screen name='InformacionLegal' component={InformacionLegal} />
          <Stack.Screen name='Agenda' component={Agenda} />
          <Stack.Screen name='Supervivencia' component={Supervivencia} />
          <Stack.Screen name='Wiki' component={Wiki} />
          <Stack.Screen name='CentrosSalud' component={CentrosSalud} />
          <Stack.Screen name='Medinator' component={Medinator} />
          <Stack.Screen name='InformacionPersonal' component={InformacionPersonal}/>
          <Stack.Screen name='InformacionPersonalEdit' component={InformacionPersonalEdit}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  temp:{
    position: "absolute",
    top:50
  }
});

registerRootComponent(App);

export const cargarContactos = async () => {

        const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const data = (
          await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.PhoneNumbers,
              Contacts.Fields.Name
            ],
            sort: "firstName",
          })
        ).data;

        data.forEach(c => {
          let phon = c.phoneNumbers[0].number.replace(/\s+/g, "");
          contacts[phon] = c.name;
        })

        const entries = Object.entries(contacts);

        // Ordenar la matriz por los valores (nombres)
        entries.sort((a, b) => a[1].localeCompare(b[1]));

        // Crear un nuevo objeto ordenado
        const sortedDictionary = Object.fromEntries(entries);

        console.log("CONTACTS: " + JSON.stringify(sortedDictionary));

        AsyncStorage.setItem("phonesToNames", JSON.stringify(contacts));
      }
}