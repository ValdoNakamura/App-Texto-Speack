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
    }
})