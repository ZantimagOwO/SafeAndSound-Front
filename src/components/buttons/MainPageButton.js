import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const MainPageButton = ({ icon, text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default MainPageButton;