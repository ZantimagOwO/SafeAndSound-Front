import React from 'react';
import MainHeader from '../components/headers/MainHeader';
import Constants from 'expo-constants';
import MainPageButton from '../components/buttons/MainPageButton';
import { StyleSheet, View } from 'react-native';


const Main = ({ navigation }) => {
    return (
        <View style={styles.body}>
            <MainHeader/>
            <View style={styles.grid}>
                <MainPageButton
                    style={styles.button}
                    icon={require('../../assets/Main/ambulance.png')}
                    text='Botón de emergencia'
                    onPress={() => navigation.navigate('Boton')}
                />
                <MainPageButton
                    icon={require('../../assets/Main/shield.png')}
                    text='Mis Protegidos y Protectores'
                    onPress={() => navigation.navigate('ProtegidosProtectores')}
                />
                <MainPageButton
                    icon={require('../../assets/Main/legalinfo.png')}
                    text='Información Legal'
                    onPress={() => navigation.navigate('InformacionLegal')}
                />
                <MainPageButton
                    icon={require('../../assets/Main/agenda.png')}
                    text='Agenda'
                    onPress={() => navigation.navigate('Agenda')}
                />
                <MainPageButton
                    icon={require('../../assets/Main/extinguisher.png')}
                    text='Guía de Supervivencia'
                    onPress={() => navigation.navigate('Supervivencia')}
                />
                                <MainPageButton
                    icon={require('../../assets/Main/wiki.png')}
                    text='Wiki'
                    onPress={() => navigation.navigate('Wiki')}
                />
                                <MainPageButton
                    icon={require('../../assets/Main/closecenters.png')}
                    text='Centros de Salud cercanos'
                    onPress={() => navigation.navigate('CentrosSalud')}
                />
                                <MainPageButton
                    icon={require('../../assets/Main/medinator.png')}
                    text='Medinator'
                    onPress={() => navigation.navigate('Medinator')}
                />
                                <MainPageButton
                    icon={require('../../assets/Main/personalinfo.png')}
                    text='Información personal'
                    onPress={() => navigation.navigate('InformacionPersonal')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        height: '100%',
    },
    grid: {
        marginTop: Constants.statusBarHeight+50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        width: '20%', 
        aspectRatio: 1, 
        marginVertical: 10, 
        wordWrap: 'wrap',
    }
});

export default Main;