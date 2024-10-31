import { View, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import Boton from "../components/Boton"
import * as Speech from 'expo-speech';


export default function HomeScreen() {
    const [text, setText] = useState('');

    const speak = () => {
        const thingToSay = 'Estas en la seccion principal';
        Speech.speak(thingToSay);
      };

    return (
        <View style={styles.container}>
            <Boton title='Modo Lectura' icon='mic-outline' onPress={speak}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1E2022',
    padding: 8,
    alignItems: 'center'
    },

});
