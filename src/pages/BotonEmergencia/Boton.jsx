import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> parent of 2877542 (Boton fetch (WIP))
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader';
import MyButtonView from './MyButtonView';
import CreateButtonView from './CreateButtonView';

export default function Boton({ navigation }) {

  const [activeView, setActiveView] = useState('');

  const renderActiveView = () => {
    switch (activeView) {
      case 'view1':
        return <MyButtonView 
        name="SOS" 
        number="112" 
        numberMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
        protectorMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
        color="green"
        protectors={[{"ProtectorName":"Protector 1", "ProtectorID":"1"}, {"ProtectorName":"Protector 2", "ProtectorID":"2"}]}
        ></MyButtonView>
      case 'view2':
        return <Text style={styles.viewText}>Contenido del View 2</Text>;
      case 'view3':
        return <Text style={styles.viewText}>Contenido del View 3</Text>;
      case 'icon':
        return <CreateButtonView></CreateButtonView>;
      default:
        return <Text style={styles.noButtonMessage}>No tienes ningún botón por el momento</Text>;
    }
  };

  const getButtonStyle = (view) => {
    return activeView === view ? styles.activeButton : styles.inactiveButton;
  };

  const getTextStyle = (view) => {
    return activeView === view ? styles.activeButtonText : styles.inactiveButtonText;
  };

  const getIconStyle = () => {
    return activeView === 'icon' ? styles.activeIcon : styles.inactiveIcon;
  };

  return (
    <ScrollView style={styles.body}>
      <RegularHeader navigation={navigation} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonHeader}>
          <TouchableOpacity onPress={() => setActiveView('view1')} style={[styles.button, getButtonStyle('view1')]}>
            <Text style={getTextStyle('view1')}>Boton 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveView('view2')} style={[styles.button, getButtonStyle('view2')]}>
            <Text style={getTextStyle('view2')}>Boton 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveView('icon')} style={[styles.icon, getIconStyle()]}>
            <Image source={require('../../../assets/Protectoresprotegidos/add.png')} />
          </TouchableOpacity>
          <View style={styles.padreLinea}>
            <View style={styles.linea} />
          </View>
        </View>
      </View>
      <View style={styles.dynamicView}>
        {renderActiveView()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: '100%',
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
  buttonHeader: {
    marginTop: Constants.statusBarHeight + 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderColor: '#68c699',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  noButtonMessage: {
    color: 'red',
    marginTop: '50%',
    textAlign: 'center',
  },
  button: {
    color: '#fff',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#68c699',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  icon: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 40,
  },
  dynamicView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  inactiveButton: {
    backgroundColor: '#68c699',
    borderColor: '#68c699',
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    borderTopColor: '#68c699',
    borderRightColor: '#68c699',
    borderLeftColor: '#68c699',
    borderWidth: 1,
    fontSize: 16,
  },
  inactiveButtonText: {
    color: '#fff',
    fontSize: 16,

  },
  activeButtonText: {
    color: '#68c699',
    fontSize: 16,

  },
  inactiveIcon: {
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    borderBottomColor: '#68c699', 
    borderWidth: 2,
  },
  activeIcon: {
    borderBottomColor: '#fff',
    borderTopColor: '#68c699',
    borderRightColor: '#68c699',
    borderLeftColor: '#68c699',
    borderWidth: 1,
  },
  viewText: {
    fontSize: 18,
    color: 'black',
  },
  colorWhite: {
    color: 'white',
  },
  padreLinea: {
    height: 40,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  linea: {
    width: '100%',
    height: 2,
    backgroundColor: '#68c699',
  },
});
