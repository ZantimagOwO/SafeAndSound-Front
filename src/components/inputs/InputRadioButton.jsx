import {StyleSheet, View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default function InputRadioButton({navigation, width, height, name, radio_props, initial, onChange}) {

  const [value, setValue] = useState(initial);

  const handlePress = (newValue) => {
    setValue(newValue);  // actualiza el estado local
    onChange(newValue);  // pasa el nuevo valor al componente padre
  };

  return (
    <View style={styles.iconContainer} width={width} height={height}>
      <View style={styles.inputStyle}>
        <RadioForm style={styles.radiobutton}
          initial={initial}
          onPress={handlePress}
          buttonColor={'#68C699'}
          selectedButtonColor={'#68C699'}
          labelStyle={{ marginRight: 20 }}
        />
        {
            radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i} >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={value === obj.value}
                  onPress={() => handlePress(obj.value)}
                  borderWidth={1}
                  buttonInnerColor={'#68C699'}
                  buttonOuterColor={value === obj.value ? '#68C699' : '#68C699'}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={() => handlePress(obj.value)}
                  labelStyle={[styles.labelStyle, { color: 'black' }]}  // Aplicación del color a cada etiqueta
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))
          }
      </View>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>{name}</Text >
      </View>
    </View>
  )
}

const styles=StyleSheet.create({

  iconContainer: {
    marginTop: '5%',
    position: 'relative',
    marginRight: 10,
    marginLeft: 10
  },
  inputStyle: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    borderColor: '#68C699',
    borderRadius: 4,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: '',
  },
  overlay: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: -10,
    left: 10,
  },
  overlayText: {
    fontSize: 14,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#68C699'
  },
  radiobutton: {
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: 2,
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    color: '#68C699',
    fontcolor: '#68C699',
  },
})


