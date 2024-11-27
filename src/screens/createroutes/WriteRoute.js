import { Pressable, Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { stylesMain } from "../../stylesMain";
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FireBase_DB } from '../../../data/FirebaseConfig';
import Icon from "react-native-vector-icons/Ionicons";

export default function WriteRoute(props) {
    const routeId = props.route.params.routeId;
    const [pointCounter, setPointCounter] = useState(0);

    const saveStep = async (description) => {

        const stepData = {
            description,
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

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;
            try {
                const routeDocRef = doc(FireBase_DB, 'usuarios', uid, 'Rutas', id);
                await deleteDoc(routeDocRef)
                
                console.log("Todo a salido de maravilla")
            } catch (error) {
                console.log("No se a podido cancelar la accion", error)
            }
        } else {
            console.log("No hay usuario autentificado")
        }
    };

    return (
        <View style={stylesMain.main}>

            <View style={styles.containerBtns}>
                {[
                    { title: "Línea Recta", style: styles.btnRecta, icon: 'arrow-up-outline' },
                    { title: "Vuelta a la izquierda", style: styles.btnIzquierda, icon: 'arrow-back-outline'},
                    { title: "Vuelta a la derecha", style: styles.btnDerecha, icon: 'arrow-forward-outline'},
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
                        {btn.icon ? (
                            <Icon
                                name={btn.icon}
                                size={100}
                                color={"#1E2022"}
                            />
                        ) : (
                            <Text style={styles.title}>{btn.title}</Text>
                        )}
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
        backgroundColor: 'gray',
        width: 360,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
    btnIzquierda: {
        backgroundColor: 'gray',
        width: 180,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
    btnDerecha: {
        position: 'absolute',
        right: 0,
        bottom: 150,
        backgroundColor: 'gray',
        width: 180,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
    btnCancelar: {
        backgroundColor: 'gray',
        width: 360,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
    title: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    }
});
