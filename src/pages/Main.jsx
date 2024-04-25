import React from 'react';
import MainHeader from '../components/headers/SafeAndSoundMainHeader';
import MainPageButton from '../components/buttons/MainPageButton';
import { StyleSheet, View } from 'react-native';


const Main = ({ navigation }) => {
    return (
        <View>
            <MainHeader/>
            <View style={styles.grid}>
                <MainPageButton
                    icon={require('../../assets/icon.png')}
                    text="Botón de emergencia"
                    onPress={() => navigation.navigate("Home")}
                />
                <MainPageButton
                    icon={require('../../assets/icon.png')}
                    text="Botón de emergencia"
                    onPress={() => navigation.navigate("Home")}
                />
                <MainPageButton
                    icon={require('../../assets/icon.png')}
                    text="Botón de emergencia"
                    onPress={() => navigation.navigate("Home")}
                />
                <MainPageButton
                    icon={require('../../assets/icon.png')}
                    text="Botón de emergencia"
                    onPress={() => navigation.navigate("Home")}
                />
                <MainPageButton
                    icon={require('../../assets/icon.png')}
                    text="Botón de emergencia"
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    }
});

export default Main;