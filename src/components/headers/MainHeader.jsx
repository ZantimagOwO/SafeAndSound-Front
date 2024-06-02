import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainHeader = ({navigation}) => {

    const logout = async () => {
        try {
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('userID');
          await AsyncStorage.removeItem('buttons');
          await AsyncStorage.removeItem('userPhone');
          navigation.navigate('Login')
        } catch (e) {
          console.error('Error al eliminar el token de login', e);
        }
      }

    return (
        <View>
            <View style={mainHeader.mainDiv}>
                <Image source={require('../../../assets/Header/logo.png')} style={mainHeader.safeAndSoundLogo}/>
                <TouchableOpacity onPress={()=> logout()} style={mainHeader.imageContainer}>
                    <Image  source={require('../../../assets/Header/logout.png')} 
                            style={mainHeader.logoutImage}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const mainHeader = StyleSheet.create({
    mainDiv: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
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
    imageContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
    },
    logoutImage: {
        height: 25,
        width: 30,
        resizeMode: 'contain',
    },
});

export default MainHeader;