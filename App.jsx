import React from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './src/pages/Main';
import Boton from './src/pages/Boton';
import ProtegidosProtectores from './src/pages/ProtegidosProtectores';
import InformacionLegal from './src/pages/InformacionLegal';
import Agenda from './src/pages/Agenda';
import Supervivencia from './src/pages/Supervivencia';
import Wiki from './src/pages/Wiki';
import CentrosSalud from './src/pages/CentrosSalud';
import Medinator from './src/pages/Medinator';
import InformacionPersonal from './src/pages/InformacionPersonal';


const Stack = createNativeStackNavigator();

export default function App() {
        
  return (
    <View style={styles.body}>
      <NavigationContainer>  
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Main'> 
          <Stack.Screen name="Main" component={Main}/>    
          <Stack.Screen name="Boton" component={Boton}/>    
          <Stack.Screen name="ProtegidosProtectores" component={ProtegidosProtectores}/>    
          <Stack.Screen name="InformacionLegal" component={InformacionLegal}/>    
          <Stack.Screen name="Agenda" component={Agenda}/>    
          <Stack.Screen name="Supervivencia" component={Supervivencia}/>    
          <Stack.Screen name="Wiki" component={Wiki}/>    
          <Stack.Screen name="CentrosSalud" component={CentrosSalud}/>    
          <Stack.Screen name="Medinator" component={Medinator}/>    
          <Stack.Screen name="InformacionPersonal" component={InformacionPersonal}/>    
        </Stack.Navigator> 
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});