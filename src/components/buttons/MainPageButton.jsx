import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const MainPageButton = ({ icon, text, onPress, mode }) => {
    const isOn = mode === 'on';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { borderColor: isOn ? '#68c699' : 'gray' }
            ]}
            onPress={onPress}
        >
            <Image source={icon} style={styles.icon} />
            <Text
                style={[
                    styles.text,
                    { color: isOn ? '#68c699' : 'gray' }
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '30%',
        height: 150,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        margin: 5,
        borderRadius: 4,
        justifyContent: 'center',
        borderWidth: 1,
    },
    icon: {
        marginTop: 20,
        width: 100,
        height: 60,
        resizeMode: 'contain',
        margin: 10,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        flex: 1,
        fontWeight: 'bold',
        marginBottom: 5,
        // borderWidth: 1,
        // borderColor: 'red',
    },
});

export default MainPageButton;
