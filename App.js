import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

        let texto = "CACA"
        fetch("http://localhost:3000/").then((data) => {
          texto = data.text();
          console.log(texto);
        });
        
  return (
    <View style={styles.container}>
      <Text>{texto}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});