import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useDebugValue, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FireBase_DB } from "../../../data/FirebaseConfig";
import ButtomBottom from "../../components/ButtonBottom";



export default function InfoRoads(props) {

    const [pressed, setPressed] = useState(false);
    const [road, setRoad] = useState({})

    const getOneRoute = async (id) => {

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {

            const uid = user.uid;

            try {
                const docRef = doc(FireBase_DB,'usuarios', uid, 'Rutas', id)
                const docSnap = await getDoc(docRef)
                setRoad(docSnap.data())
            } catch {
                console.log(error);
            }
        } else {
            console.log("No hay usuario autentificado")
        }
    }

    const DeleteRoute = async (id) => {

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {

            const uid = user.uid;

            try {
                const docRef = doc(FireBase_DB, 'usuarios', uid, 'Rutas', id);
                await deleteDoc(docRef);
                console.log(`Documento con ID ${id} eliminado exitosamente.`);
                props.navigation.goBack();
            } catch (error) {
                console.log("No se eliminó el elemento debido a este error:", error);
            }
        }
    };

    useEffect(()=> {
        getOneRoute(props.route.params.productoId)
    },[])

    return (
        <View style={styles.container}>
            <Pressable
            style={({ pressed }) => [
                styles.info,
                { opacity: pressed ? 0.6 : 1.0 }   
            ]}
            onPress={() => props.navigation.navigate("Walk", { docWalk: props.route.params.productoId })}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            onLongPress={() => DeleteRoute(props.route.params.productoId)}
            >
                <Text style={styles.textInfo}>Esta es tu ruta</Text>
                <Text style={styles.textInfo}>Nombre: {road.nombre}</Text>
                <Text style={styles.textInfo}>Inicio: {road.inicio}</Text>
                <Text style={styles.textInfo}>Fin: {road.fin}</Text>
                <Text style={styles.textInfo}>¿Quieres que empezemos?</Text>
                <Text style={styles.textInfo}>Si quieres eliminarla manten presionado</Text>
            </Pressable>
            
            <ButtomBottom title='Regresar' onPress={() => props.navigation.navigate("Roads")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    info: {
        width: 300,
        height: 500,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    textInfo: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold'
    }
})