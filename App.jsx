import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/pages/Main';
import Boton from './src/pages/Boton';
import ProtegidosProtectores from './src/pages/ProtegidosProtectores/ProtegidosProtectores';
import InformacionLegal from './src/pages/InformacionLegal';
import Agenda from './src/pages/Agenda';
import Supervivencia from './src/pages/Supervivencia';
import Wiki from './src/pages/Wiki';
import CentrosSalud from './src/pages/CentrosSalud';
import Medinator from './src/pages/Medinator';
import InformacionPersonal from './src/pages/InformacionPersonal';
import InformacionInicial from './src/pages/Login-Signup/InformacionInicial';
import Login from './src/pages/Login-Signup/Login';
import Signup from './src/pages/Login-Signup/Signup';
import { Linking, NativeModules } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {

    // const [fontsLoaded, setFontsLoaded] = useState(false);

    // async function loadFonts() {
    //   await Font.loadAsync({
    //     Inter: require('./assets/fonts/Inter.ttf'), // Asegúrate de tener la ruta correcta
    //   });
    //   setFontsLoaded(true);
    // }

    // useEffect(() => {
    //   loadFonts();
    // }, []);

    // if (!fontsLoaded) {
    //   return <AppLoading />;
    // }

    let phoneNumber = '34666970082'

    const llamar = async () => {
      Linking.openURL(`tel:${phoneNumber}`)
    }

    
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
        </Stack.Navigator>
      </NavigationContainer>

      <TouchableOpacity onPress={llamar} style={styles.temp}>
        {/* <Text>
        LLAMAR A SANTI
        </Text> */}
      </TouchableOpacity>
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
