import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { styles } from '../../styles';
import ButtonBottom from '../../components/ButtonBottom'


export default function CreatingRoutes() {

    const navigation = useNavigation();

    return (
        <View style={styles.main}>
            <Text>CreatingRoutes</Text>
            <ButtonBottom title='Regresar' onPress={()=> navigation.navigate('CreateRoute')}/>
        </View>
    )

}