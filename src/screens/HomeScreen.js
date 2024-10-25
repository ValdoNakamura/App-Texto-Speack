import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
const speak = () => {
    const thingToSay = '¡Soy la Justicia! Protejo a los inocentes y a los que temen al mal. ¡Soy el que se convertirá en el dios de un nuevo mundo que todos desean! Resolveré ecuaciones con mi mano derecha y escribiré nombres con mi izquierda.';
    Speech.speak(thingToSay);
};

    return (
    <View style={styles.container}>
    <Button title="Press to hear some words" onPress={speak} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    },
});
