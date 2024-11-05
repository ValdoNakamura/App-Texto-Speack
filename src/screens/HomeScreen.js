import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Boton from "../components/Boton";
import * as Speech from 'expo-speech';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import appFirebase from '../../data/FirebaseConfig';

const db = getFirestore(appFirebase);

export default function HomeScreen() {
    const [text, setText] = useState('');

    useEffect(() => {
        const getTextFromFirestore = async () => {
            try {
                
                const docRef = doc(db, 'image-text', 'DF9Y6jZM0Gl5kQUp9tBU');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setText(docSnap.data().texto);
                } else {
                    console.log("No se encontró el documento.");
                }
            } catch (error) {
                console.log("Error al obtener el texto:", error);
            }
        };
        
        getTextFromFirestore();
    }, []);

    const speak = () => {
        if (text) {
            Speech.speak(text, {
                language: 'es-MX',
                pitch: 1.0,
                rate: 0.75
                
            });
        } else {
            Speech.speak('No Hay Texto disponible para Leer', {
                language: 'es-MX',
                pitch: 1.0,
                rate: 0.75
            });
        }
    };

    return (
        <View style={styles.container}>
            <Boton title='Modo Lectura' icon='mic-outline' onPress={speak} />
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