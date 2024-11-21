import { View, Text, ScrollView, Pressable, StyleSheet, SafeAreaView} from "react-native"
import ButtomReturn from '../../components/ButtonBottom'
import { FireBase_DB } from '../../../data/FirebaseConfig'
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";



export default function Roads(props) {
    const [lista, setLista] = useState([])
    const [loading, setLoading] = useState(true);

    const getLista =  async()=>{
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;
            try {
                const querySnapshot = await getDocs(collection(FireBase_DB, 'usuarios', uid, 'Rutas'))
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
            } finally {
                setLoading(false);
            }
        } else {
            console.log("No hay usuario autentificado")
        }
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getLista();
        });
        
        return unsubscribe;
    }, [props.navigation]);

    useEffect(()=> {
        getLista();
    },[])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.titleRoutes}>Aqui estan todas tus rutas</Text>
            </View>
            {loading ? (
                <Text style={styles.loadingText}>Cargando rutas...</Text>
            ) : lista.length === 0 ? (
                <View style={styles.noRoutesContainer}>
                    <Text style={styles.noRoutesText}>No tienes rutas disponibles.</Text>
                </View>
            ) : (
                <ScrollView style={styles.containerScroll}>
                    {lista.map((list) => (
                        <Pressable
                            key={list.id}
                            style={styles.cardRoutes}
                            onPress={() => props.navigation.navigate("InfoRoads", { productoId: list.id })}
                        >
                            <Text style={styles.RoutesName}>{list.nombre}</Text>
                            <Text style={styles.RoutesName}>
                                {list.inicio} - {list.fin}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            )}
            <ButtomReturn title='Regresar' onPress={()=> props.navigation.navigate('RouteExplorer')}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    containerText: {
        paddingTop: 40,
        paddingBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    titleRoutes: {
        fontSize: 20,
    },
    containerScroll: {
        width: "100%",
        height: 600,
        marginBottom: 100,
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#1E2022",
    },
    cardRoutes: {
        width: 330,
        height: 100,
        padding: 10,
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 25,
    },
    RoutesName: {
        fontSize: 20,
    },
    noRoutesContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noRoutesText: {
        fontSize: 18,
        color: "gray",
        textAlign: "center",
    },
    loadingText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
        color: "gray",
    },
});