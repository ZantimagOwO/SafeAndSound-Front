import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainHeader = ({navigation}) => {

    const logout = async () => {
        try {
          await AsyncStorage.removeItem('user');
          navigation.navigate('Login')
        } catch (e) {
          console.error('Error al eliminar el token de login', e);
        }
      }

    return (
        <View style={mainHeader.espacio}>
            <View style={mainHeader.mainDiv}>
                <Image source={require('../../../assets/Header/logo.png')} style={mainHeader.safeAndSoundLogo}/>
                <TouchableOpacity onPress={()=> logout()}>
                    <Image  source={require('../../../assets/Header/logout.png')} 
                            style={mainHeader.logoutImage}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const mainHeader = StyleSheet.create({
    espacio: {
        backgroundColor: '#000000',
        height: Constants.statusBarHeight,
        width: '100%',
    },
    mainDiv: {
        flexWrap: 'wrap',
        alignContent: 'space-between',
        marginTop: Constants.statusBarHeight,
        elevation: 10,
        height: 78,
        backgroundColor: '#68C699',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    safeAndSoundLogo: {
        height: 60,
        width: 90,
        marginLeft: 20
    },
    logoutImage: {
        marginRight: 25,
        height: 25,
        width: 30,
        resizeMode: 'contain',
    },
});

export default MainHeader;