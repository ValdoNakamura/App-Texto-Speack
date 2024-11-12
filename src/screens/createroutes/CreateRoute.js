import { View } from 'react-native';
import Boton from '../../components/Boton';
import { stylesMain } from '../../stylesMain';

export default function CreateRoute(props) {

    return (
        <View style={stylesMain.main}>
            <Boton title='Crear Ruta' onPress={()=> props.navigation.navigate('CreatingRoute')}/>
        </View>
    )
}
