import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SafeAndSoundMainHeader = () => {
    return (
        <View style={MainHeader.mainDiv}>
            <Text>Hola</Text>
        </View>
    );
};

const MainHeader = StyleSheet.create({
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

export default SafeAndSoundMainHeader;