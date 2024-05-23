import { Stack } from "expo-router";
import ProtegidosProtectores from "./src/pages/ProtegidosProtectores/ProtegidosProtectores";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function RootLayout() {
  return (
    <View style={styles.body}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Main"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="InformacionInicial"
            component={InformacionInicial}
          />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Boton" component={Boton} />
          <Stack.Screen
            name="ProtegidosProtectores"
            component={ProtegidosProtectores}
          />
          <Stack.Screen name="InformacionLegal" component={InformacionLegal} />
          <Stack.Screen name="Agenda" component={Agenda} />
          <Stack.Screen name="Supervivencia" component={Supervivencia} />
          <Stack.Screen name="Wiki" component={Wiki} />
          <Stack.Screen name="CentrosSalud" component={CentrosSalud} />
          <Stack.Screen name="Medinator" component={Medinator} />
          <Stack.Screen
            name="InformacionPersonal"
            component={InformacionPersonal}
          />
          <Stack.Screen
            name="InformacionPersonalEdit"
            component={InformacionPersonalEdit}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
