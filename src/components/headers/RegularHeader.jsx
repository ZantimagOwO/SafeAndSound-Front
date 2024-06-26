import React from 'react';
import Constants from 'expo-constants';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RegularHeader = ({navigation}) => {
    return (
        <View style={regularHeader.espacio}>
            <View style={regularHeader.mainDiv}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
                    <Image  source={require('../../../assets/Header/logo.png')} 
                            style={regularHeader.safeAndSoundLogo}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image  source={require('../../../assets/Header/back.png')} 
                            style={regularHeader.backImage}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const regularHeader = StyleSheet.create({
    mainDiv: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        elevation: 10,
        height: 78,
        backgroundColor: '#68C699',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    safeAndSoundLogo: {
        marginTop: 10,
        height: 60,
        width: 90,
        marginLeft: 25,
    },
    backImage: {
        marginTop: 8,
        height: 25,
        resizeMode: 'contain',
    },
});

export default RegularHeader;