import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import Constants from 'expo-constants';
import RegularHeader from '../../components/headers/RegularHeader';
import MyButtonView from './MyButtonView';
import CreateButtonView from './CreateButtonView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverIP } from '../../../config';

export default function Boton({ navigation }) {

  const [activeView, setActiveView] = useState('');
  const [botones, setBotones] = useState([]);
  const [reload, setReload] = useState(false);
  const [editButtonData, setEditButtonData] = useState(null);

  const fetchButtons = useCallback(async () => {
    const id = await AsyncStorage.getItem('userID')
    const resp = await fetch(`${serverIP}/button/user/${id}`, { method: "GET" });
    const data = await resp.json();
    console.log('FetchedButtons: ' , data)
    setBotones(data)
    if (data.length > 0) {
      setActiveView(data[0]); 
    } else {
      setActiveView(null); 
    }
  }, [])

  useEffect(() => {
    fetchButtons();
  }, [fetchButtons, reload]);

  const renderActiveView = () => {
    if (editButtonData) {
      return <CreateButtonView navigation={navigation} setReload={setReload} editData={editButtonData} setEditButtonData={setEditButtonData} buttonName="Editar Botón"/>; 
    } else if (activeView === 'icon') {
      return <CreateButtonView navigation={navigation} setReload={setReload} buttonName="Crear Botón" />;
    } else if (activeView && typeof activeView === 'object') {
      return (
        <MyButtonView
          setReload={setReload}
          navigation={navigation}
          id={activeView.Button_ID}
          name={activeView.Button_Name}
          number={activeView.Button_Tlf}
          numberMessage={activeView.Emergency_Message}
          protectorMessage={activeView.Protector_Message}
          color={activeView.Color}
          phones={activeView.Phones.map(phone => phone.Phone)}
          setEditButtonData={setEditButtonData}
        />
      );
    } else {
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
        {
            botones.length > 0 && botones.map((btn) => (
              <TouchableOpacity 
                key={btn.Button_ID} 
                onPress={() => setActiveView(btn)} 
                style={[styles.button, getButtonStyle(btn)]}
              >
                <Text style={getTextStyle(btn)}>{btn.Button_Name}</Text>
              </TouchableOpacity>
            ))
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
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  noButtonMessage: {
    color: 'red',
    marginTop: '50%',
    textAlign: 'center',
  },
  button: {
    color: '#fff',
    flexDirection: 'row',
    paddingVertical: 5,
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
  },
  linea: {
    width: '100%',
    height: 2,
    backgroundColor: '#68c699',
  },
});
