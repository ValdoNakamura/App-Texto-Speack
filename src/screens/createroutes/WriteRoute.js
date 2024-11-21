import { Pressable, Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { stylesMain } from "../../stylesMain";
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FireBase_DB } from '../../../data/FirebaseConfig';

export default function WriteRoute(props) {
    const routeId = props.route.params.routeId;
    const [userLocation, setUserLocation] = useState(null);
    const [pointCounter, setPointCounter] = useState(0);

    const startLocationUpdates = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 2
                },
                (location) => {
                    setUserLocation(location.coords);
                }
            );
        } catch (error) {
            console.error('Error al iniciar la actualización de ubicación:', error);
        }
    };

    useEffect(() => {
        startLocationUpdates();
    }, []);

    const saveStep = async (description) => {
        if (!userLocation) {
            console.log("No se pudo obtener la ubicación del usuario.");
            return;
        }

        const stepData = {
            description,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            creationtime: serverTimestamp()
        };

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;
            try {
                if (!routeId) {
                    console.log("No se ha recibido el routeId");
                    return;
                }
                const routeDocRef = collection(FireBase_DB, 'usuarios', uid, 'Rutas', routeId, 'Pasos');
                await addDoc(routeDocRef, stepData);
                
                setPointCounter(prevCount => prevCount + 1);
                
                console.log("El paso se a guardado: ", stepData)
                
            } catch (error) {
                console.error("Error al guardar el paso en Firebase:", error);
            }
        } else {
            console.log("No hay usuario autentificado")
        }
    };

    const cancelRoute = async (id) => {
        try {
            const routeDocRef = doc(FireBase_DB, 'usuarios', '1Rf7KYV0jvN8CAfzZIEF', 'Rutas', id);
            await deleteDoc(routeDocRef)

            console.log("Todo a salido de maravilla")
        } catch (error) {
            console.log("No se a podido cancelar la accion", error)
        }
    };

    console.log("Estos son los puntos que llevo: ", pointCounter)

    return (
        <View style={stylesMain.main}>
            <Text>
                En este apartado podrás dibujar una ruta que después podrás escuchar.
            </Text>

            <View style={styles.containerBtns}>
                {[
                    { title: "Línea Recta", style: styles.btnRecta },
                    { title: "Vuelta a la izquierda", style: styles.btnIzquierda },
                    { title: "Vuelta a la derecha", style: styles.btnDerecha },
                    { title: "Dejar Precionado Para Cancelar y Presiona Para Terminar", style: styles.btnCancelar, navigate: true, cancel: true },
                ].map((btn, index) => (
                    <Pressable
                        key={index}
                        onPress={() => {
                            if (btn.navigate) {
                                if (pointCounter >= 2) {
                                    props.navigation.navigate('CreateRoute');
                                } else {
                                    Alert.alert('Alerta', 'Aun no tienes los suficientes puntos para navegar');
                                }
                            } else {
                                saveStep(btn.title);
                            }
                        }}
                        onLongPress={() => {
                            if (btn.cancel) {
                                cancelRoute(routeId);
                                props.navigation.navigate('CreateRoute');
                            }
                        }}                        
                        style={({ pressed }) => [
                            btn.style,
                            { opacity: pressed ? 0.6 : 1.0 }
                        ]}
                    >
                        <Text style={styles.title}>{btn.title}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerBtns: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        height: 550
    },
    btnRecta: {
        backgroundColor: 'red',
        width: 360,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnIzquierda: {
        backgroundColor: 'yellow',
        width: 180,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDerecha: {
        position: 'absolute',
        right: 0,
        bottom: 150,
        backgroundColor: 'green',
        width: 180,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCancelar: {
        backgroundColor: 'gray',
        width: 360,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25
    }
});