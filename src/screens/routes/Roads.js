import { View, Text, ScrollView, Pressable } from "react-native"
import { StyleSheet } from "react-native"
import ButtomReturn from '../../components/ButtonBottom'

import appFirebase from '../../../data/FirebaseConfig';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";

const db = getFirestore(appFirebase)


export default function Roads(props) {

    //forma para trar informacion desde firebase
    const [lista, setLista] = useState([])

    useEffect(()=>{
        const getLista =  async()=>{
            try {
                const querySnapshot = await getDocs(collection(db, 'routes-list'))
                const docs = []

                querySnapshot.forEach((doc)=>{
                    const {nombre, inicio, fin} = doc.data()
                    docs.push({
                        id:doc.id,
                        nombre,
                        inicio,
                        fin
                    })
                })
                setLista(docs);
            } catch (error) {
                console.log(error);
            }
        }
        getLista();
    },[])


    return (
        <View style={styles.container}>
            <Text style={styles.titleRoutes}>Aqui estan todas tus rutas</Text>
            <ScrollView style={styles.containerScroll}>
                <View>
                    {
                        lista.map((list)=>(
                            <Pressable key={list.id} style={styles.cardRoutes}>
                                <Text style={styles.RoutesName}>{list.nombre}</Text>
                                <Text style={styles.RoutesName}>{list.inicio} - {list.fin} </Text>
                            </Pressable>
                        ))
                    }
                </View>
            </ScrollView>
            <ButtomReturn title="Regresar" onPress={() => props.navigation.navigate("RouteExplorer")}/>
        </View>
    )
}

const  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E2022',
    },
    titleRoutes: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10
    },
    containerScroll: {
        height: 10,
        width: 350,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: 'red'
    },
    cardRoutes: {
        width: 350,
        height: 60,
        backgroundColor: 'white',
        marginBottom: 10
    },
    RoutesName: {

    }
})