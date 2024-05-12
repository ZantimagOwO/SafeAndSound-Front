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
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: Constants.statusBarHeight,
        elevation: 10,
        height: 78,
        backgroundColor: '#68C699',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
    safeAndSoundLogo: {
        marginTop: 10,
        height: 60,
        width: 90,
        marginLeft: 25,
    },
    logoutImage: {
        height: 25,
        width: 30,
        marginRight: 25,
        resizeMode: 'contain',
    },
});

export default MainHeader;