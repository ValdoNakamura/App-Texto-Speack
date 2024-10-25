import { View, StyleSheet } from 'react-native';
import Boton from '../components/Boton';
import { useNavigation } from '@react-navigation/native';


export default function RouteExplorer() {
    const navigation = useNavigation()
    return (
        <View style={styles.main}>
            <Boton title='Explorar Caminos' onPress={()=> navigation.navigate("Roads")}/>
            <View style={styles.decoracion}/>
            <View style={styles.decoracion2}/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnGrande: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#72000E',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    textoBtn: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold'
    },
    decoracion: {
        position: 'absolute',
        width: 250,
        height: 250,
        top: -100,
        right: -100,
        borderRadius: 200,
        zIndex: -1,
        backgroundColor: '#72000E',
        opacity: 0.7,
    },
    decoracion2: {
        position: 'absolute',
        width: 250,
        height: 250,
        bottom: -100,
        left: -100,
        borderRadius: 200,
        zIndex: -1,
        backgroundColor: '#72000E',
        opacity: 0.7,
    }
})