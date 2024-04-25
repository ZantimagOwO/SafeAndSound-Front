import React from 'react';
import SafeAndSoundMainHeader from '../components/headers/SafeAndSoundMainHeader';
import { StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import Navigation from '../Navigation';

const Main = () => {
    return (
        <View>
            <SafeAndSoundMainHeader/>
            <Navigation/>
        </View>
    );
};

export default Main;