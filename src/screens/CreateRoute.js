import { StyleSheet, View } from 'react-native';
import Boton from '../components/Boton';


export default function CreateRoute() {
    return (
        <View style={styles.main}>
            <Boton title='Crear Ruta'/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})