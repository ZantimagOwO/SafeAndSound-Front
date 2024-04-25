import React from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './src/pages/Main';
import Home from './src/pages/Home/Home';
import Home2 from './src/pages/Home/Home2';

const Stack = createNativeStackNavigator();

export default function App() {
        
  return (
    <View style={styles.body}>
      <NavigationContainer>  
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Main'> 
          <Stack.Screen name="Main" component={Main}/>    
          <Stack.Screen name="Home" component={Home}/>    
          <Stack.Screen name="Home2" component={Home2}/>    
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