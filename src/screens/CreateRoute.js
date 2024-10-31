import { StyleSheet, View } from 'react-native';
import Boton from '../components/Boton';
import { styles } from '../styles';

export default function CreateRoute() {
    return (
        <View style={styles.main}>
            <Boton title='Crear Ruta'/>
        </View>
    )
}
