import { Text, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Boton from '../components/Boton';
import * as Speech from 'expo-speech';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../data/AuthContext';

import { FireBase_DB } from '../../data/FirebaseConfig'


export default function HomeScreen(props) {
    const [text, setText] = useState('');
    const [pressed, setPressed] = useState(false);
    const { logout } = useAuth();


    useEffect(() => {
        const getTextFromFirestore = async () => {
            try {
                
                const docRef = doc(FireBase_DB, 'image-text', 'DF9Y6jZM0Gl5kQUp9tBU');
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
            Speech.speak('No Hay Texto disponible para Leer o la imagen no es legible', {
                language: 'es-MX',
                pitch: 1.0,
                rate: 0.75
            });
        }
    };

    const CerrarSesion = () => {
        logout();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Boton title='Modo Lectura' icon='mic-outline' onPress={speak} />
            <Pressable
                title='cerrarsesion'
                style={({ pressed }) => [
                    styles.btnCerrar,
                    { opacity: pressed ? 0.6 : 1.0 }   
                ]}
                onPress={CerrarSesion}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
            >
                <Text style={styles.textCerrarSesion}>Cerrar Sesion</Text>
            </Pressable>
        </SafeAreaView>
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
    btnCerrar: {
        position: 'absolute',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        left: 0,
        bottom: 0,
        backgroundColor: '#fff'
    },
    textCerrarSesion: {
        fontSize: 20,
    }
});
