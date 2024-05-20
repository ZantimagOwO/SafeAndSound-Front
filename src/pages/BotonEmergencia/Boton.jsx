import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader';
import MyButtonView from './MyButtonView';
import CreateButtonView from './CreateButtonView';
import { serverIP } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Boton({ navigation }) {

  const [activeView, setActiveView] = useState('');
  const [botones, setBotones] = useState([]);

  const fetchButtons = useCallback(async () => {
    const id = await AsyncStorage.getItem('userID')
    const resp = await fetch(`${serverIP}/button/user/${id}`, { method: "GET" });
    console.log('fetchedButtons: ' + resp)
    setBotones(resp)
  }, [])

  useEffect(() => {
    fetchButtons();
  }, [fetchButtons]);

  const renderActiveView = () => {
    if(activeView == 'icon'){
      return <CreateButtonView></CreateButtonView>;
    }
    
    let btn = activeView;
    return <MyButtonView 
    name={btn.name} 
    number={btn.number}
    numberMessage={btn.numberMessage} 
    protectorMessage={btn.protectorMessage}
    color={btn.color}
    protectors={btn.protectors}
    ></MyButtonView>
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
         {
            botones && botones.length > 0 ? (
              botones.map((btn) => (
                <TouchableOpacity key={btn.ButtonID} onPress={() => setActiveView(btn)} style={[styles.button, getButtonStyle(btn)]}>
                  <Text style={getTextStyle(btn)}>{btn.Button_Name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noButtonMessage}>No tienes botones disponibles</Text>
            )
          }
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
