import { View, StyleSheet } from 'react-native';
import Boton from '../../components/Boton';



export default function RouteExplorer(props) {
    return (
        <View style={styles.main}>
            <Boton title='Explorar Caminos' onPress={()=> props.navigation.navigate("Roads")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2022'
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