import { View, Text, ScrollView, Pressable, Dimensions } from "react-native"
import { StyleSheet } from "react-native"
import ButtomReturn from '../../components/ButtonBottom'
import { FireBase_DB } from '../../../data/FirebaseConfig'
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";



export default function Roads(props) {

    //forma para traer informacion desde firebase
    const [lista, setLista] = useState([])

    useEffect(()=>{
        const getLista =  async()=>{
            try {
                const querySnapshot = await getDocs(collection(FireBase_DB, 'usuarios', '1Rf7KYV0jvN8CAfzZIEF', 'Rutas'))
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
            <View style={styles.containerText}>
                <Text style={styles.titleRoutes}>Aqui estan todas tus rutas</Text>
            </View>
            <ScrollView style={styles.containerScroll}>
                {
                    lista.map((list)=>(
                        <Pressable key={list.id} style={styles.cardRoutes}>
                            <Text style={styles.RoutesName}>{list.nombre}</Text>
                            <Text style={styles.RoutesName}>{list.inicio} - {list.fin} </Text>
                        </Pressable>
                    ))
                }
            </ScrollView>
            <ButtomReturn title="Regresar" onPress={() => props.navigation.navigate("RouteExplorer")}/>
        </View>
    )
}

const  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerText: {
        paddingTop: 40,
        paddingBottom: 15,
        ustifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    titleRoutes: {
        fontSize: 20
    },
    containerScroll: {
        width: Dimensions.get('window').width,
        height:30,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'red'
    },
    cardRoutes: {
        width: 330,
        height: 100,
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 25
    },
    RoutesName: {
        fontSize: 20,
    }
})