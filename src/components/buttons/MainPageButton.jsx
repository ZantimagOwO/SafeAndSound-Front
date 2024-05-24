import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const MainPageButton = ({ icon, text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={icon} style={styles.icon}/>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '30%',
        height: 150,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
        margin: 5,
        borderRadius: 4,
        justifyContent: 'center',
        borderColor: '#68c699',
        borderWidth: 1,

    },
    icon: {
        marginTop: 20,
        width: 100,
        height: 60,
        resizeMode: 'contain',
        margin: 10,
    },
    text: {
        color: '#68c699',
        // borderColor: '#68c699',
        // borderWidth: 1,
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        flex: 1,
        fontWeight: 'bold',
        marginBottom: 5
    },
});

export default MainPageButton;