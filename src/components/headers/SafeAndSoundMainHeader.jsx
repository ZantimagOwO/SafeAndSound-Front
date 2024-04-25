import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MainHeader = () => {
    return (
        <View style={mainHeader.mainDiv}>
            <Text>Hola</Text>
        </View>
    );
};

const mainHeader = StyleSheet.create({
    mainDiv: {
        height: 78,
        backgroundColor: '#68C699',
        alignItems: 'center',
        justifyContent: 'center'
    },
    safeAndSoundLogo: {
        height: 78,
        backgroundColor: '#68C699',
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionsDropdown: {
        height: 78,
        backgroundColor: '#68C699',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MainHeader;