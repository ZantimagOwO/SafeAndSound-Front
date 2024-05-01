import { StyleSheet, View, Text, Button } from "react-native";
import React, { useState } from "react";
import Protected from "../../components/ProtegidoRow";
import RegularHeader from "../../components/headers/RegularHeader";
import { TouchableOpacity } from "react-native-web";
import StyleConstants from "../../StyleConstants";
import Protegidos from "./Protegidos";
import Protectores from "./Protectores";

export default function ProtegidosProtectores({ navigation }) {
  const [showProtegidos, setShowProtegidos] = useState('protegidos'); // Estado para controlar la visibilidad

  // Función para cambiar el estado y mostrar los protegidos
  const renderProtegidos = () => {
    console.log('cargando protegidos')
    setShowProtegidos('protegidos');
  };

  // Función para cambiar el estado y mostrar los protectores
  const renderProtectores = () => {
    console.log("cargando protectores");
    setShowProtegidos('protectores');
  };

  return (
    <>
      <RegularHeader navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btnRender,
              showProtegidos == "protegidos"
                ? styles.btnRenderSelected
                : styles.btnRenderUnselected,
            ]}
            onPress={renderProtegidos}
          >
            Mis Protegidos
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnRender,
              showProtegidos == "protectores"
                ? styles.btnRenderSelected
                : styles.btnRenderUnselected,
            ]}
            onPress={renderProtectores}
          >
            Mis Protectores
          </TouchableOpacity>
        </View>

        <View id="body" style={styles.body}>
          {showProtegidos == "protegidos" ? <Protegidos /> : <Protectores />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    position: "absolute",
    top: "15%",

    width: "100%",
    height: "85%",

    backgroundColor: '#FFF'
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    width: "100%",
    height: "10vh",
  },
  btnRender: {
    width: "50%",
    height: "100%",
    display: "flex",

    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

    fontSize: "20px",
    fontFamily: StyleConstants.font,
    fontWeight: "bold",
  },
  btnRenderSelected: {
    backgroundColor: "#FFF",
    color: StyleConstants.mainColor,

    borderWidth: '1px',
    borderColor: StyleConstants.mainColor,
    borderBottomColor: '#FFF'
  },
  btnRenderUnselected: {
    backgroundColor: StyleConstants.mainColor,
    color: "#FFF",
  },
  body: {
    width: "100%",
    height: "100%",

    borderWidth: '1px',
    borderColor: StyleConstants.mainColor,
    borderTopColor: '#FFF'
  },
});
