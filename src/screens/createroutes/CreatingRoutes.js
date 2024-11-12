import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { stylesMain } from '../../stylesMain'



import ButtonBottom from '../../components/ButtonBottom'
import Boton from '../../components/Boton'


export default function CreatingRoutes() {

    const navigation = useNavigation();

    return (
        <View style={stylesMain.main}>
            <View style={styles.containerText}>
                <Text>CreatingRoutes</Text>
            </View>
            <Boton title=''/>
            <ButtonBottom title='Regresar' onPress={()=> navigation.navigate('CreateRoute')}/>
        </View>
    )

}


const styles = StyleSheet.create({
    containerText: {
    },
    btnNext: {
        height: 200,
        backgroundColor: 'white'
    }
})