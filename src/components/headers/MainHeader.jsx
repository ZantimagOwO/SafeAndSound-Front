import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image } from 'react-native';

const MainHeader = () => {
    return (
        <View style={mainHeader.espacio}>
            <View style={mainHeader.mainDiv}>
                <Image source={require('../../../assets/Header/logo.png')} style={mainHeader.safeAndSoundLogo}/>
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
    optionsDropdown: {
        height: 78,
        backgroundColor: '#68C699',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MainHeader;