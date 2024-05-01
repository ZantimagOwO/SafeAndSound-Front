import { StyleSheet, View, Text, Button } from "react-native";
import React, { useState } from "react";
import Protected from "../../components/ProtegidoRow";
import RegularHeader from "../../components/headers/RegularHeader";

export default function ProtegidosProtectores({ navigation }) {
  const [showProtegidos, setShowProtegidos] = useState(true); // Estado para controlar la visibilidad

  // Función para cambiar el estado y mostrar los protegidos
  const renderProtegidos = () => {
    setShowProtegidos(true);
  };

  // Función para cambiar el estado y mostrar los protectores
  const renderProtectores = () => {
    setShowProtegidos(false);
  };

  return (
    <>
    <RegularHeader navigation={navigation} />
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        {/*Container de la pagina */}
        <View>
          {/*Botones para cambiar de página*/}
          <Button onPress={renderProtegidos}>Protegidos</Button>
          <Button onPress={renderProtectores}>Protectores</Button>
        </View>
        {/* Mostrar el componente Protegidos o Protectores dependiendo del estado */}
        {//showProtegidos ? <Protected /> : <Text>Protectores</Text>
        }
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: '25%'
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '50%',
    
  }
});
