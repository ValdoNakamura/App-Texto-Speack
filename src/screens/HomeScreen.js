import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';
import { useEffect } from 'react';
import Boton from "../components/Boton"

export default function HomeScreen() {


    return (
        <View style={styles.container}>
            <Boton title='Modo Lectura' icon='mic-outline'/>
            <Boton title='Modo Lenguaje' style={styles.btnDescription} styleText={styles.btnText}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center'
    },
    btnDescription: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        position: 'absolute',
        top: 0,
        width: 600,
        height: 100,
    },
    btnText: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
    }
});
